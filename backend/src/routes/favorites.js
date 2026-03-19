import express from 'express';
import authenticate from '../middleware/auth.js';
import { 
  addFavorite, 
  removeFavorite, 
  getUserFavorites, 
  getFavoritesByType,
  isFavorite 
} from '../controllers/favoriteController.js';

const router = express.Router();

// All favorite routes require authentication
router.use(authenticate);

// Most specific routes first
router.post('/', addFavorite);
router.get('/check/:resourceId', isFavorite);
router.get('/type/:resourceType', getFavoritesByType);
router.delete('/:resourceId', removeFavorite);
router.get('/', getUserFavorites);

export default router;
