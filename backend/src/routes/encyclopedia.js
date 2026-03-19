import express from 'express';
import { getAllEncyclopediaEntries, getEncyclopediaBySlug, createEncyclopedia } from '../controllers/encyclopediaController.js';

const router = express.Router();

router.get('/', getAllEncyclopediaEntries);
router.get('/:slug', getEncyclopediaBySlug);
router.post('/', createEncyclopedia);

export default router;
