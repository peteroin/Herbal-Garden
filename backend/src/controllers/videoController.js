import Video from '../models/Video.js';

export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ order: 1 });
    res.json({ count: videos.length, videos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getVideoBySlug = async (req, res) => {
  try {
    const video = await Video.findOne({ slug: req.params.slug });
    if (!video) return res.status(404).json({ error: 'Video not found' });
    res.json({ data: video });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createVideo = async (req, res) => {
  try {
    const video = new Video(req.body);
    await video.save();
    res.status(201).json({ data: video });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
