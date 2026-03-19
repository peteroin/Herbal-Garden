import express from 'express';
import { authenticate } from '../middleware/auth.js';
import {
  getUserProgress,
  completeQuiz,
  markVideoWatched,
  recordEncyclopediaView,
  getProgressStatistics,
  getCompletedQuizzes
} from '../controllers/progressController.js';

const router = express.Router();

// All progress endpoints require authentication
router.use(authenticate);

// Get user progress
router.get('/', getUserProgress);

// Get progress statistics
router.get('/statistics', getProgressStatistics);

// Get completed quizzes
router.get('/quizzes/completed', getCompletedQuizzes);

// Complete a quiz
router.post('/quizzes/complete', completeQuiz);

// Mark video as watched
router.post('/videos/watched', markVideoWatched);

// Record encyclopedia view
router.post('/encyclopedia/viewed', recordEncyclopediaView);

export default router;
