import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { favoriteAPI } from "../lib/api";

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

  // Load favorites from backend when user logs in
  useEffect(() => {
    if (isLoggedIn) {
      loadFavoritesFromBackend();
    } else {
      setFavorites([]);
    }
  }, [isLoggedIn]);

  const loadFavoritesFromBackend = async () => {
    try {
      setIsLoading(true);
      const response = await favoriteAPI.getUserFavorites();
      if (response && response.favorites) {
        setFavorites(response.favorites);
      }
    } catch (error) {
      console.error("Failed to load favorites:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addFavorite = async (plant) => {
    if (!isLoggedIn) {
      console.warn("User must be logged in to add favorites");
      return false;
    }

    try {
      const plantId = plant._id || plant.id;
      await favoriteAPI.addFavorite(plantId);
      
      // Update local state
      setFavorites((prev) => {
        const exists = prev.some((fav) => fav && (fav._id === plantId || fav.id === plantId));
        if (exists) return prev;
        return [...prev, plant];
      });
      return true;
    } catch (error) {
      console.error("Failed to add favorite:", error);
      return false;
    }
  };

  const removeFavorite = async (plantId) => {
    if (!isLoggedIn) {
      console.warn("User must be logged in to remove favorites");
      return false;
    }

    try {
      await favoriteAPI.removeFavorite(plantId);
      
      // Update local state
      setFavorites((prev) => prev.filter((fav) => fav && fav._id !== plantId && fav.id !== plantId));
      return true;
    } catch (error) {
      console.error("Failed to remove favorite:", error);
      return false;
    }
  };

  const isFavorite = (plantId) => {
    if (!Array.isArray(favorites)) return false;
    return favorites.some((fav) => fav && (fav._id === plantId || fav.id === plantId));
  };

  const clearFavorites = async () => {
    if (!isLoggedIn) return false;
    
    try {
      // Remove all favorites
      for (const fav of favorites) {
        if (fav) {
          const plantId = fav._id || fav.id;
          await favoriteAPI.removeFavorite(plantId);
        }
      }
      setFavorites([]);
      return true;
    } catch (error) {
      console.error("Failed to clear favorites:", error);
      return false;
    }
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    clearFavorites,
    count: favorites.length,
    isLoading,
    isLoggedIn,
  };
}
