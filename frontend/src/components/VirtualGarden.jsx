import { useState, useEffect } from 'react';
import { Droplets, Leaf, Sprout, Trophy, AlertCircle, CheckCircle, Zap, TrendingUp } from 'lucide-react';
import { gardenAPI, plantAPI, careTrackerAPI } from '../lib/api';
import { useNotification } from '../hooks/useNotification';

export default function VirtualGarden() {
  const [garden, setGarden] = useState(null);
  const [plants, setPlants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [showPlantSelector, setShowPlantSelector] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [gardenStats, setGardenStats] = useState(null);
  const [selectedPlantDetails, setSelectedPlantDetails] = useState(null);
  const { notify } = useNotification();

  useEffect(() => {
    fetchGarden();
    fetchPlants();
    
    // Auto-refresh garden every 5 seconds if enabled
    const refreshInterval = autoRefresh ? setInterval(fetchGarden, 5000) : null;
    return () => {
      if (refreshInterval) clearInterval(refreshInterval);
    };
  }, [autoRefresh]);

  // Calculate stats whenever garden updates
  useEffect(() => {
    if (garden) {
      calculateStats();
    }
  }, [garden]);

  const fetchGarden = async () => {
    try {
      const response = await gardenAPI.getUserGarden();
      setGarden(response.data);
    } catch (err) {
      setError('Failed to load garden');
      console.error(err);
    }
  };

  const fetchPlants = async () => {
    try {
      const response = await plantAPI.getAllPlants();
      setPlants(response.plants || []);
    } catch (err) {
      console.error('Error fetching plants:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const plantInPlot = async (plotId, plantId) => {
    try {
      const response = await gardenAPI.plantInPlot(plotId, plantId);
      setGarden(response.data);
      setSelectedPlot(null);
      setShowPlantSelector(false);
    } catch (err) {
      console.error('Error planting:', err);
    }
  };

  const waterPlant = async (plotId) => {
    try {
      const response = await gardenAPI.waterPlant(plotId);
      const updatedGarden = await gardenAPI.getUserGarden();
      setGarden(updatedGarden.data);
    } catch (err) {
      console.error('Error watering:', err);
    }
  };

  const harvestPlant = async (plotId) => {
    try {
      const response = await gardenAPI.harvestPlant(plotId);
      setGarden(response.data);
      notify('Plant harvested successfully! 🌾', 'success');
      await logCareActivity(plotId, 'harvested');
    } catch (err) {
      console.error('Error harvesting:', err);
      notify('Error harvesting plant', 'error');
    }
  };

  const calculateStats = () => {
    if (!garden) return;
    
    const stats = {
      totalPlots: garden.plots.length,
      plantedPlots: garden.plots.filter(p => p.plantId).length,
      seedlings: garden.plots.filter(p => p.healthStatus === 'seedling').length,
      growing: garden.plots.filter(p => p.healthStatus === 'growing').length,
      mature: garden.plots.filter(p => p.healthStatus === 'mature').length,
      readyToHarvest: garden.plots.filter(p => p.healthStatus === 'ready-to-harvest').length,
      needsWater: garden.plots.filter(p => p.plantId && p.waterLevel < 30).length,
      averageHealth: garden.plots.filter(p => p.plantId).length > 0
        ? Math.round(garden.plots.filter(p => p.plantId).reduce((sum, p) => sum + (p.waterLevel || 0), 0) / garden.plots.filter(p => p.plantId).length)
        : 0
    };
    
    setGardenStats(stats);
  };

  const logCareActivity = async (plotId, careType) => {
    try {
      const plot = garden.plots.find(p => p.plotId === plotId);
      if (plot && garden._id) {
        await careTrackerAPI.logCareActivity({
          virtualGardenId: garden._id,
          plotId,
          plantName: plot.plantName,
          careType,
          waterAmount: careType === 'watered' ? 50 : undefined
        });
      }
    } catch (err) {
      console.error('Error logging care activity:', err);
    }
  };

  const removePlant = async (plotId) => {
    try {
      const plot = garden.plots.find(p => p.plotId === plotId);
      const confirmed = window.confirm(`Remove ${plot.plantName} from this plot?`);
      if (confirmed) {
        const updatedGarden = {
          ...garden,
          plots: garden.plots.map(p => 
            p.plotId === plotId
              ? { ...p, plantId: null, plantName: '', healthStatus: 'empty', waterLevel: 50, lastWaterDate: null }
              : p
          )
        };
        // Update backend
        await gardenAPI.updateGarden(updatedGarden);
        setGarden(updatedGarden);
        notify('Plant removed from plot', 'info');
      }
    } catch (err) {
      console.error('Error removing plant:', err);
      notify('Error removing plant', 'error');
    }
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading garden...</div>;
  }

  if (!garden) {
    return <div className="text-center py-12">No garden found. Please refresh.</div>;
  }

  const getPlotColor = (plot) => {
    if (!plot.plantId) return 'bg-gradient-to-br from-amber-100 to-amber-200';
    switch (plot.healthStatus) {
      case 'seedling':
        return 'bg-gradient-to-br from-yellow-100 to-yellow-200';
      case 'growing':
        return 'bg-gradient-to-br from-green-100 to-green-200';
      case 'mature':
        return 'bg-gradient-to-br from-forest-100 to-forest-200';
      case 'ready-to-harvest':
        return 'bg-gradient-to-br from-amber-200 to-orange-300';
      default:
        return 'bg-gray-100';
    }
  };

  const getHealthIcon = (status) => {
    switch (status) {
      case 'seedling':
        return <Sprout className="w-6 h-6 text-yellow-600" />;
      case 'growing':
        return <Leaf className="w-6 h-6 text-green-600" />;
      case 'mature':
        return <Leaf className="w-6 h-6 text-forest-600" />;
      case 'ready-to-harvest':
        return <Trophy className="w-6 h-6 text-amber-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-10">
      {/* Garden Statistics Cards */}
      {gardenStats && (
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-green-700 text-sm font-semibold uppercase tracking-wide">Planted</p>
              <Sprout className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-900">{gardenStats.plantedPlots}</p>
            <p className="text-xs text-green-700 mt-2">of {gardenStats.totalPlots} plots</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 border border-yellow-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-yellow-700 text-sm font-semibold uppercase tracking-wide">Seedlings</p>
              <TrendingUp className="w-5 h-5 text-yellow-600" />
            </div>
            <p className="text-3xl font-bold text-yellow-900">{gardenStats.seedlings}</p>
            <p className="text-xs text-yellow-700 mt-2">Early stage plants</p>
          </div>
          <div className="bg-gradient-to-br from-forest-50 to-forest-100 rounded-2xl p-6 border border-forest-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-forest-700 text-sm font-semibold uppercase tracking-wide">Ready</p>
              <Trophy className="w-5 h-5 text-forest-600" />
            </div>
            <p className="text-3xl font-bold text-forest-900">{gardenStats.readyToHarvest}</p>
            <p className="text-xs text-forest-700 mt-2">Ready to harvest</p>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border border-red-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-red-700 text-sm font-semibold uppercase tracking-wide">Needs Water</p>
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <p className="text-3xl font-bold text-red-900">{gardenStats.needsWater}</p>
            <p className="text-xs text-red-700 mt-2">Water level {'<'} 30%</p>
          </div>
        </div>
      )}

      {/* Garden Grid */}
      <div className="bg-white rounded-2xl p-8 border border-forest-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-forest-900">Your Garden Plots</h3>
          <p className="text-sm text-forest-600">{garden.plots.length} total plots</p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {garden.plots.map((plot) => (
            <div key={plot.plotId} className="relative">
              <button
                onClick={() => setSelectedPlot(selectedPlot?.plotId === plot.plotId ? null : plot)}
                className={`w-full aspect-square rounded-xl ${getPlotColor(plot)} border-2 border-forest-300 hover:border-forest-500 hover:shadow-lg transition-all duration-200 shadow-md flex items-center justify-center cursor-pointer relative group overflow-hidden`}
              >
                {plot.plantId ? (
                  <div className="text-center">
                    {getHealthIcon(plot.healthStatus)}
                    <p className="text-xs font-semibold text-forest-900 mt-1 line-clamp-1">{plot.plantName}</p>
                    <div className="text-xs text-forest-700 mt-1">H: {plot.waterLevel}%</div>
                  </div>
                ) : (
                  <div className="text-center text-forest-400">
                    <Sprout className="w-6 h-6 mx-auto" />
                    <p className="text-xs font-semibold mt-1">Empty</p>
                  </div>
                )}

                {/* Plot water indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-300 opacity-70" style={{ width: `${plot.waterLevel}%` }}></div>
              </button>

              {/* Plot Actions */}
              {selectedPlot?.plotId === plot.plotId && (
                <div className="absolute top-full mt-1 left-0 right-0 bg-white rounded-lg shadow-lg p-2 z-10 text-xs space-y-1">
                  {!plot.plantId ? (
                    <button
                      onClick={() => setShowPlantSelector(!showPlantSelector)}
                      className="w-full bg-forest-600 text-white py-1 rounded hover:bg-forest-700 transition text-xs"
                    >
                      + Plant
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => waterPlant(plot.plotId)}
                        className="w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600 transition flex items-center justify-center gap-1"
                      >
                        <Droplets className="w-3 h-3" /> Water
                      </button>
                      {plot.healthStatus === 'ready-to-harvest' && (
                        <button
                          onClick={() => harvestPlant(plot.plotId)}
                          className="w-full bg-amber-500 text-white py-1 rounded hover:bg-amber-600 transition"
                        >
                          Harvest
                        </button>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Plant Selection Modal */}
      {selectedPlot && !selectedPlot.plantId && showPlantSelector && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 flex items-center justify-center p-4" onClick={() => setShowPlantSelector(false)}>
          <div className="bg-white rounded-2xl p-8 border border-forest-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-forest-900">Select a Plant to Sow</h3>
                <p className="text-sm text-forest-600 mt-1">Choose from {plants.length} available herbs</p>
              </div>
              <button
                onClick={() => setShowPlantSelector(false)}
                className="text-gray-400 hover:text-gray-600 text-3xl leading-none font-light"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {plants.map((plant) => (
                <button
                  key={plant._id}
                  onClick={() => plantInPlot(selectedPlot.plotId, plant._id)}
                  className="p-4 border border-forest-200 rounded-xl hover:bg-forest-50 hover:border-forest-400 transition-all group"
                >
                  <h4 className="font-semibold text-forest-900 line-clamp-1 group-hover:text-forest-700 text-left text-sm">{plant.name}</h4>
                  <p className="text-xs text-forest-600 line-clamp-2 text-left mt-1">{plant.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
