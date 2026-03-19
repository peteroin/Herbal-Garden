import Favorite from '../models/Favorite.js';
import Plant from '../models/Plant.js';
import Video from '../models/Video.js';
import Encyclopedia from '../models/Encyclopedia.js';
import ThreeDModel from '../models/ThreeDModel.js';
import User from '../models/User.js';
import mongoose from 'mongoose';

// Map resource types to their models
const getResourceModel = (resourceType) => {
  const models = {
    plant: Plant,
    video: Video,
    encyclopedia: Encyclopedia,
    model3d: ThreeDModel,
  };
  return models[resourceType] || Plant;
};

export const addFavorite = async (req, res) => {
  try {
    const { resourceId, resourceType = 'plant', resourceName = '' } = req.body;
    const userId = req.user._id;

    if (!resourceId) {
      return res.status(400).json({ error: 'Resource ID is required' });
    }

    if (!mongoose.Types.ObjectId.isValid(resourceId)) {
      return res.status(400).json({ error: 'Invalid resource ID format' });
    }

    if (!['plant', 'video', 'encyclopedia', 'model3d', 'tour'].includes(resourceType)) {
      return res.status(400).json({ error: 'Invalid resource type' });
    }

    // Convert to ObjectId for consistent querying
    const objectId = new mongoose.Types.ObjectId(resourceId);

    // Verify resource exists
    const ResourceModel = getResourceModel(resourceType);
    const resourceExists = await ResourceModel.findById(objectId);
    if (!resourceExists) {
      return res.status(404).json({ error: `${resourceType} not found` });
    }

    // Check if already favorited
    const favoriteExists = await Favorite.findOne({
      userId,
      resourceType,
      resourceId: objectId
    });
    if (favoriteExists) {
      return res.status(400).json({ error: 'Already in favorites' });
    }

    // Create favorite
    const favorite = new Favorite({
      userId,
      resourceId: objectId,
      resourceType,
      resourceName: resourceName || resourceExists.title || resourceExists.name || 'Untitled'
    });
    await favorite.save();

    // Also add to user's favorites array
    await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          favorites: {
            resourceId: objectId,
            resourceType,
            resourceName: resourceName || resourceExists.title || resourceExists.name || 'Untitled',
            addedAt: new Date()
          }
        }
      },
      { new: true }
    );

    res.status(201).json({
      message: 'Added to favorites',
      favorite
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const { resourceId } = req.params;
    const { type: resourceType } = req.query;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(resourceId)) {
      return res.status(400).json({ error: 'Invalid resource ID' });
    }

    const objectId = new mongoose.Types.ObjectId(resourceId);

    const favorite = await Favorite.findOneAndDelete({
      userId,
      resourceId: objectId,
      resourceType: resourceType || 'plant'
    });

    if (!favorite) {
      return res.status(404).json({ error: 'Favorite not found' });
    }

    // Also remove from user's favorites array
    await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          favorites: {
            resourceId: objectId,
            resourceType: resourceType || 'plant'
          }
        }
      },
      { new: true }
    );

    res.json({ message: 'Removed from favorites' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserFavorites = async (req, res) => {
  try {
    const userId = req.user._id;

    const favorites = await Favorite.find({ userId })
      .sort({ createdAt: -1 });

    // Group by resource type for better organization
    const grouped = favorites.reduce((acc, fav) => {
      if (!acc[fav.resourceType]) {
        acc[fav.resourceType] = [];
      }
      acc[fav.resourceType].push(fav);
      return acc;
    }, {});

    res.json({
      count: favorites.length,
      favorites,
      grouped
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFavoritesByType = async (req, res) => {
  try {
    const { resourceType } = req.params;
    const userId = req.user._id;

    if (!['plant', 'video', 'encyclopedia', 'model3d', 'tour'].includes(resourceType)) {
      return res.status(400).json({ error: 'Invalid resource type' });
    }

    const favorites = await Favorite.find({ userId, resourceType })
      .sort({ createdAt: -1 });

    res.json({
      count: favorites.length,
      favorites,
      resourceType
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const isFavorite = async (req, res) => {
  try {
    const { resourceId } = req.params;
    const { type: resourceType } = req.query;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(resourceId)) {
      return res.status(400).json({ error: 'Invalid resource ID' });
    }

    const favorite = await Favorite.findOne({
      userId,
      resourceId: new mongoose.Types.ObjectId(resourceId),
      resourceType: resourceType || 'plant'
    });

    res.json({ isFavorite: !!favorite });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
