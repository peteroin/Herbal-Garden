import Progress from '../models/Progress.js';
import Quiz from '../models/Quiz.js';
import Video from '../models/Video.js';
import Encyclopedia from '../models/Encyclopedia.js';

// Get user progress
export const getUserProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    let progress = await Progress.findOne({ userId });

    if (!progress) {
      // Create new progress document if it doesn't exist
      progress = new Progress({ userId });
      await progress.save();
    }

    res.json({ data: progress });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Complete a quiz
export const completeQuiz = async (req, res) => {
  try {
    const userId = req.user.id;
    const { quizId, quizSlug, quizTitle, score, totalQuestions, correctAnswers, timeSpentSeconds } = req.body;

    if (!quizId || !quizSlug || !quizTitle || score === undefined) {
      return res.status(400).json({ error: 'Quiz ID, slug, title, and score are required' });
    }

    let userProgress = await Progress.findOne({ userId });
    if (!userProgress) {
      userProgress = new Progress({ userId });
    }

    // Check if quiz already completed
    const existingQuiz = userProgress.quizzesCompleted.find(q => q.quizId.toString() === quizId);
    if (existingQuiz) {
      // Update existing quiz score if new score is better
      if (score > existingQuiz.score) {
        existingQuiz.score = score;
        existingQuiz.correctAnswers = correctAnswers;
        existingQuiz.totalQuestions = totalQuestions;
        existingQuiz.timeSpentSeconds = timeSpentSeconds || 0;
        existingQuiz.completedAt = new Date();
      }
    } else {
      // Add new completed quiz
      userProgress.quizzesCompleted.push({
        quizId,
        quizSlug,
        quizTitle,
        score,
        totalQuestions,
        correctAnswers,
        timeSpentSeconds: timeSpentSeconds || 0
      });
    }

    await userProgress.save();
    res.json({ data: userProgress });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mark video as watched
export const markVideoWatched = async (req, res) => {
  try {
    const userId = req.user.id;
    const { videoId, videoSlug, videoTitle, percentWatched, duration } = req.body;

    if (!videoId || !videoSlug || !videoTitle) {
      return res.status(400).json({ error: 'Video ID, slug, and title are required' });
    }

    let userProgress = await Progress.findOne({ userId });
    if (!userProgress) {
      userProgress = new Progress({ userId });
    }

    // Check if video already watched
    const existingVideo = userProgress.videosWatched.find(v => v.videoId.toString() === videoId);
    if (existingVideo) {
      // Update percentage watched to maximum
      existingVideo.percentWatched = Math.max(existingVideo.percentWatched, percentWatched || 0);
    } else {
      // Add new watched video
      userProgress.videosWatched.push({
        videoId,
        videoSlug,
        videoTitle,
        percentWatched: percentWatched || 100,
        duration: duration || 0
      });
    }

    await userProgress.save();
    res.json({ data: userProgress });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Record encyclopedia entry view
export const recordEncyclopediaView = async (req, res) => {
  try {
    const userId = req.user.id;
    const { entryId, entrySlug, entryTitle } = req.body;

    if (!entryId || !entrySlug || !entryTitle) {
      return res.status(400).json({ error: 'Entry ID, slug, and title are required' });
    }

    let userProgress = await Progress.findOne({ userId });
    if (!userProgress) {
      userProgress = new Progress({ userId });
    }

    // Add view (can have multiple views of same entry)
    userProgress.encyclopediaEntriesViewed.push({
      entryId,
      entrySlug,
      entryTitle
    });

    await userProgress.save();
    res.json({ data: userProgress });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get progress statistics
export const getProgressStatistics = async (req, res) => {
  try {
    const userId = req.user.id;
    const progress = await Progress.findOne({ userId });

    if (!progress) {
      return res.json({
        data: {
          statistics: {
            totalToursStarted: 0,
            totalToursCompleted: 0,
            totalQuizzesCompleted: 0,
            totalQuizScore: 0,
            averageQuizScore: 0,
            totalVideosWatched: 0,
            totalEncyclopediaViewed: 0,
            totalLearningMinutes: 0
          }
        }
      });
    }

    res.json({ data: progress.statistics });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get completed quizzes
export const getCompletedQuizzes = async (req, res) => {
  try {
    const userId = req.user.id;
    const progress = await Progress.findOne({ userId });

    if (!progress) {
      return res.json({ data: [] });
    }

    res.json({ data: progress.quizzesCompleted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
