import { useState, useEffect } from 'react';
import { Droplets, Leaf, Zap, AlertCircle, CheckCircle, TrendingUp, BarChart3, Calendar } from 'lucide-react';
import { careTrackerAPI, gardenAPI } from '../lib/api';
import { useNotification } from '../hooks/useNotification';

export default function PlantCareTracker() {
  const [garden, setGarden] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const [careLogs, setCareLogs] = useState([]);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [careHistory, setCareHistory] = useState([]);
  const [healthScores, setHealthScores] = useState({});
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [quickLogMode, setQuickLogMode] = useState(false);
  const { notify } = useNotification();
  useEffect(() => {
    fetchData();
    calculateUpcomingTasks();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [gardenRes, logsRes] = await Promise.all([
        gardenAPI.getUserGarden(),
        careTrackerAPI.getCareLogs()
      ]);

      setGarden(gardenRes.data);
      setCareLogs(logsRes.data || []);

      if (gardenRes.data) {
        const [scheduleRes, statsRes] = await Promise.all([
          careTrackerAPI.getCareSchedule(gardenRes.data._id),
          careTrackerAPI.getCareStatistics(gardenRes.data._id)
        ]);

        setSchedule(scheduleRes.data);
        setStats(statsRes.data);
      }
    } catch (err) {
      setError('Failed to load care tracker');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getCareHistory = async (plotId) => {
    try {
      const response = await careTrackerAPI.getPlantCareHistory(garden._id, plotId);
      setCareHistory(response.data || []);
    } catch (err) {
      console.error('Error fetching history:', err);
    }
  };

  const calculateUpcomingTasks = () => {
    if (!schedule || !schedule.schedule) return;
    const upcomingLength = Math.min(5, schedule.schedule.length);
    setUpcomingTasks(schedule.schedule.slice(0, upcomingLength));
  };

  const calculateHealthScore = (plot) => {
    if (!plot.plantId) return 0;
    
    // Health score based on water level, days since planted, and care frequency
    let score = 50; // base score
    
    // Water level impact
    const waterScore = (plot.waterLevel / 100) * 30;
    
    // Age and growth stage impact
    const daysSincePlanted = Math.floor((new Date() - new Date(plot.plantedDate)) / (1000 * 60 * 60 * 24));
    let growthScore = 0;
    if (plot.healthStatus === 'seedling') growthScore = 10;
    else if (plot.healthStatus === 'growing') growthScore = 20;
    else if (plot.healthStatus === 'mature') growthScore = 15;
    else if (plot.healthStatus === 'ready-to-harvest') growthScore = 25;
    
    score =  Math.min(100, waterScore + growthScore);
    return Math.round(score);
  };

  const getHealthColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const quickLogCare = async (plotId, careType) => {
    try {
      const plot = garden.plots.find(p => p.plotId === plotId);
      if (!plot) return;

      await careTrackerAPI.logCareActivity({
        virtualGardenId: garden._id,
        plotId,
        plantName: plot.plantName,
        careType,
        waterAmount: careType === 'watered' ? 50 : undefined,
        date: new Date()
      });

      // Update water level if watered
      if (careType === 'watered') {
        const updatedGarden = {
          ...garden,
          plots: garden.plots.map(p =>
            p.plotId === plotId
              ? { ...p, waterLevel: Math.min(100, p.waterLevel + 30), lastWaterDate: new Date() }
              : p
          )
        };
        setGarden(updatedGarden);
      }

      notify(`✅ Logged ${careType} for ${plot.plantName}`, 'success');
      await fetchData(); // Refresh data
    } catch (err) {
      console.error('Error logging care:', err);
      notify('Error logging care activity', 'error');
    }
  };

  const handlePlotSelect = (plotId) => {
    setSelectedPlot(selectedPlot === plotId ? null : plotId);
    if (!selectedPlot || selectedPlot !== plotId) {
      getCareHistory(plotId);
    }
  };

  const getCareIcon = (careType) => {
    switch (careType) {
      case 'watered':
        return <Droplets className="w-4 h-4 text-blue-500" />;
      case 'fertilized':
        return <Leaf className="w-4 h-4 text-green-500" />;
      case 'pruned':
        return <Zap className="w-4 h-4 text-yellow-500" />;
      case 'harvested':
        return <CheckCircle className="w-4 h-4 text-amber-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getCareLabel = (careType) => {
    const labels = {
      watered: 'Watered',
      fertilized: 'Fertilized',
      pruned: 'Pruned',
      harvested: 'Harvested',
      'health-check': 'Health Check',
      replanted: 'Replanted'
    };
    return labels[careType] || careType;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-forest-600"></div>
          </div>
          <p className="text-forest-600">Loading your care tracker...</p>
        </div>
      </div>
    );
  }

  if (!garden) {
    return (
      <div className="text-center py-20 bg-forest-50 rounded-2xl border-2 border-dashed border-forest-200">
        <p className="text-forest-600 mb-2">No garden found.</p>
        <p className="text-forest-500">Please create a garden first to start tracking plant care.</p>
      </div>
    );
  }

  const plantedPlots = garden.plots.filter(p => p.plantId);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-block px-3 py-1 bg-rose-100 rounded-full text-xs font-semibold text-rose-700 mb-3">
          💚 Track & Monitor
        </div>
        <h2 className="text-4xl font-bold text-forest-900">Plant Care Tracker</h2>
        <p className="text-forest-600">Monitor and manage the health of your plants with smart reminders and care logs</p>
      </div>

      {/* Statistics Cards */}
      {stats && (
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-forest-200 shadow-sm hover:shadow-md transition">
            <p className="text-forest-600 text-sm font-semibold uppercase tracking-wide mb-2">💧 Waterings</p>
            <p className="text-4xl font-bold text-blue-600">{stats.wateringCount || 0}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-forest-200 shadow-sm hover:shadow-md transition">
            <p className="text-forest-600 text-sm font-semibold uppercase tracking-wide mb-2">🌱 Fertilizing</p>
            <p className="text-4xl font-bold text-green-600">{stats.fertilizingCount || 0}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-forest-200 shadow-sm hover:shadow-md transition">
            <p className="text-forest-600 text-sm font-semibold uppercase tracking-wide mb-2">🌾 Harvests</p>
            <p className="text-4xl font-bold text-amber-600">{stats.harvestCount || 0}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-forest-200 shadow-sm hover:shadow-md transition">
            <p className="text-forest-600 text-sm font-semibold uppercase tracking-wide mb-2">⚡ Care/Week</p>
            <p className="text-4xl font-bold text-purple-600">{stats.caresPerWeek || 0}</p>
          </div>
        </div>
      )}

      {/* Care Schedule */}
      {schedule && schedule.schedule && schedule.schedule.length > 0 && (
        <div className="bg-white rounded-2xl p-8 border border-forest-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-amber-100">
              <AlertCircle className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="text-2xl font-bold text-forest-900">Care Tasks</h3>
            <span className="ml-auto bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-bold">
              {schedule.totalTasks} tasks
            </span>
          </div>

          <div className="space-y-3">
            {schedule.schedule.map((task, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border-l-4 flex items-start justify-between ${
                  task.priority === 'high'
                    ? 'bg-red-50 border-l-red-500 border border-red-200'
                    : 'bg-amber-50 border-l-amber-500 border border-amber-200'
                }`}
              >
                <div>
                  <p className="font-semibold text-forest-900">{task.plantName}</p>
                  <p className="text-sm text-forest-700 mt-1 capitalize">
                    {task.taskType === 'water' && '💧 Water the plant'}
                    {task.taskType === 'harvest' && '🌾 Ready to harvest'}
                    {task.taskType === 'fertilize' && '🌱 Time to fertilize'}
                  </p>
                  {task.daysOverdue > 0 && (
                    <p className="text-xs text-red-600 font-semibold mt-2">
                      ⚠️ {task.daysOverdue} days overdue!
                    </p>
                  )}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                  task.priority === 'high'
                    ? 'bg-red-200 text-red-800'
                    : 'bg-amber-200 text-amber-800'
                }`}>
                  {task.priority.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Plants to Monitor */}
      <div className="bg-white rounded-2xl p-8 border border-forest-200 shadow-sm">
        <h3 className="text-2xl font-bold text-forest-900 mb-6">Your Plants</h3>

        {plantedPlots.length === 0 ? (
          <div className="text-center py-12 text-forest-600">
            <p className="mb-2">No plants planted yet.</p>
            <p className="text-sm">Plant some in your Virtual Garden to start tracking care!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {plantedPlots.map((plot) => (
              <div key={plot.plotId}>
                <button
                  onClick={() => handlePlotSelect(plot.plotId)}
                  className="w-full p-5 bg-gradient-to-r from-green-50 to-forest-50 rounded-xl border-2 border-forest-200 hover:border-forest-400 hover:shadow-md transition-all text-left group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-bold text-forest-900 text-lg">{plot.plantName}</p>
                      <div className="flex flex-wrap gap-6 mt-3 text-sm text-forest-700">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-forest-600 uppercase tracking-wide">Status</span>
                          <span className="font-bold capitalize">{plot.healthStatus}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-forest-600 uppercase tracking-wide">Health</span>
                          <div className="flex items-center gap-1">
                            <TrendingUp className={`w-4 h-4 ${getHealthColor(calculateHealthScore(plot))}`} />
                            <span className={`font-bold ${getHealthColor(calculateHealthScore(plot))}`}>{calculateHealthScore(plot)}%</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-forest-600 uppercase tracking-wide">Water</span>
                          <div className="w-24 h-2 bg-white rounded-full border border-blue-300 overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-400 to-blue-500 transition-all"
                              style={{width: `${plot.waterLevel}%`}}
                            ></div>
                          </div>
                          <span className="font-bold text-blue-600 w-8 text-right">{plot.waterLevel}%</span>
                        </div>
                        {plot.plantedDate && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-forest-600 uppercase tracking-wide">Age</span>
                            <span className="font-bold">
                              {Math.floor((new Date() - new Date(plot.plantedDate)) / (1000 * 60 * 60 * 24))} d
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-300 to-forest-400 flex items-center justify-center flex-shrink-0 group-hover:shadow-lg transition">
                      <Leaf className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </button>

                {/* Care History with Quick Actions */}
                {selectedPlot === plot.plotId && (
                  <div className="mt-3 ml-4 pl-4 border-l-4 border-forest-400 space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-forest-700 uppercase tracking-widest">📋 Care History</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => quickLogCare(plot.plotId, 'watered')}
                          className="px-3 py-1 bg-blue-500 text-white text-xs rounded-full hover:bg-blue-600 transition flex items-center gap-1"
                        >
                          <Droplets className="w-3 h-3" /> Water
                        </button>
                        <button
                          onClick={() => quickLogCare(plot.plotId, 'fertilized')}
                          className="px-3 py-1 bg-green-500 text-white text-xs rounded-full hover:bg-green-600 transition flex items-center gap-1"
                        >
                          <Leaf className="w-3 h-3" /> Feed
                        </button>
                      </div>
                    </div>
                    {careHistory.length > 0 ? (
                      careHistory.slice(0, 5).map((log, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm text-forest-700 bg-forest-50 p-3 rounded-lg border border-forest-200">
                          {getCareIcon(log.careType)}
                          <span className="font-medium flex-1">{getCareLabel(log.careType)}</span>
                          <span className="text-forest-500 text-xs">
                            {new Date(log.date).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-forest-500 italic">No care history yet</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Care Activities */}
      {careLogs.length > 0 && (
        <div className="bg-white rounded-2xl p-8 border border-forest-200 shadow-sm">
          <h3 className="text-2xl font-bold text-forest-900 mb-6">Recent Activities</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {careLogs.slice(0, 15).map((log, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition">
                {getCareIcon(log.careType)}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-forest-900 truncate">{log.plantName}</p>
                  <p className="text-xs text-forest-600 mt-0.5">{getCareLabel(log.careType)}</p>
                </div>
                <span className="text-xs text-forest-500 whitespace-nowrap font-medium">
                  {new Date(log.date).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: '2-digit'})}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
