import express from 'express';
import { authenticate } from '../middleware/auth.js';
import {
  createDesign,
  getUserDesigns,
  getDesign,
  updateDesign,
  deleteDesign,
  addPlantToDesign,
  removePlantFromDesign,
  getRecommendations,
  getPublicDesigns,
  likeDesign
} from '../controllers/plannerController.js';

const router = express.Router();

// Public routes
router.get('/public', getPublicDesigns);

// Protected routes
router.use(authenticate);

// User's designs
router.post('/', createDesign);
router.get('/', getUserDesigns);
router.get('/:designId', getDesign);
router.put('/:designId', updateDesign);
router.delete('/:designId', deleteDesign);

// Plant management
router.post('/:designId/plants', addPlantToDesign);
router.delete('/:designId/plants/:plantIndex', removePlantFromDesign);

// Recommendations
router.get('/recommendations/suggestions', getRecommendations);

// Like a design
router.post('/:designId/like', likeDesign);

export default router;
