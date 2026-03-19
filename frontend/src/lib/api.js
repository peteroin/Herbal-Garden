// API utility for making requests to backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = () => {
  const authData = localStorage.getItem('herbalGardenAuth');
  if (authData) {
    try {
      const parsed = JSON.parse(authData);
      return parsed.token;
    } catch (e) {
      return null;
    }
  }
  return null;
};

/**
 * Standardized API error class
 * Provides consistent error handling across the app
 */
class APIError extends Error {
  constructor(message, statusCode, details) {
    super(message);
    this.name = 'APIError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

// Helper function to make API requests
const apiFetch = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add auth token if it exists
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      mode: 'cors',
      credentials: 'include'
    });

    // Handle 401 responses - token expired or invalid
    if (response.status === 401) {
      // Clear auth and redirect to login
      localStorage.removeItem('herbalGardenAuth');
      window.location.href = '/login';
      throw new APIError('Your session has expired. Please log in again.', 401);
    }

    let responseData = null;
    try {
      responseData = await response.json();
    } catch (e) {
      // Response is not JSON
      responseData = { error: response.statusText };
    }

    if (!response.ok) {
      const errorMsg = responseData.error || responseData.message || `HTTP Error: ${response.status}`;
      throw new APIError(errorMsg, response.status, responseData.details);
    }

    return responseData;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    console.error('API Error:', error.message || error);
    throw new APIError(error.message || 'Network error. Please try again.', 0);
  }
};

// Auth APIs
export const authAPI = {
  register: (data) =>
    apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  login: (email, password) =>
    apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  logout: () =>
    apiFetch('/auth/logout', {
      method: 'POST',
    }),
};

