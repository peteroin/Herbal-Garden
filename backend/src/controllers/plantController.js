import Plant from '../models/Plant.js';

export const getAllPlants = async (req, res) => {
  try {
    const plants = await Plant.find();
    res.json({
      count: plants.length,
      plants
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPlantById = async (req, res) => {
  try {
    const { id } = req.params;
    const plant = await Plant.findById(id);

    if (!plant) {
      return res.status(404).json({ error: 'Plant not found' });
    }

    res.json(plant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const searchPlants = async (req, res) => {
  try {
    const { q, type, region, ayush } = req.query;

    let filter = {};

    if (q) {
      filter.$text = { $search: q };
    }

    if (type) {
      filter.plantType = type;
    }

    if (region) {
      filter.region = region;
    }

    if (ayush) {
      filter.ayushSystem = ayush;
    }

    const plants = await Plant.find(filter);

    res.json({
      count: plants.length,
      plants
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createPlant = async (req, res) => {
  try {
    const plant = new Plant(req.body);
    await plant.save();

    res.status(201).json({
      message: 'Plant created successfully',
      plant
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updatePlant = async (req, res) => {
  try {
    const { id } = req.params;
    const plant = await Plant.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    if (!plant) {
      return res.status(404).json({ error: 'Plant not found' });
    }

    res.json({
      message: 'Plant updated successfully',
      plant
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deletePlant = async (req, res) => {
  try {
    const { id } = req.params;
    const plant = await Plant.findByIdAndDelete(id);

    if (!plant) {
      return res.status(404).json({ error: 'Plant not found' });
    }

    res.json({ message: 'Plant deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
