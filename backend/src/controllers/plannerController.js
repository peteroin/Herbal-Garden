import GardenDesign from '../models/GardenDesign.js';
import Plant from '../models/Plant.js';

// Create a new garden design
export const createDesign = async (req, res) => {
  try {
    const userId = req.user.id;
    const { designName, description, gardenSize, location, sunlight, soilType, season, plants, layout, features } = req.body;

    if (!designName || !gardenSize) {
      return res.status(400).json({ error: 'Design name and garden size are required' });
    }

    const design = new GardenDesign({
      userId,
      designName,
      description,
      gardenSize,
      location,
      sunlight: sunlight || 'partial-shade',
      soilType: soilType || 'loamy',
      season: season || 'spring',
      plants: plants || [],
      layout: layout || { width: 400, height: 300, gridSize: 50 },
      features: features || {}
    });

    await design.save();
    res.status(201).json({ data: design });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all designs for a user
export const getUserDesigns = async (req, res) => {
  try {
    const userId = req.user.id;
    const designs = await GardenDesign.find({ userId })
      .populate('plants.plantId')
      .sort({ createdAt: -1 });

    res.json({ data: designs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific design
export const getDesign = async (req, res) => {
  try {
    const { designId } = req.params;
    const design = await GardenDesign.findById(designId).populate('plants.plantId');

    if (!design) {
      return res.status(404).json({ error: 'Design not found' });
    }

    res.json({ data: design });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a design
export const updateDesign = async (req, res) => {
  try {
    const userId = req.user.id;
    const { designId } = req.params;
    const updates = req.body;

    const design = await GardenDesign.findById(designId);

    if (!design) {
      return res.status(404).json({ error: 'Design not found' });
    }

    if (design.userId.toString() !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    Object.assign(design, updates);
    await design.save();

    res.json({ data: design });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a design
export const deleteDesign = async (req, res) => {
  try {
    const userId = req.user.id;
    const { designId } = req.params;

    const design = await GardenDesign.findById(designId);

    if (!design) {
      return res.status(404).json({ error: 'Design not found' });
    }

    if (design.userId.toString() !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await GardenDesign.findByIdAndDelete(designId);

    res.json({ message: 'Design deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add plant to design
export const addPlantToDesign = async (req, res) => {
  try {
    const userId = req.user.id;
    const { designId } = req.params;
    const { plantId, position, quantity, spacing } = req.body;

    const design = await GardenDesign.findById(designId);

    if (!design) {
      return res.status(404).json({ error: 'Design not found' });
    }

    if (design.userId.toString() !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const plant = await Plant.findById(plantId);
    if (!plant) {
      return res.status(404).json({ error: 'Plant not found' });
    }

    const newPlant = {
      plantId,
      plantName: plant.name,
      position: position || { x: 0, y: 0 },
      quantity: quantity || 1,
      spacing: spacing || 12,
      hardinessZone: plant.hardinessZone || 'Zone 5-9'
    };

    design.plants.push(newPlant);
    await design.save();

    res.json({ data: design });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove plant from design
export const removePlantFromDesign = async (req, res) => {
  try {
    const userId = req.user.id;
    const { designId, plantIndex } = req.params;

    const design = await GardenDesign.findById(designId);

    if (!design) {
      return res.status(404).json({ error: 'Design not found' });
    }

    if (design.userId.toString() !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    design.plants.splice(plantIndex, 1);
    await design.save();

    res.json({ data: design });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get design recommendations based on season and sunlight
export const getRecommendations = async (req, res) => {
  try {
    const { season, sunlight, soilType } = req.query;

    const query = {};

    // Find plants that match the criteria
    const plants = await Plant.find({
      ...(soilType && { soilType: { $regex: soilType, $options: 'i' } })
    }).limit(20);

    res.json({
      data: {
        plants,
        tips: getSeasonalTips(season),
        recommendations: getSunlightRecommendations(sunlight)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get public designs (for inspiration)
export const getPublicDesigns = async (req, res) => {
  try {
    const { page = 1, limit = 12 } = req.query;
    const skip = (page - 1) * limit;

    const designs = await GardenDesign.find({ isPublic: true })
      .populate('userId', 'name email')
      .populate('plants.plantId')
      .sort({ likes: -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await GardenDesign.countDocuments({ isPublic: true });

    res.json({
      data: designs,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Like a design
export const likeDesign = async (req, res) => {
  try {
    const { designId } = req.params;

    const design = await GardenDesign.findByIdAndUpdate(
      designId,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!design) {
      return res.status(404).json({ error: 'Design not found' });
    }

    res.json({ data: design });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Helper functions
function getSeasonalTips(season) {
  const tips = {
    spring: [
      'Plant cool-season herbs like parsley, chives, and mint',
      'Start seeds indoors 6-8 weeks before last frost',
      'Prepare soil with compost'
    ],
    summer: [
      'Plant heat-loving herbs like basil and oregano',
      'Increase watering frequency',
      'Provide afternoon shade for sensitive plants'
    ],
    fall: [
      'Plant cool-season crops like cilantro and dill',
      'Mulch around plants for winter protection',
      'Reduce fertilizing'
    ],
    winter: [
      'Focus on cold-hardy herbs like rosemary and thyme',
      'Plant garlic for spring harvest',
      'Protect plants from harsh weather'
    ]
  };

  return tips[season] || tips.spring;
}

function getSunlightRecommendations(sunlight) {
  const recommendations = {
    'full-sun': 'Choose heat-loving herbs like basil, oregano, and thyme',
    'partial-shade': 'Consider mint, parsley, and lemon balm',
    'full-shade': 'Try shade-tolerant herbs like sorrel and sweet woodruff'
  };

  return recommendations[sunlight] || 'Mixed sun exposure allows for variety';
}
