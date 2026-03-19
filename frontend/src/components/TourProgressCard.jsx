import React, { useState, useEffect } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { CheckCircle, Circle } from 'lucide-react';

/**
 * TourProgressCard - Displays the user's progress in a specific tour
 * @param {string} tourId - The tour ID
 * @param {string} tourSlug - The tour slug
 * @param {string} tourTitle - The tour title
 * @param {number} totalPlants - Total plants in the tour
 */
export default function TourProgressCard({ tourId, tourSlug, tourTitle, totalPlants = 0 }) {
  const { progress, statistics, getTourProgress, startTour, updateTourProgress } = useProgress();
  const [isLoading, setIsLoading] = useState(false);
  const [tourProgress, setTourProgress] = useState(0);

  useEffect(() => {
    if (tourId && progress?.toursStarted) {
      const tour = progress.toursStarted.find(t => t.tourId === tourId);
      setTourProgress(tour?.progress || 0);
    }
  }, [progress, tourId]);

  const handleStartTour = async () => {
    setIsLoading(true);
    try {
      await startTour(tourId, tourSlug, tourTitle);
      setTourProgress(0);
    } catch (error) {
      console.error('Error starting tour:', error);
      alert('Failed to start tour. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProgress = async (newProgress) => {
    setIsLoading(true);
    try {
      await updateTourProgress(tourId, newProgress);
      setTourProgress(newProgress);
    } catch (error) {
      console.error('Error updating tour progress:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isTourStarted = tourProgress > 0 || (progress?.toursStarted?.some(t => t.tourId === tourId));
  const progressPercentage = Math.round(tourProgress);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-forest-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-forest-900 mb-1">{tourTitle}</h3>
          <p className="text-sm text-forest-600">
            {isTourStarted ? `Progress: ${progressPercentage}% complete` : 'Not started yet'}
          </p>
        </div>
        {isTourStarted && progressPercentage === 100 && (
          <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full border border-green-200">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-600">Completed</span>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-forest-600 font-medium">Overall Progress</span>
          <span className="text-sm font-bold text-forest-900">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-forest-100 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Quick Progress Controls */}
      {isTourStarted && progressPercentage < 100 && (
        <div className="space-y-2 mb-4">
          <div className="grid grid-cols-4 gap-2">
            {[25, 50, 75, 100].map(percent => (
              <button
                key={percent}
                onClick={() => handleUpdateProgress(percent)}
                disabled={isLoading}
                className={`py-2 px-3 rounded text-sm font-medium transition-colors ${
                  progressPercentage >= percent
                    ? 'bg-green-100 text-green-700 border border-green-300'
                    : 'bg-forest-50 text-forest-600 border border-forest-200 hover:bg-forest-100'
                } disabled:opacity-50`}
              >
                {percent}%
              </button>
            ))}
          </div>
          <p className="text-xs text-forest-500">Quick update progress</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        {!isTourStarted ? (
          <button
            onClick={handleStartTour}
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50"
          >
            {isLoading ? 'Starting...' : 'Start Tour'}
          </button>
        ) : progressPercentage < 100 ? (
          <button
            onClick={() => handleUpdateProgress(100)}
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50"
          >
            {isLoading ? 'Completing...' : 'Mark as Complete'}
          </button>
        ) : null}

        <button
          onClick={() => setTourProgress(0)}
          className="px-4 py-2 border border-forest-300 text-forest-700 rounded-lg font-medium hover:bg-forest-50 transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Stats */}
      {totalPlants > 0 && (
        <div className="mt-4 pt-4 border-t border-forest-100">
          <p className="text-sm text-forest-600">
            <span className="font-medium">{Math.round((progressPercentage / 100) * totalPlants)}</span> of{' '}
            <span className="font-medium">{totalPlants}</span> plants explored (estimated)
          </p>
        </div>
      )}
    </div>
  );
}
