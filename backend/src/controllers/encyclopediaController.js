import Encyclopedia from '../models/Encyclopedia.js';

export const getAllEncyclopediaEntries = async (req, res) => {
  try {
    const entries = await Encyclopedia.find().sort({ order: 1 });
    res.json({ count: entries.length, entries });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEncyclopediaBySlug = async (req, res) => {
  try {
    const entry = await Encyclopedia.findOne({ slug: req.params.slug }).populate('relatedPlants');
    if (!entry) return res.status(404).json({ error: 'Encyclopedia entry not found' });
    res.json({ data: entry });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createEncyclopedia = async (req, res) => {
  try {
    const entry = new Encyclopedia(req.body);
    await entry.save();
    res.status(201).json({ data: entry });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
