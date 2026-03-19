import Quiz from '../models/Quiz.js';

export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().sort({ order: 1 });
    res.json({ count: quizzes.length, quizzes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getQuizBySlug = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ slug: req.params.slug });
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    res.json({ data: quiz });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createQuiz = async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).json({ data: quiz });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
