import LearningResource from '../models/LearningResource.js';

export const getAllLearningResources = async (req, res) => {
  try {
    const resources = await LearningResource.find().sort({ order: 1 });
    res.json({
      count: resources.length,
      resources
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLearningResourceBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const resource = await LearningResource.findOne({ slug });

    if (!resource) {
      return res.status(404).json({ error: 'Learning resource not found' });
    }

    res.json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createLearningResource = async (req, res) => {
  try {
    const { title, slug, description, type, href, icon, content, order } = req.body;

    const resource = new LearningResource({
      title,
      slug: slug || title.toLowerCase().replace(/\s+/g, '-'),
      description,
      type,
      href,
      icon,
      content,
      order
    });

    await resource.save();

    res.status(201).json({
      message: 'Learning resource created',
      resource
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
