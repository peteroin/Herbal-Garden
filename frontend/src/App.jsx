import { Route, Routes } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";

// Layout & Shell
import AppShell from "./components/layout/AppShell";
import ScrollManager from "./components/layout/ScrollManager";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Pages
import HomePage from "./pages/HomePage";
import PlantDetailPage from "./pages/PlantDetailPage";
import BrowsePlantsPage from "./pages/BrowsePlantsPage";
import MyGardenPage from "./pages/MyGardenPage";
import VirtualGardenPage from "./pages/VirtualGardenPage";
import GardenPlannerPage from "./pages/GardenPlannerPage";
import PlantCareTrackerPage from "./pages/PlantCareTrackerPage";
import ThreeDModelsPage from "./pages/ThreeDModelsPage";
import ThreeDModelViewerPage from "./pages/ThreeDModelViewerPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import FavoritesPage from "./pages/FavoritesPage";
import UserProfilePage from "./pages/UserProfilePage";
import NotFoundPage from "./pages/NotFoundPage";

// Learning Pages
import LearningHomePage from "./pages/learning/LearningHomePage";
import EncyclopediaPage from "./pages/learning/EncyclopediaPage";
import EncyclopediaDetailPage from "./pages/learning/EncyclopediaDetailPage";
import QuizzesPage from "./pages/learning/QuizzesPage";
import VideosPage from "./pages/learning/VideosPage";
import LearningDashboard from "./pages/LearningDashboard";

/**
 * App - Main application router
 * Coordinates all routes and wraps them with layout shells
 */
export default function App() {
  return (
    <ErrorBoundary>
      <>
        <ScrollManager />
        <AppShell>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
              path="/"
            />
            <Route
              element={
                <ProtectedRoute>
                  <BrowsePlantsPage />
                </ProtectedRoute>
              }
              path="/plants"
            />
            <Route
              element={
                <ProtectedRoute>
                  <PlantDetailPage />
                </ProtectedRoute>
              }
              path="/plants/:plantId"
            />
            <Route
              element={
                <ProtectedRoute>
                  <MyGardenPage />
                </ProtectedRoute>
              }
              path="/my-garden"
            />
            <Route
              element={
                <ProtectedRoute>
                  <VirtualGardenPage />
                </ProtectedRoute>
              }
              path="/virtual-garden"
            />
            <Route
              element={
                <ProtectedRoute>
                  <GardenPlannerPage />
                </ProtectedRoute>
              }
              path="/garden-planner"
            />
            <Route
              element={
                <ProtectedRoute>
                  <PlantCareTrackerPage />
                </ProtectedRoute>
              }
              path="/care-tracker"
            />
            <Route
              element={
                <ProtectedRoute>
                  <LearningHomePage />
                </ProtectedRoute>
              }
              path="/learning"
            />
            <Route
              element={
                <ProtectedRoute>
                  <EncyclopediaPage />
                </ProtectedRoute>
              }
              path="/learning/encyclopedia"
            />
            <Route
              element={
                <ProtectedRoute>
                  <EncyclopediaDetailPage />
                </ProtectedRoute>
              }
              path="/learning/encyclopedia/:slug"
            />
            <Route
              element={
                <ProtectedRoute>
                  <QuizzesPage />
                </ProtectedRoute>
              }
              path="/learning/quizzes"
            />
            <Route
              element={
                <ProtectedRoute>
                  <VideosPage />
                </ProtectedRoute>
              }
              path="/learning/videos"
            />
            <Route
              element={
                <ProtectedRoute>
                  <LearningDashboard />
                </ProtectedRoute>
              }
              path="/dashboard"
            />
            <Route element={<ThreeDModelsPage />} path="/three-d-models" />
            <Route element={<ThreeDModelViewerPage />} path="/three-d-models/:modelSlug" />
            <Route
              element={
                <ProtectedRoute>
                  <FavoritesPage />
                </ProtectedRoute>
              }
              path="/favorites"
            />
            <Route
              element={
                <ProtectedRoute>
                  <UserProfilePage />
                </ProtectedRoute>
              }
              path="/profile"
            />
            <Route element={<LoginPage />} path="/login" />
            <Route element={<SignupPage />} path="/signup" />
            <Route element={<NotFoundPage />} path="*" />
          </Routes>
        </AppShell>
      </>
    </ErrorBoundary>
  );
}
