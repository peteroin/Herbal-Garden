import express from 'express';
import { getAllQuizzes, getQuizBySlug, createQuiz } from '../controllers/quizController.js';

const router = express.Router();

router.get('/', getAllQuizzes);
router.get('/:slug', getQuizBySlug);
router.post('/', createQuiz);

export default router;
