import express from 'express';
import { getAllVideos, getVideoBySlug, createVideo } from '../controllers/videoController.js';

const router = express.Router();

router.get('/', getAllVideos);
router.get('/:slug', getVideoBySlug);
router.post('/', createVideo);

export default router;
