import React from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Trophy, PlayCircle } from 'lucide-react';

export default function ProgressPreview() {
  const { progress, statistics, isLoading } = useProgress();
  const navigate = useNavigate();

  if (isLoading || !statistics) {
    return null;
  }

  const hasProgress =
    (progress?.quizzesCompleted?.length > 0) ||
    (progress?.videosWatched?.length > 0) ||
    (progress?.encyclopediaEntriesViewed?.length > 0);

  if (!hasProgress) {
    return null;
  }

  // Get the most recent activities
  const recentActivities = [];

  if (progress?.quizzesCompleted?.length > 0) {
    const lastQuiz = progress.quizzesCompleted[progress.quizzesCompleted.length - 1];
    recentActivities.push({
      icon: Trophy,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
      label: 'Last Quiz Score',
      value: `${lastQuiz.score}%`,
      progress: lastQuiz.score
    });
  }

  if (progress?.videosWatched?.length > 0) {
    const lastVideo = progress.videosWatched[progress.videosWatched.length - 1];
    recentActivities.push({
      icon: PlayCircle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      label: 'Last Video',
      value: `${lastVideo.percentWatched || 0}% watched`,
      progress: lastVideo.percentWatched || 0
    });
  }

  return (
    <div className="bg-gradient-to-br from-forest-50 to-green-50 rounded-lg border border-forest-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-forest-900">Continue Learning</h3>
        <button
          onClick={() => navigate('/dashboard')}
          className="text-forest-600 hover:text-forest-900 text-sm font-medium flex items-center gap-1"
        >
          View Dashboard <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recentActivities.slice(0, 3).map((activity, index) => {
          const Icon = activity.icon;
          return (
            <div key={index} className="bg-white rounded-lg p-4 border border-forest-100">
              <div className={`${activity.bgColor} w-10 h-10 rounded-full flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${activity.color}`} />
              </div>
              <p className="text-sm text-forest-600 mb-1">{activity.label}</p>
              <p className="font-semibold text-forest-900 truncate mb-2">{activity.value}</p>
              {activity.progress !== undefined && (
                <div className="w-full bg-forest-100 rounded-full h-1.5">
                  <div
                    className="bg-gradient-to-r from-green-500 to-green-600 h-1.5 rounded-full transition-all"
                    style={{ width: `${Math.min(activity.progress, 100)}%` }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-forest-200 flex items-center justify-between">
        <div className="flex gap-6 text-sm">
          <div>
            <p className="text-forest-600">Quizzes Completed</p>
            <p className="text-2xl font-bold text-purple-600">{statistics.totalQuizzesCompleted || 0}</p>
          </div>
          <div>
            <p className="text-forest-600">Videos Watched</p>
            <p className="text-2xl font-bold text-blue-600">{statistics.totalVideosWatched || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
