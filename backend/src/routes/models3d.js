import express from 'express';
import { getAllThreeDModels, getThreeDModelBySlug, createThreeDModel } from '../controllers/threeDModelController.js';

const router = express.Router();

router.get('/', getAllThreeDModels);
router.get('/:slug', getThreeDModelBySlug);
router.post('/', createThreeDModel);

export default router;
