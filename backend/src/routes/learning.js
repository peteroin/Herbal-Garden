import express from 'express';
import { 
  getAllLearningResources, 
  getLearningResourceBySlug, 
  createLearningResource 
} from '../controllers/learningController.js';

const router = express.Router();

router.get('/', getAllLearningResources);
router.get('/:slug', getLearningResourceBySlug);
router.post('/', createLearningResource);

export default router;
