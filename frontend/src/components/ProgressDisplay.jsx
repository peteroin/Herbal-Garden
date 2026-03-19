import React from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { Trophy, PlayCircle, FileText } from 'lucide-react';

export default function ProgressDisplay() {
  const { statistics, isLoading } = useProgress();

  if (isLoading || !statistics) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="animate-spin">Loading progress...</div>
      </div>
    );
  }

  const statCards = [
    {
      icon: Trophy,
      label: 'Quizzes Completed',
      value: statistics.totalQuizzesCompleted || 0,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100'
    },
    {
      icon: PlayCircle,
      label: 'Videos Watched',
      value: statistics.totalVideosWatched || 0,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: FileText,
      label: 'Encyclopedia Viewed',
      value: statistics.totalEncyclopediaViewed || 0,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-forest-900 mb-4">Your Learning Progress</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white rounded-lg shadow-sm border border-forest-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className={`${stat.bgColor} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <h3 className="text-sm font-medium text-forest-600 mb-1">{stat.label}</h3>
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            );
          })}
        </div>
      </div>

      {statistics.averageQuizScore > 0 && (
        <div className="bg-gradient-to-r from-forest-50 to-green-50 rounded-lg p-6 border border-forest-200">
          <h3 className="text-lg font-semibold text-forest-900 mb-2">Quiz Performance</h3>
          <p className="text-forest-700">
            Average Score: <span className="font-bold text-green-600">{statistics.averageQuizScore}%</span>
          </p>
          <div className="mt-3 w-full bg-forest-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
              style={{ width: `${statistics.averageQuizScore}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
