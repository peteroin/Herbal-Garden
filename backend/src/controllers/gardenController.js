import VirtualGarden from '../models/VirtualGarden.js';
import PlantCareLog from '../models/PlantCareLog.js';
import Plant from '../models/Plant.js';

// Get or create user's virtual garden
export const getUserGarden = async (req, res) => {
  try {
    const userId = req.user.id;
    let garden = await VirtualGarden.findOne({ userId }).populate('plots.plantId');

    if (!garden) {
      // Create a new garden if user doesn't have one
      garden = new VirtualGarden({
        userId,
        gardenName: 'My Herbal Garden',
        plots: generateInitialPlots()
      });
      await garden.save();
    }

    res.json({ data: garden });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Initialize garden with empty plots
export const createGarden = async (req, res) => {
  try {
    const userId = req.user.id;
    const { gardenName, gardenSize, theme } = req.body;

    let existingGarden = await VirtualGarden.findOne({ userId });
    if (existingGarden) {
      return res.status(400).json({ error: 'User already has a garden' });
    }

    const garden = new VirtualGarden({
      userId,
      gardenName: gardenName || 'My Herbal Garden',
      gardenSize: gardenSize || 'medium',
      theme: theme || 'classic',
      plots: generateInitialPlots(gardenSize || 'medium')
    });

    await garden.save();
    res.status(201).json({ data: garden });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Plant a plant in a plot
export const plantInPlot = async (req, res) => {
  try {
    const userId = req.user.id;
    const { plotId, plantId } = req.body;

    if (!plotId || !plantId) {
      return res.status(400).json({ error: 'plotId and plantId are required' });
    }

    const garden = await VirtualGarden.findOne({ userId });
    if (!garden) {
      return res.status(404).json({ error: 'Garden not found' });
    }

    const plant = await Plant.findById(plantId);
    if (!plant) {
      return res.status(404).json({ error: 'Plant not found' });
    }

    const plot = garden.plots.find(p => p.plotId === plotId);
    if (!plot) {
      return res.status(404).json({ error: 'Plot not found' });
    }

    plot.plantId = plantId;
    plot.plantName = plant.name;
    plot.plantImage = plant.image;
    plot.plantedDate = new Date();
    plot.healthStatus = 'seedling';
    plot.waterLevel = 100;
    plot.lastWaterDate = new Date();

    await garden.save();
    res.json({ data: garden });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Water a plant
export const waterPlant = async (req, res) => {
  try {
    const userId = req.user.id;
    const { plotId, waterAmount = 50 } = req.body;

    const garden = await VirtualGarden.findOne({ userId });
    if (!garden) {
      return res.status(404).json({ error: 'Garden not found' });
    }

    const plot = garden.plots.find(p => p.plotId === plotId);
    if (!plot) {
      return res.status(404).json({ error: 'Plot not found' });
    }

    const oldWaterLevel = plot.waterLevel;
    plot.waterLevel = Math.min(100, plot.waterLevel + waterAmount);
    plot.lastWaterDate = new Date();

    // Log the care activity
    const careLog = new PlantCareLog({
      userId,
      virtualGardenId: garden._id,
      plotId,
      plantName: plot.plantName,
      careType: 'watered',
      waterAmount,
      healthBefore: oldWaterLevel,
      healthAfter: plot.waterLevel
    });

    await careLog.save();
    await garden.save();

    res.json({ data: { plot, careLog } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update plant health based on growth stage
export const updatePlantHealth = async (req, res) => {
  try {
    const userId = req.user.id;
    const { plotId } = req.body;

    const garden = await VirtualGarden.findOne({ userId });
    if (!garden) {
      return res.status(404).json({ error: 'Garden not found' });
    }

    const plot = garden.plots.find(p => p.plotId === plotId);
    if (!plot || !plot.plantId) {
      return res.status(404).json({ error: 'Plot or plant not found' });
    }

    const plantedDays = Math.floor((new Date() - new Date(plot.plantedDate)) / (1000 * 60 * 60 * 24));
    const healthBefore = plot.waterLevel;

    // Degrade water level over time
    plot.waterLevel = Math.max(0, plot.waterLevel - (plantedDays * 2));

    // Update health status based on days planted
    if (plantedDays < 7) {
      plot.healthStatus = 'seedling';
    } else if (plantedDays < 21) {
      plot.healthStatus = 'growing';
    } else if (plantedDays < 35) {
      plot.healthStatus = 'mature';
    } else {
      plot.healthStatus = 'ready-to-harvest';
    }

    await garden.save();

    res.json({ data: { plot, daysGrowing: plantedDays } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Harvest a plant
export const harvestPlant = async (req, res) => {
  try {
    const userId = req.user.id;
    const { plotId } = req.body;

    const garden = await VirtualGarden.findOne({ userId });
    if (!garden) {
      return res.status(404).json({ error: 'Garden not found' });
    }

    const plot = garden.plots.find(p => p.plotId === plotId);
    if (!plot) {
      return res.status(404).json({ error: 'Plot not found' });
    }

    const plantName = plot.plantName;
    plot.harvestDate = new Date();

    // Log harvest
    const careLog = new PlantCareLog({
      userId,
      virtualGardenId: garden._id,
      plotId,
      plantName,
      careType: 'harvested'
    });

    await careLog.save();

    // Update counters
    garden.totalHarvests += 1;

    // Clear the plot
    plot.plantId = null;
    plot.plantName = null;
    plot.plantImage = null;
    plot.healthStatus = 'seedling';
    plot.waterLevel = 100;

    await garden.save();

    res.json({ data: { plot, garden } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get care logs for a plant
export const getCareLogs = async (req, res) => {
  try {
    const userId = req.user.id;
    const { plotId } = req.params;

    const logs = await PlantCareLog.find({ userId, plotId }).sort({ date: -1 });

    res.json({ data: logs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get garden statistics
export const getGardenStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const garden = await VirtualGarden.findOne({ userId });
    const careLogs = await PlantCareLog.find({ userId });

    if (!garden) {
      return res.json({
        data: {
          totalPlantsGrown: 0,
          totalHarvests: 0,
          waterings: 0,
          plantedPlots: 0,
          emptyPlots: 0
        }
      });
    }

    const plantedPlots = garden.plots.filter(p => p.plantId).length;
    const emptyPlots = garden.plots.length - plantedPlots;
    const waterings = careLogs.filter(log => log.careType === 'watered').length;

    res.json({
      data: {
        totalPlantsGrown: garden.totalPlantsGrown + plantedPlots,
        totalHarvests: garden.totalHarvests,
        waterings,
        plantedPlots,
        emptyPlots,
        totalPlots: garden.plots.length
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Helper function to generate initial empty plots
function generateInitialPlots(size = 'medium') {
  const plotCounts = { small: 6, medium: 12, large: 20 };
  const count = plotCounts[size] || 12;
  const cols = Math.ceil(Math.sqrt(count));

  const plots = [];
  for (let i = 0; i < count; i++) {
    plots.push({
      plotId: `plot-${i + 1}`,
      position: {
        x: (i % cols) * 100,
        y: Math.floor(i / cols) * 100
      },
      healthStatus: 'seedling'
    });
  }

  return plots;
}