// Plant APIs
export const plantAPI = {
  getAllPlants: async () => {
    const response = await apiFetch('/plants');
    // Map response structure to consistent format
    return {
      count: response.count,
      plants: response.plants || [],
      // For compatibility with existing code that expects .data
      data: response.plants?.[0] || null
    };
  },

  getPlantById: (id) => apiFetch(`/plants/${id}`),

  searchPlants: (query = '', filters = {}) => {
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (filters.type) params.append('type', filters.type);
    if (filters.region) params.append('region', filters.region);
    if (filters.ayush) params.append('ayush', filters.ayush);

    const queryString = params.toString();
    return apiFetch(`/plants/search${queryString ? '?' + queryString : ''}`);
  },

  createPlant: (data) =>
    apiFetch('/plants', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updatePlant: (id, data) =>
    apiFetch(`/plants/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deletePlant: (id) =>
    apiFetch(`/plants/${id}`, {
      method: 'DELETE',
    }),
};

// Favorite APIs
export const favoriteAPI = {
  // Add favorite with resource type support
  addFavorite: (resourceId, resourceType = 'plant', resourceName = '') =>
    apiFetch('/favorites', {
      method: 'POST',
      body: JSON.stringify({ resourceId, resourceType, resourceName }),
    }),

  // Remove favorite with resource type support
  removeFavorite: (resourceId, resourceType = 'plant') =>
    apiFetch(`/favorites/${resourceId}?type=${resourceType}`, {
      method: 'DELETE',
    }),

  // Get all user favorites
  getUserFavorites: () => apiFetch('/favorites'),

  // Get favorites by type
  getFavoritesByType: (resourceType) =>
    apiFetch(`/favorites/type/${resourceType}`),

  // Check if resource is favorited
  isFavorite: (resourceId, resourceType = 'plant') =>
    apiFetch(`/favorites/check/${resourceId}?type=${resourceType}`),
};

// User APIs
export const userAPI = {
  getProfile: () => apiFetch('/users/profile'),

  updateProfile: (data) =>
    apiFetch('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  updatePassword: (currentPassword, newPassword, confirmPassword) =>
    apiFetch('/users/password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
    }),

  deleteAccount: () =>
    apiFetch('/users/account', {
      method: 'DELETE',
    }),
};

// Learning Resource APIs
export const learningAPI = {
  getAllLearningResources: async () => {
    const response = await apiFetch('/learning');
    // Map response structure
    return {
      count: response.count,
      data: response.resources || []
    };
  },

  getLearningResourceBySlug: (slug) => apiFetch(`/learning/${slug}`),

  createLearningResource: (data) =>
    apiFetch('/learning', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// Encyclopedia APIs
export const encyclopediaAPI = {
  getAllEntries: async () => {
    const response = await apiFetch('/encyclopedia');
    return {
      count: response.count,
      data: response.entries || []
    };
  },

  getBySlug: (slug) => apiFetch(`/encyclopedia/${slug}`),

  create: (data) =>
    apiFetch('/encyclopedia', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// Quiz APIs
export const quizAPI = {
  getAllQuizzes: async () => {
    const response = await apiFetch('/quizzes');
    return {
      count: response.count,
      data: response.quizzes || []
    };
  },

  getBySlug: (slug) => apiFetch(`/quizzes/${slug}`),

  create: (data) =>
    apiFetch('/quizzes', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// Video APIs
export const videoAPI = {
  getAllVideos: async () => {
    const response = await apiFetch('/videos');
    return {
      count: response.count,
      data: response.videos || []
    };
  },

  getBySlug: (slug) => apiFetch(`/videos/${slug}`),

  create: (data) =>
    apiFetch('/videos', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// 3D Models APIs
export const models3dAPI = {
  getAll: async () => {
    const response = await apiFetch('/models3d');
    return {
      count: response.count,
      data: response.models || []
    };
  },

  getBySlug: (slug) => apiFetch(`/models3d/${slug}`),

  create: (data) =>
    apiFetch('/models3d', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// Progress APIs
export const progressAPI = {
  getUserProgress: () => apiFetch('/progress'),

  getStatistics: () => apiFetch('/progress/statistics'),

  getCompletedQuizzes: () => apiFetch('/progress/quizzes/completed'),

  getStartedTours: () => apiFetch('/progress/tours/started'),

  startTour: (tourId, tourSlug, tourTitle) =>
    apiFetch('/progress/tours/start', {
      method: 'POST',
      body: JSON.stringify({ tourId, tourSlug, tourTitle }),
    }),

  updateTourProgress: (tourId, progress, isCompleted) =>
    apiFetch(`/progress/tours/${tourId}/progress`, {
      method: 'PATCH',
      body: JSON.stringify({ progress, isCompleted }),
    }),

  completeQuiz: ({ quizId, quizSlug, quizTitle, score, totalQuestions, correctAnswers, timeSpentSeconds }) =>
    apiFetch('/progress/quizzes/complete', {
      method: 'POST',
      body: JSON.stringify({
        quizId,
        quizSlug,
        quizTitle,
        score,
        totalQuestions,
        correctAnswers,
        timeSpentSeconds
      }),
    }),

  markVideoWatched: (videoId, videoSlug, videoTitle, percentWatched, duration) =>
    apiFetch('/progress/videos/watched', {
      method: 'POST',
      body: JSON.stringify({
        videoId,
        videoSlug,
        videoTitle,
        percentWatched,
        duration
      }),
    }),

  recordEncyclopediaView: (entryId, entrySlug, entryTitle) =>
    apiFetch('/progress/encyclopedia/viewed', {
      method: 'POST',
      body: JSON.stringify({
        entryId,
        entrySlug,
        entryTitle
      }),
    }),
};

// Virtual Garden APIs
export const gardenAPI = {
  getUserGarden: () => apiFetch('/gardens'),

  createGarden: (data) =>
    apiFetch('/gardens', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  plantInPlot: (plotId, plantId) =>
    apiFetch('/gardens/plant', {
      method: 'POST',
      body: JSON.stringify({ plotId, plantId }),
    }),

  waterPlant: (plotId, waterAmount = 50) =>
    apiFetch('/gardens/water', {
      method: 'PATCH',
      body: JSON.stringify({ plotId, waterAmount }),
    }),

  updatePlantHealth: (plotId) =>
    apiFetch('/gardens/health', {
      method: 'PATCH',
      body: JSON.stringify({ plotId }),
    }),

  harvestPlant: (plotId) =>
    apiFetch('/gardens/harvest', {
      method: 'PATCH',
      body: JSON.stringify({ plotId }),
    }),

  getCareLogs: (plotId) => apiFetch(`/gardens/care-logs/${plotId}`),

  getGardenStats: () => apiFetch('/gardens/stats'),
};

// Garden Planner APIs
export const plannerAPI = {
  createDesign: (data) =>
    apiFetch('/planner', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getUserDesigns: () => apiFetch('/planner'),

  getDesign: (designId) => apiFetch(`/planner/${designId}`),

  updateDesign: (designId, data) =>
    apiFetch(`/planner/${designId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteDesign: (designId) =>
    apiFetch(`/planner/${designId}`, {
      method: 'DELETE',
    }),

  addPlantToDesign: (designId, plantData) =>
    apiFetch(`/planner/${designId}/plants`, {
      method: 'POST',
      body: JSON.stringify(plantData),
    }),

  removePlantFromDesign: (designId, plantIndex) =>
    apiFetch(`/planner/${designId}/plants/${plantIndex}`, {
      method: 'DELETE',
    }),

  getRecommendations: (filters) => {
    const params = new URLSearchParams(filters);
    return apiFetch(`/planner/recommendations/suggestions?${params.toString()}`);
  },

  getPublicDesigns: (page = 1, limit = 12) =>
    apiFetch(`/planner/public?page=${page}&limit=${limit}`),

  likeDesign: (designId) =>
    apiFetch(`/planner/${designId}/like`, {
      method: 'POST',
    }),
};

// Care Tracker APIs
export const careTrackerAPI = {
  logCareActivity: (data) =>
    apiFetch('/care-tracker/activity', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getCareLogs: (filters = {}) => {
    const params = new URLSearchParams(filters);
    return apiFetch(`/care-tracker?${params.toString()}`);
  },

  getCareSchedule: (virtualGardenId) =>
    apiFetch(`/care-tracker/${virtualGardenId}/schedule`),

  getPlantCareHistory: (virtualGardenId, plotId) =>
    apiFetch(`/care-tracker/${virtualGardenId}/${plotId}/history`),

  getCareTips: (plantName) => {
    const params = new URLSearchParams({ plantName });
    return apiFetch(`/care-tracker/tips?${params.toString()}`);
  },

  getCareStatistics: (virtualGardenId) =>
    apiFetch(`/care-tracker/${virtualGardenId}/statistics`),
};

export default {
  authAPI,
  plantAPI,
  favoriteAPI,
  userAPI,
  learningAPI,
  encyclopediaAPI,
  quizAPI,
  videoAPI,
  models3dAPI,
  progressAPI,
  gardenAPI,
  plannerAPI,
  careTrackerAPI,
  apiFetch,
  getAuthToken,
};
