import express from 'express';
import { 
  getAllPlants, 
  getPlantById, 
  searchPlants, 
  createPlant, 
  updatePlant, 
  deletePlant 
} from '../controllers/plantController.js';

const router = express.Router();

router.get('/', getAllPlants);
router.get('/search', searchPlants);
router.get('/:id', getPlantById);
router.post('/', createPlant);
router.put('/:id', updatePlant);
router.delete('/:id', deletePlant);

export default router;
