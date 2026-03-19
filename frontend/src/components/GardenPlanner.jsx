import { useState, useEffect } from 'react';
import { Plus, Trash2, Eye, AlertCircle, CheckCircle, Leaf, TrendingUp } from 'lucide-react';
import { plannerAPI, plantAPI } from '../lib/api';
import { useNotification } from '../hooks/useNotification';

// Companion planting suggestions database
const COMPANION_PLANTING = {
  'basil': { good: ['tomato', 'oregano'], bad: ['rue', 'sage'] },
  'tomato': { good: ['basil', 'carrot', 'parsley'], bad: ['brassica', 'fennel'] },
  'mint': { good: ['tomato', 'cabbage'], bad: ['basil'] },
  'oregano': { good: ['basil', 'thyme'], bad: [] },
  'thyme': { good: ['oregano', 'sage'], bad: [] },
  'parsley': { good: ['tomato', 'asparagus'], bad: [] },
  'sage': { good: ['thyme'], bad: ['basil'] },
  'rosemary': { good: ['sage', 'thyme'], bad: [] }
};

export default function GardenPlanner() {
  const [designs, setDesigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showNewDesign, setShowNewDesign] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [plants, setPlants] = useState([]);
  const [plantMetrics, setPlantMetrics] = useState({});
  const [companionSuggestions, setCompanionSuggestions] = useState({});
  const { notify } = useNotification();
  const [formData, setFormData] = useState({
    designName: '',
    description: '',
    gardenSize: 'medium',
    location: '',
    sunlight: 'partial-shade',
    soilType: 'loamy',
    season: 'spring',
    dimensions: { length: 10, width: 8 },
    plantLayout: [],
    features: {
      hasBench: false,
      hasWaterSource: false,
      hasPath: false,
      hasCompost: false
    }
  });

  useEffect(() => {
    fetchDesigns();
    fetchPlants();
  }, []);

  const fetchDesigns = async () => {
    try {
      setIsLoading(true);
      const response = await plannerAPI.getUserDesigns();
      setDesigns(response.data || []);
    } catch (err) {
      setError('Failed to load designs');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPlants = async () => {
    try {
      const response = await plantAPI.getAllPlants();
      setPlants(response.plants || []);
      
      // Calculate plant metrics (spacing, water needs, etc)
      const metrics = {};
      (response.plants || []).forEach(plant => {
        metrics[plant.name] = {
          spacing: 12, // default 12 inches
          sunlight: plant.sunlight || 'partial-shade',
          waterNeeds: plant.waterNeeds || 'moderate',
          growthRate: plant.growthRate || 'medium',
          harvestTime: plant.harvestTime || 60
        };
      });
      setPlantMetrics(metrics);
    } catch (err) {
      console.error('Error fetching plants:', err);
    }
  };

  const addPlantToLayout = (plantName) => {
    const newPlant = {
      id: Date.now(),
      name: plantName,
      x: Math.random() * 70,
      y: Math.random() * 70,
      spacing: plantMetrics[plantName]?.spacing || 12
    };
    
    setFormData(prev => ({
      ...prev,
      plantLayout: [...prev.plantLayout, newPlant]
    }));

    // Calculate companion suggestions for newly added plant
    calculateCompanionSuggestions([...formData.plantLayout, newPlant]);
    notify(`Added ${plantName} to design`, 'success');
  };

  const calculateCompanionSuggestions = (layout) => {
    const suggestions = {};
    
    layout.forEach(plant => {
      const plantLower = plant.name.toLowerCase();
      const companions = COMPANION_PLANTING[plantLower] || { good: [], bad: [] };
      suggestions[plant.id] = companions;
    });
    
    setCompanionSuggestions(suggestions);
  };

  const calculateGardenSize = () => {
    const { length, width } = formData.dimensions;
    return (length * width).toFixed(1);
  };

  const calculatePlantingDensity = () => {
    const totalArea = calculateGardenSize();
    const plantCount = formData.plantLayout.length;
    return plantCount > 0 ? (plantCount / totalArea * 100).toFixed(1) : 0;
  };

  const removePlantFromLayout = (plantId) => {
    setFormData(prev => ({
      ...prev,
      plantLayout: prev.plantLayout.filter(p => p.id !== plantId)
    }));
    
    const newLayout = formData.plantLayout.filter(p => p.id !== plantId);
    calculateCompanionSuggestions(newLayout);
    notify('Plant removed from design', 'info');
  };

  const updateDimensions = (field, value) => {
    setFormData(prev => ({
      ...prev,
      dimensions: { ...prev.dimensions, [field]: parseInt(value) || 0 }
    }));
  };

  const toggleFeature = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: { ...prev.features, [feature]: !prev.features[feature] }
    }));
  };

  const handleCreateDesign = async (e) => {
    e.preventDefault();
    try {
      const designData = {
        ...formData,
        plantCount: formData.plantLayout.length,
        totalArea: calculateGardenSize(),
        plantingDensity: calculatePlantingDensity(),
        companionPlantingAnalysis: companionSuggestions
      };
      
      const response = await plannerAPI.createDesign(designData);
      setDesigns([response.data, ...designs]);
      setShowNewDesign(false);
      notify('Garden design created successfully!', 'success');
      
      // Reset form
      setFormData({
        designName: '',
        description: '',
        gardenSize: 'medium',
        location: '',
        sunlight: 'partial-shade',
        soilType: 'loamy',
        season: 'spring',
        dimensions: { length: 10, width: 8 },
        plantLayout: [],
        features: {
          hasBench: false,
          hasWaterSource: false,
          hasPath: false,
          hasCompost: false
        }
      });
      setCompanionSuggestions({});
    } catch (err) {
      console.error('Error creating design:', err);
      notify('Failed to create design', 'error');
    }
  };

  const deleteDesign = async (designId) => {
    try {
      await plannerAPI.deleteDesign(designId);
      setDesigns(designs.filter(d => d._id !== designId));
      if (selectedDesign?._id === designId) {
        setSelectedDesign(null);
      }
    } catch (err) {
      console.error('Error deleting design:', err);
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-block px-3 py-1 bg-amber-100 rounded-full text-xs font-semibold text-amber-700 mb-3">
            ✏️ Design & Plan
          </div>
          <h2 className="text-4xl font-bold text-forest-900 mb-2">Garden Planner</h2>
          <p className="text-forest-600">Design and plan your ideal herbal garden layout with personalized recommendations</p>
        </div>
        <button
          onClick={() => setShowNewDesign(!showNewDesign)}
          className="flex items-center gap-2 bg-forest-600 text-white px-6 py-3 rounded-xl hover:bg-forest-700 transition-all font-semibold shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" /> New Design
        </button>
      </div>

      {/* New Design Form */}
      {showNewDesign && (
        <form onSubmit={handleCreateDesign} className="bg-white rounded-2xl p-8 border border-forest-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-forest-900">Create New Design</h3>
            <button
              type="button"
              onClick={() => setShowNewDesign(false)}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-forest-900 mb-2">Design Name *</label>
              <input
                type="text"
                required
                value={formData.designName}
                onChange={(e) => setFormData({ ...formData, designName: e.target.value })}
                className="w-full border border-forest-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition"
                placeholder="e.g., Medicinal Tea Garden"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-forest-900 mb-2">Garden Size *</label>
              <select
                value={formData.gardenSize}
                onChange={(e) => setFormData({ ...formData, gardenSize: e.target.value })}
                className="w-full border border-forest-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition"
              >
                <option value="small">Small (4x4 ft)</option>
                <option value="medium">Medium (8x8 ft)</option>
                <option value="large">Large (12x12 ft)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-forest-900 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full border border-forest-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition"
              placeholder="Describe your garden vision..."
              rows="3"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-forest-900 mb-2">Sunlight</label>
              <select
                value={formData.sunlight}
                onChange={(e) => setFormData({ ...formData, sunlight: e.target.value })}
                className="w-full border border-forest-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition"
              >
                <option value="full-sun">Full Sun (6-8 hours)</option>
                <option value="partial-shade">Partial Shade (3-6 hours)</option>
                <option value="full-shade">Full Shade (&lt;3 hours)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-forest-900 mb-2">Season</label>
              <select
                value={formData.season}
                onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                className="w-full border border-forest-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition"
              >
                <option value="spring">Spring</option>
                <option value="summer">Summer</option>
                <option value="fall">Fall</option>
                <option value="winter">Winter</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-forest-900 mb-3">Garden Features</label>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(formData.features).map(([key, value]) => (
                <label key={key} className="flex items-center gap-3 p-3 border border-forest-200 rounded-xl hover:bg-forest-50 cursor-pointer transition">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        features: { ...formData.features, [key]: e.target.checked }
                      })
                    }
                    className="w-5 h-5 rounded border-forest-300 accent-forest-600"
                  />
                  <span className="text-sm text-forest-700 font-medium">
                    {key === 'hasBench' && '🪑 Seating Bench'}
                    {key === 'hasWaterSource' && '💧 Water Source'}
                    {key === 'hasPath' && '🛤️ Walkway Path'}
                    {key === 'hasCompost' && '♻️ Compost Area'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-forest-600 text-white px-6 py-3 rounded-xl hover:bg-forest-700 transition font-semibold"
            >
              Create Design
            </button>
            <button
              type="button"
              onClick={() => setShowNewDesign(false)}
              className="flex-1 border-2 border-forest-300 text-forest-600 px-6 py-3 rounded-xl hover:bg-forest-50 transition font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Designs Grid */}
      {isLoading ? (
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-forest-600"></div>
          </div>
          <p className="text-forest-600 mt-4">Loading your designs...</p>
        </div>
      ) : designs.length === 0 ? (
        <div className="text-center py-20 bg-forest-50 rounded-2xl border-2 border-dashed border-forest-200">
          <p className="text-forest-600 mb-6 text-lg">No garden designs yet.</p>
          <p className="text-forest-500 mb-8">Create your first design to get started!</p>
          <button
            onClick={() => setShowNewDesign(true)}
            className="inline-flex items-center gap-2 bg-forest-600 text-white px-6 py-3 rounded-xl hover:bg-forest-700 transition font-semibold"
          >
            <Plus className="w-5 h-5" /> Create First Design
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {designs.map((design) => (
            <div key={design._id} className="bg-white rounded-2xl p-6 border border-forest-200 hover:shadow-lg hover:border-forest-300 transition-all group">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold text-forest-900 flex-1">{design.designName}</h3>
                <button
                  onClick={() => deleteDesign(design._id)}
                  className="text-gray-400 hover:text-red-600 transition opacity-0 group-hover:opacity-100"
                  title="Delete design"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <p className="text-sm text-forest-600 line-clamp-2 mb-4">{design.description}</p>
              
              <div className="space-y-3 mb-6 py-4 border-y border-forest-200">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-forest-600">Size:</span>
                  <span className="font-semibold text-forest-900 capitalize">{design.gardenSize}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-forest-600">Sunlight:</span>
                  <span className="font-semibold text-forest-900 capitalize">{design.sunlight.replace('-', ' ')}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-forest-600">Season:</span>
                  <span className="font-semibold text-forest-900 capitalize">{design.season}</span>
                </div>
              </div>

              {design.plants && design.plants.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-semibold text-forest-900 mb-2 uppercase tracking-wide">Plants ({design.plants.length})</p>
                  <div className="flex flex-wrap gap-2">
                    {design.plants.slice(0, 3).map((plant, idx) => (
                      <span key={idx} className="bg-forest-100 text-forest-700 text-xs px-3 py-1 rounded-full font-medium">
                        {plant.plantName || 'Plant'}
                      </span>
                    ))}
                    {design.plants.length > 3 && (
                      <span className="bg-forest-100 text-forest-700 text-xs px-3 py-1 rounded-full font-medium">
                        +{design.plants.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              )}

              <button
                onClick={() => setSelectedDesign(design)}
                className="w-full bg-forest-600 text-white py-2.5 rounded-xl hover:bg-forest-700 transition font-semibold text-sm flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" /> View Design
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Design Detail View */}
      {selectedDesign && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 flex items-center justify-center p-4" onClick={() => setSelectedDesign(null)}>
          <div className="bg-white rounded-2xl p-8 border border-forest-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-3xl font-bold text-forest-900">{selectedDesign.designName}</h3>
              <button
                onClick={() => setSelectedDesign(null)}
                className="text-gray-400 hover:text-gray-600 text-3xl leading-none font-light"
              >
                ×
              </button>
            </div>
            <p className="text-forest-700 mb-6 text-sm">{selectedDesign.description}</p>
            
            <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-forest-50 rounded-xl border border-forest-200">
              <div className="text-center">
                <p className="text-forest-600 text-xs uppercase tracking-wide font-semibold">Size</p>
                <p className="font-bold text-forest-900 mt-1 capitalize">{selectedDesign.gardenSize}</p>
              </div>
              <div className="text-center border-l border-r border-forest-200">
                <p className="text-forest-600 text-xs uppercase tracking-wide font-semibold">Sunlight</p>
                <p className="font-bold text-forest-900 mt-1 capitalize">{selectedDesign.sunlight.replace('-', ' ')}</p>
              </div>
              <div className="text-center">
                <p className="text-forest-600 text-xs uppercase tracking-wide font-semibold">Plants</p>
                <p className="font-bold text-forest-900 mt-1">{selectedDesign.plants?.length || 0}</p>
              </div>
            </div>

            {selectedDesign.plants && selectedDesign.plants.length > 0 && (
              <div>
                <h4 className="font-bold text-forest-900 mb-4 flex items-center gap-2">
                  <span className="text-xl">🌿</span> Plants in This Design
                </h4>
                <div className="space-y-3">
                  {selectedDesign.plants.map((plant, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-forest-50 rounded-xl border border-forest-200 hover:bg-forest-100 transition">
                      <div>
                        <p className="font-semibold text-forest-900">{plant.plantName}</p>
                        <p className="text-xs text-forest-600 mt-1">Qty: {plant.quantity || 1} · Spacing: {plant.spacing || 12}"</p>
                      </div>
                      <span className="bg-forest-200 text-forest-700 text-xs font-bold px-3 py-1 rounded-full">#{idx + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <button
              onClick={() => setSelectedDesign(null)}
              className="w-full mt-8 py-3 bg-forest-600 text-white rounded-xl hover:bg-forest-700 transition font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
