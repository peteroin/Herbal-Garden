import { useState, useContext, useEffect } from "react";
import { Heart } from "lucide-react";
import { AuthContext } from "../contexts/AuthContext";
import { favoriteAPI } from "../lib/api";

export default function FavoriteButton({
  resourceId,
  resourceType = "plant",
  resourceName = "",
  className = "",
  onToggle = () => {},
}) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

  // Check if item is favorited on mount
  useEffect(() => {
    if (isLoggedIn && resourceId) {
      checkIfFavorited();
    }
  }, [isLoggedIn, resourceId, resourceType]);

  const checkIfFavorited = async () => {
    try {
      const response = await favoriteAPI.isFavorite(resourceId, resourceType);
      setIsFavorited(response.isFavorite || false);
    } catch (error) {
      console.error("Error checking favorite status:", error);
    }
  };

  const handleToggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      alert("Please log in to save favorites");
      return;
    }

    setIsLoading(true);
    try {
      if (isFavorited) {
        await favoriteAPI.removeFavorite(resourceId, resourceType);
        setIsFavorited(false);
      } else {
        await favoriteAPI.addFavorite(resourceId, resourceType, resourceName);
        setIsFavorited(true);
      }
      onToggle(!isFavorited);
    } catch (error) {
      console.error("Error toggling favorite:", error);
      alert("Failed to update favorite");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      disabled={isLoading || !isLoggedIn}
      className={`p-2 rounded-full transition-all duration-200 ${
        isFavorited
          ? "bg-red-100 text-red-600 hover:bg-red-200"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      } disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      title={isFavorited ? "Remove from favorites" : "Add to favorites"}
      aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart
        className={`h-5 w-5 ${isFavorited ? "fill-current" : ""}`}
        strokeWidth={isFavorited ? 0 : 2}
      />
    </button>
  );
}
