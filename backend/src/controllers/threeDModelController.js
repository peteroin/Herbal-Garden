import ThreeDModel from '../models/ThreeDModel.js';

export const getAllThreeDModels = async (req, res) => {
  try {
    const models = await ThreeDModel.find().sort({ order: 1 });
    res.json({ count: models.length, models });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getThreeDModelBySlug = async (req, res) => {
  try {
    const model = await ThreeDModel.findOne({ slug: req.params.slug });
    if (!model) return res.status(404).json({ error: '3D model not found' });
    res.json({ data: model });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createThreeDModel = async (req, res) => {
  try {
    const model = new ThreeDModel(req.body);
    await model.save();
    res.status(201).json({ data: model });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
