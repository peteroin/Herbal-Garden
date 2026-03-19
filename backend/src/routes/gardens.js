import express from 'express';
import { authenticate } from '../middleware/auth.js';
import {
  getUserGarden,
  createGarden,
  plantInPlot,
  waterPlant,
  updatePlantHealth,
  harvestPlant,
  getCareLogs,
  getGardenStats
} from '../controllers/gardenController.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Get or create user's virtual garden
router.get('/', getUserGarden);

// Create a new garden
router.post('/', createGarden);

// Get garden statistics
router.get('/stats', getGardenStats);

// Plant a plant in a plot
router.post('/plant', plantInPlot);

// Water a plant
router.patch('/water', waterPlant);

// Update plant health
router.patch('/health', updatePlantHealth);

// Harvest a plant
router.patch('/harvest', harvestPlant);

// Get care logs for a plot
router.get('/care-logs/:plotId', getCareLogs);

export default router;
