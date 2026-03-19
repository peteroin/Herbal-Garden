import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { progressAPI } from '../lib/api';
import { AuthContext } from './AuthContext';

const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const { isLoggedIn } = useContext(AuthContext);

  // Fetch user progress
  const fetchProgress = useCallback(async () => {
    if (!isLoggedIn) return;
    try {
      setIsLoading(true);
      const response = await progressAPI.getUserProgress();
      setProgress(response.data);
      setLastUpdate(new Date());
    } catch (err) {
      console.error('Error fetching progress:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [isLoggedIn]);

  // Fetch statistics
  const fetchStatistics = useCallback(async () => {
    if (!isLoggedIn) return;
    try {
      const response = await progressAPI.getStatistics();
      setStatistics(response.data);
    } catch (err) {
      console.error('Error fetching statistics:', err);
    }
  }, [isLoggedIn]);

  // Initial load
  useEffect(() => {
    if (!isLoggedIn) {
      setProgress(null);
      setStatistics(null);
      setIsLoading(false);
      return;
    }

    fetchProgress();
    fetchStatistics();

    // Refetch progress and statistics every 30 seconds for real-time updates
    const interval = setInterval(() => {
      fetchProgress();
      fetchStatistics();
    }, 30000);

    return () => clearInterval(interval);
  }, [isLoggedIn, fetchProgress, fetchStatistics]);

  // Start tour
  const startTour = useCallback(async (tourId, tourSlug, tourTitle) => {
    try {
      const response = await progressAPI.startTour(tourId, tourSlug, tourTitle);
      setProgress(response.data);
      return response.data;
    } catch (err) {
      console.error('Error starting tour:', err);
      throw err;
    }
  }, []);

  // Update tour progress
  const updateTourProgress = useCallback(async (tourId, progressValue, isCompleted) => {
    try {
      const response = await progressAPI.updateTourProgress(tourId, progressValue, isCompleted);
      setProgress(response.data);
      await fetchStatistics();
      return response.data;
    } catch (err) {
      console.error('Error updating tour progress:', err);
      throw err;
    }
  }, [fetchStatistics]);

  // Complete quiz
  const completeQuiz = useCallback(async (quizData) => {
    try {
      const response = await progressAPI.completeQuiz(quizData);
      setProgress(response.data);
      await fetchStatistics();
      return response.data;
    } catch (err) {
      console.error('Error completing quiz:', err);
      throw err;
    }
  }, [fetchStatistics]);

  // Mark video as watched
  const markVideoWatched = useCallback(async (videoId, videoSlug, videoTitle, percentWatched, duration) => {
    try {
      const response = await progressAPI.markVideoWatched(videoId, videoSlug, videoTitle, percentWatched, duration);
      setProgress(response.data);
      await fetchStatistics();
      return response.data;
    } catch (err) {
      console.error('Error marking video watched:', err);
      throw err;
    }
  }, [fetchStatistics]);

  // Record encyclopedia view
  const recordEncyclopediaView = useCallback(async (entryId, entrySlug, entryTitle) => {
    try {
      const response = await progressAPI.recordEncyclopediaView(entryId, entrySlug, entryTitle);
      setProgress(response.data);
      await fetchStatistics();
      return response.data;
    } catch (err) {
      console.error('Error recording encyclopedia view:', err);
      throw err;
    }
  }, [fetchStatistics]);

  // Check if quiz is completed
  const isQuizCompleted = useCallback((quizId) => {
    if (!progress) return false;
    return progress.quizzesCompleted.some(q => q.quizId === quizId);
  }, [progress]);

  // Check if tour is started
  const isTourStarted = useCallback((tourId) => {
    if (!progress) return false;
    return progress.toursStarted.some(t => t.tourId === tourId);
  }, [progress]);

  // Get tour progress
  const getTourProgress = useCallback((tourId) => {
    if (!progress) return null;
    return progress.toursStarted.find(t => t.tourId === tourId);
  }, [progress]);

  // Get quiz result
  const getQuizResult = useCallback((quizId) => {
    if (!progress) return null;
    return progress.quizzesCompleted.find(q => q.quizId === quizId);
  }, [progress]);

  // Refresh progress manually
  const refreshProgress = useCallback(() => {
    fetchProgress();
    fetchStatistics();
  }, [fetchProgress, fetchStatistics]);

  const value = {
    progress,
    statistics,
    isLoading,
    error,
    lastUpdate,
    startTour,
    updateTourProgress,
    completeQuiz,
    markVideoWatched,
    recordEncyclopediaView,
    isQuizCompleted,
    isTourStarted,
    getTourProgress,
    getQuizResult,
    refreshProgress
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return context;
}
