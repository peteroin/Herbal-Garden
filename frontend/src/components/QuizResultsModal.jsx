import React from 'react';
import { CheckCircle, XCircle, Clock, Target } from 'lucide-react';

/**
 * QuizResultsModal - Displays results of a completed quiz
 * Can be shown as a modal overlay or integrated into a page
 */
export default function QuizResultsModal({ 
  quizTitle, 
  score, 
  totalQuestions, 
  correctAnswers,
  timeSpentSeconds,
  onClose,
  showModal = true 
}) {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const minutes = Math.floor(timeSpentSeconds / 60);
  const seconds = timeSpentSeconds % 60;

  // Determine performance level
  const getPerformanceLevel = () => {
    if (percentage >= 90) return { level: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-100', emoji: '🌟' };
    if (percentage >= 75) return { level: 'Good', color: 'text-blue-600', bgColor: 'bg-blue-100', emoji: '👍' };
    if (percentage >= 60) return { level: 'Fair', color: 'text-amber-600', bgColor: 'bg-amber-100', emoji: '👌' };
    return { level: 'Needs Improvement', color: 'text-red-600', bgColor: 'bg-red-100', emoji: '💪' };
  };

  const performance = getPerformanceLevel();

  const content = (
    <div>
      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-4xl mb-3">{performance.emoji}</div>
        <h2 className="text-2xl font-bold text-forest-900 mb-1">Quiz Complete!</h2>
        <p className="text-forest-600">{quizTitle}</p>
      </div>

      {/* Score Display */}
      <div className={`${performance.bgColor} rounded-lg p-6 mb-6 text-center`}>
        <p className={`text-sm font-medium ${performance.color} mb-2 uppercase tracking-wide`}>
          {performance.level} Performance
        </p>
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="text-5xl font-bold text-forest-900">{percentage}</div>
          <div className="text-2xl font-bold text-forest-600">%</div>
        </div>

        <div className="w-full bg-white/50 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all ${
              percentage >= 90 ? 'bg-green-600' :
              percentage >= 75 ? 'bg-blue-600' :
              percentage >= 60 ? 'bg-amber-600' :
              'bg-red-600'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Correct Answers */}
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-green-900">Correct</span>
          </div>
          <p className="text-2xl font-bold text-green-600">
            {correctAnswers}<span className="text-sm text-green-600 font-normal">/{totalQuestions}</span>
          </p>
        </div>

        {/* Incorrect Answers */}
        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
          <div className="flex items-center gap-2 mb-2">
            <XCircle className="w-5 h-5 text-red-600" />
            <span className="text-sm font-medium text-red-900">Incorrect</span>
          </div>
          <p className="text-2xl font-bold text-red-600">
            {totalQuestions - correctAnswers}<span className="text-sm text-red-600 font-normal">/{totalQuestions}</span>
          </p>
        </div>

        {/* Time Spent */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">Time</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">
            {minutes}m {seconds}s
          </p>
        </div>

        {/* Average Time Per Question */}
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-900">Avg/Question</span>
          </div>
          <p className="text-2xl font-bold text-purple-600">
            {Math.round(timeSpentSeconds / totalQuestions)}s
          </p>
        </div>
      </div>

      {/* Feedback */}
      <div className="bg-forest-50 rounded-lg p-4 border border-forest-200 mb-6">
        <h3 className="font-semibold text-forest-900 mb-2">Feedback</h3>
        <p className="text-sm text-forest-700">
          {percentage >= 90
            ? 'Excellent work! You have a strong understanding of this topic. Keep it up!'
            : percentage >= 75
            ? 'Great job! You have a good grasp of the material. A little more practice will help.'
            : percentage >= 60
            ? 'Good effort! Review the material and try the quiz again to improve your score.'
            : 'Keep learning! Review the topic carefully and give it another try.'}
        </p>
      </div>

      {/* Action Buttons */}
      {onClose && (
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gradient-to-r from-forest-600 to-green-600 text-white py-3 px-4 rounded-lg font-medium hover:from-forest-700 hover:to-green-700 transition-all"
          >
            Continue
          </button>
          <button
            onClick={onClose}
            className="px-4 py-3 border border-forest-300 text-forest-700 rounded-lg font-medium hover:bg-forest-50 transition-colors"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );

  if (!showModal) {
    return content;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {content}
        </div>
      </div>
    </div>
  );
}
