import PlantCareLog from '../models/PlantCareLog.js';
import VirtualGarden from '../models/VirtualGarden.js';

// Log care activity
export const logCareActivity = async (req, res) => {
  try {
    const userId = req.user.id;
    const { virtualGardenId, plotId, plantName, careType, notes, waterAmount } = req.body;

    if (!virtualGardenId || !plotId || !careType) {
      return res.status(400).json({ error: 'virtualGardenId, plotId, and careType are required' });
    }

    const careLog = new PlantCareLog({
      userId,
      virtualGardenId,
      plotId,
      plantName,
      careType,
      notes,
      waterAmount,
      date: new Date()
    });

    await careLog.save();

    res.status(201).json({ data: careLog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get care logs for user's garden
export const getCareLogs = async (req, res) => {
  try {
    const userId = req.user.id;
    const { virtualGardenId, plotId, careType, startDate, endDate } = req.query;

    const query = { userId };

    if (virtualGardenId) query.virtualGardenId = virtualGardenId;
    if (plotId) query.plotId = plotId;
    if (careType) query.careType = careType;

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const logs = await PlantCareLog.find(query)
      .sort({ date: -1 })
      .limit(100);

    res.json({ data: logs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get care schedule recommendations
export const getCareSchedule = async (req, res) => {
  try {
    const userId = req.user.id;
    const { virtualGardenId } = req.params;

    const garden = await VirtualGarden.findOne({ _id: virtualGardenId, userId });

    if (!garden) {
      return res.status(404).json({ error: 'Garden not found' });
    }

    const schedule = [];

    // Check each plot and create tasks
    for (const plot of garden.plots) {
      if (!plot.plantId) continue;

      const daysSincePlanted = Math.floor((new Date() - new Date(plot.plantedDate)) / (1000 * 60 * 60 * 24));
      const daysSinceWatered = plot.lastWaterDate
        ? Math.floor((new Date() - new Date(plot.lastWaterDate)) / (1000 * 60 * 60 * 24))
        : daysSincePlanted;

      // Watering schedule (every 2-3 days)
      if (daysSinceWatered >= 2) {
        schedule.push({
          plotId: plot.plotId,
          plantName: plot.plantName,
          taskType: 'water',
          priority: daysSinceWatered > 4 ? 'high' : 'medium',
          lastDone: plot.lastWaterDate,
          daysOverdue: Math.max(0, daysSinceWatered - 3)
        });
      }

      // Check readiness for harvest
      if (plot.healthStatus === 'ready-to-harvest') {
        schedule.push({
          plotId: plot.plotId,
          plantName: plot.plantName,
          taskType: 'harvest',
          priority: 'high',
          daysOnPlant: daysSincePlanted
        });
      }

      // Fertilizing schedule (every 2 weeks)
      if (daysSincePlanted > 7 && daysSincePlanted % 14 === 0) {
        schedule.push({
          plotId: plot.plotId,
          plantName: plot.plantName,
          taskType: 'fertilize',
          priority: 'medium',
          daysSincePlanted
        });
      }
    }

    res.json({
      data: {
        schedule,
        totalTasks: schedule.length,
        urgentTasks: schedule.filter(t => t.priority === 'high').length
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get care history for a plant
export const getPlantCareHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { virtualGardenId, plotId } = req.params;

    const history = await PlantCareLog.find({
      userId,
      virtualGardenId,
      plotId
    })
    .sort({ date: -1 })
    .limit(50);

    if (history.length === 0) {
      return res.json({ data: [] });
    }

    // Calculate statistics
    const waterings = history.filter(h => h.careType === 'watered').length;
    const fertilizers = history.filter(h => h.careType === 'fertilized').length;
    const harvests = history.filter(h => h.careType === 'harvested').length;

    res.json({
      data: history,
      stats: {
        totalActions: history.length,
        waterings,
        fertilizers,
        harvests,
        averageWaterPerSession: history
          .filter(h => h.waterAmount)
          .reduce((sum, h) => sum + h.waterAmount, 0) / waterings || 0
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get plant care tips
export const getCareTips = async (req, res) => {
  try {
    const { plantName } = req.query;

    // Default care tips
    const tips = {
      general: [
        'Water plants regularly, keeping soil moist but not soggy',
        'Provide 6-8 hours of sunlight daily',
        'Use well-draining soil with organic matter',
        'Fertilize every 2 weeks during growing season',
        'Pinch off flower buds to encourage leaf growth',
        'Harvest regularly to encourage bushier growth'
      ],
      basil: [
        'Loves warmth and sunshine (6-8 hours daily)',
        'Water when top inch of soil is dry',
        'Pinch off flower buds to extend harvest',
        'Harvest leaves from the top down',
        'Feed every 2 weeks for best growth'
      ],
      mint: [
        'Grows in full sun to part shade',
        'Keep soil consistently moist',
        'Pinch back regularly to prevent flowering',
        'Can spread aggressively, so plant in containers',
        'Drought tolerant once established'
      ],
      rosemary: [
        'Prefers full sun and well-draining soil',
        'Water moderately, allow soil to dry between waterings',
        'Drought tolerant when established',
        'Prune regularly for bushier growth',
        'Slow growing, be patient'
      ],
      thyme: [
        'Needs full sun and excellent drainage',
        'Drought tolerant, minimal watering needed',
        'Prefers lean soil',
        'Clip regularly to maintain shape',
        'Hardy and easy to grow'
      ]
    };

    const plantTips = plantName ? tips[plantName.toLowerCase()] || tips.general : tips.general;

    res.json({
      data: {
        plant: plantName || 'General Herbs',
        tips: plantTips
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get care statistics
export const getCareStatistics = async (req, res) => {
  try {
    const userId = req.user.id;
    const { virtualGardenId } = req.params;

    const logs = await PlantCareLog.find({ userId, virtualGardenId });

    const stats = {
      totalCareActivities: logs.length,
      wateringCount: logs.filter(l => l.careType === 'watered').length,
      fertilizingCount: logs.filter(l => l.careType === 'fertilized').length,
      pruningCount: logs.filter(l => l.careType === 'pruned').length,
      harvestCount: logs.filter(l => l.careType === 'harvested').length,
      healthCheckCount: logs.filter(l => l.careType === 'health-check').length,
      mostRecentActivity: logs[0]?.date || null,
      caresPerWeek: calculateCareFrequency(logs)
    };

    res.json({ data: stats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Helper function - calculate care frequency
function calculateCareFrequency(logs) {
  if (logs.length === 0) return 0;

  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const lastWeekLogs = logs.filter(l => new Date(l.date) > oneWeekAgo);

  return lastWeekLogs.length;
}
