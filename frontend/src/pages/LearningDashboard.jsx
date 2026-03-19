import { useEffect } from "react";
import SectionHeading from "../components/ui/SectionHeading";
import ProgressDisplay from "../components/ProgressDisplay";
import RecentActivityFeed from "../components/RecentActivityFeed";
import { useProgress } from "../contexts/ProgressContext";

export default function LearningDashboard() {
  const { progress, isLoading, refreshProgress } = useProgress();

  useEffect(() => {
    refreshProgress();
  }, [refreshProgress]);

  return (
    <div className="min-h-screen bg-forest-50">
      {/* Hero Banner with Background Image */}
      <div className="relative h-80 md:h-96 overflow-hidden rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-6 mb-12 shadow-2xl">
        <img
          src="/images/plant2.jpg"
          alt="Learning Hub"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-900/85 via-forest-800/75 to-forest-700/60" />
        
        <div className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-16 text-white">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Learning Hub</h1>
            <p className="text-lg text-white/90 mb-6">
              Master the science of medicinal plants with videos, quizzes, and comprehensive guides
            </p>
            <div className="flex gap-3 flex-wrap">
              <span className="px-4 py-2 bg-green-600/80 rounded-full text-sm font-semibold">
                Expert Content
              </span>
              <span className="px-4 py-2 bg-forest-700/80 rounded-full text-sm font-semibold">
                Interactive Learning
              </span>
              <span className="px-4 py-2 bg-emerald-600/80 rounded-full text-sm font-semibold">
                Track Progress
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <section className="section-shell py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main Content - 2/3 width */}
          <div className="space-y-12 lg:col-span-2">
            {/* Progress Section */}
            <div>
              <SectionHeading
                eyebrow="Your Journey"
                title="Learning Progress"
                copy="Monitor your advancement across all learning modules"
              />
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-forest-200 border-t-forest-600"></div>
                </div>
              ) : (
                <ProgressDisplay />
              )}
            </div>

            {/* Recent Activity Section */}
            <div>
              <SectionHeading
                eyebrow="Activity Log"
                title="Recent Learning Activity"
                copy="Your most recent interactions with learning materials"
              />
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-forest-200 border-t-forest-600"></div>
                </div>
              ) : (
                <RecentActivityFeed />
              )}
            </div>
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="space-y-8">
            {/* Learning Tips Card */}
            <div className="rounded-2xl border border-forest-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4 flex items-center gap-2">
                <span className="text-2xl">💡</span>
                <h3 className="font-bold text-forest-900">Learning Tips</h3>
              </div>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex gap-2">
                  <span className="text-clay-600">•</span>
                  <span>Take quizzes to reinforce your understanding</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-clay-600">•</span>
                  <span>Watch videos to see real applications</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-clay-600">•</span>
                  <span>Explore the encyclopedia for deep dives</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-clay-600">•</span>
                  <span>Design and plan your herbal garden</span>
                </li>
              </ul>
            </div>

            {/* Achievements Card */}
            <div className="rounded-2xl border border-forest-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4 flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                <h3 className="font-bold text-forest-900">Achievements</h3>
              </div>
              <div className="space-y-3">
                {progress?.quizzesCompleted?.length > 0 && (
                  <div className="flex items-start gap-2 rounded-lg bg-blue-50 p-3">
                    <span className="text-lg">🧠</span>
                    <div>
                      <p className="font-medium text-blue-900">Quiz Master</p>
                      <p className="text-xs text-blue-700">Completed {progress.quizzesCompleted.length} quiz(zes)</p>
                    </div>
                  </div>
                )}
                {progress?.videosWatched?.length > 0 && (
                  <div className="flex items-start gap-2 rounded-lg bg-purple-50 p-3">
                    <span className="text-lg">📹</span>
                    <div>
                      <p className="font-medium text-purple-900">Video Learner</p>
                      <p className="text-xs text-purple-700">Watched {progress.videosWatched.length} video(s)</p>
                    </div>
                  </div>
                )}
                {progress?.encyclopediaEntriesViewed?.length > 0 && (
                  <div className="flex items-start gap-2 rounded-lg bg-green-50 p-3">
                    <div>
                      <p className="font-medium text-green-900">Knowledge Seeker</p>
                      <p className="text-xs text-green-700">Viewed {progress.encyclopediaEntriesViewed.length} article(s)</p>
                    </div>
                  </div>
                )}
                {!progress?.quizzesCompleted?.length &&
                  !progress?.videosWatched?.length &&
                  !progress?.encyclopediaEntriesViewed?.length && (
                    <p className="text-sm text-gray-500">Start learning to unlock achievements!</p>
                  )}
              </div>
            </div>

            {/* Quick Links Card */}
            <div className="rounded-2xl border border-forest-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4 flex items-center gap-2">
                <h3 className="font-bold text-forest-900">Learning Modules</h3>
              </div>
              <nav className="space-y-2">
                <a
                  href="/learning/encyclopedia"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-forest-600 hover:bg-forest-50 hover:text-forest-900 transition-colors"
                >
                  <span>Encyclopedia</span>
                </a>
                <a
                  href="/learning/videos"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-forest-600 hover:bg-forest-50 hover:text-forest-900 transition-colors"
                >
                  <span>Videos</span>
                </a>
                <a
                  href="/learning/quizzes"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-forest-600 hover:bg-forest-50 hover:text-forest-900 transition-colors"
                >
                  <span>Quizzes</span>
                </a>
                <a
                  href="/my-garden"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-forest-600 hover:bg-forest-50 hover:text-forest-900 transition-colors"
                >
                  <span>My Garden</span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
