import express from 'express';
import { authenticate } from '../middleware/auth.js';
import {
  logCareActivity,
  getCareLogs,
  getCareSchedule,
  getPlantCareHistory,
  getCareTips,
  getCareStatistics
} from '../controllers/careTrackerController.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Log care activity
router.post('/activity', logCareActivity);

// Get care logs
router.get('/', getCareLogs);

// Get care tips (must come BEFORE parameterized routes)
router.get('/tips', getCareTips);

// Get care schedule for a garden
router.get('/:virtualGardenId/schedule', getCareSchedule);

// Get plant care history
router.get('/:virtualGardenId/:plotId/history', getPlantCareHistory);

// Get care statistics
router.get('/:virtualGardenId/statistics', getCareStatistics);

export default router;
