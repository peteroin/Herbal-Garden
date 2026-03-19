import React from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { Trophy, PlayCircle, Zap } from 'lucide-react';

export default function RecentActivityFeed() {
  const { progress, isLoading } = useProgress();

  if (isLoading || !progress) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="animate-spin">Loading activities...</div>
      </div>
    );
  }

  // Combine all activities and sort by most recent
  const allActivities = [];

  if (progress.quizzesCompleted) {
    progress.quizzesCompleted.forEach(quiz => {
      allActivities.push({
        type: 'quiz',
        title: `Completed quiz: ${quiz.quizTitle}`,
        date: quiz.completedAt,
        icon: Trophy,
        color: 'text-purple-600',
        bgColor: 'bg-purple-100',
        detail: `Score: ${quiz.score}% (${quiz.correctAnswers}/${quiz.totalQuestions} correct)`
      });
    });
  }

  if (progress.videosWatched) {
    progress.videosWatched.forEach(video => {
      allActivities.push({
        type: 'video',
        title: `Watched video: ${video.videoTitle}`,
        date: video.watchedAt,
        icon: PlayCircle,
        color: 'text-blue-600',
        bgColor: 'bg-blue-100',
        detail: `${video.percentWatched || 0}% watched`
      });
    });
  }

  if (progress.encyclopediaEntriesViewed) {
    progress.encyclopediaEntriesViewed.forEach(entry => {
      allActivities.push({
        type: 'encyclopedia',
        title: `Viewed: ${entry.entryTitle}`,
        date: entry.viewedAt,
        icon: Zap,
        color: 'text-orange-600',
        bgColor: 'bg-orange-100',
        detail: 'Encyclopedia entry'
      });
    });
  }

  // Sort by date descending (most recent first)
  allActivities.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Show only last 10 activities
  const recentActivities = allActivities.slice(0, 10);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  if (recentActivities.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-forest-200 p-8 text-center">
        <Zap className="w-12 h-12 text-forest-300 mx-auto mb-3" />
        <p className="text-forest-600">No learning activities yet. Start your learning journey!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-forest-900">Recent Activity</h2>
      
      <div className="bg-white rounded-lg shadow-sm border border-forest-200 overflow-hidden">
        {recentActivities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <div
              key={`${activity.type}-${index}`}
              className={`p-4 border-b border-forest-100 last:border-b-0 hover:bg-forest-50 transition-colors ${
                index % 2 === 0 ? 'bg-white' : 'bg-forest-50/50'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`${activity.bgColor} w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1`}>
                  <Icon className={`w-5 h-5 ${activity.color}`} />
                </div>
                
                <div className="flex-grow min-w-0">
                  <h3 className="font-medium text-forest-900 truncate">{activity.title}</h3>
                  <p className="text-sm text-forest-600">{activity.detail}</p>
                </div>

                <div className="flex items-center gap-1 text-forest-500 text-sm flex-shrink-0 ml-2">
                  <span>{formatDate(activity.date)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {allActivities.length > 10 && (
        <p className="text-center text-forest-600 text-sm">
          Showing 10 of {allActivities.length} activities
        </p>
      )}
    </div>
  );
}
