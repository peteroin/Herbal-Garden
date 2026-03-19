import { Link } from "react-router-dom";
import { useContext } from "react";
import Pill from "./Pill";
import { useFavorites } from "../../hooks/useFavorites";
import { NotificationContext } from "../../contexts/NotificationContext";

export default function PlantCard({ plant }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { success } = useContext(NotificationContext) || { success: () => {} };
  const plantId = plant._id || plant.id;
  const favorite = isFavorite(plantId);

  const handleFavoriteToggle = () => {
    if (favorite) {
      removeFavorite(plantId);
      success(`Removed ${plant.name} from favorites`);
    } else {
      addFavorite(plant);
      success(`Added ${plant.name} to favorites ❤️`);
    }
  };

  const primaryFocus = plant.ayushSystem?.[0] || plant.focus || "Plant";

  return (
    <article className="glass-panel flex min-w-[280px] max-w-[320px] flex-col overflow-hidden">
      <div className="relative">
        <img 
          alt={plant.name} 
          className="h-52 w-full object-cover" 
          src={plant.image || "https://via.placeholder.com/400?text=Plant"}
        />
        <button
          onClick={handleFavoriteToggle}
          className="absolute right-3 top-3 rounded-full bg-white p-2 shadow-md hover:bg-forest-50 transition"
          title={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 transition ${favorite ? "fill-red-500 stroke-red-500" : "stroke-forest-600"}`}
            fill={favorite ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-1.085-.45-2.084-1.172-2.804a2.739 2.739 0 00-2.025-.827c-.967 0-1.88.311-2.633.905a2.773 2.773 0 00-.78-.06 2.748 2.748 0 00-2.72 2.05 2.75 2.75 0 00-2.72-2.05 2.749 2.749 0 00-2.016.741c-.822.72-1.35 1.72-1.35 2.807M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM7 20H4a1 1 0 01-1-1v-2.755a1 1 0 011-1h3.699a.75.75 0 01.75.75v4.005a.75.75 0 01-.75.75h-.001z"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-clay-700">{primaryFocus}</p>
          <h3 className="mt-2 text-2xl font-semibold text-forest-900">{plant.name}</h3>
          <p className="mt-1 text-sm italic text-forest-500">{plant.scientificName || "Scientific name"}</p>
        </div>
        <p className="text-sm leading-6 text-forest-700">{plant.description}</p>
        <div className="flex flex-wrap gap-2">
          {plant.tags && plant.tags.length > 0 ? (
            plant.tags.map((tag) => (
              <Pill key={tag}>{tag}</Pill>
            ))
          ) : (
            <Pill>No tags</Pill>
          )}
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-xs uppercase tracking-[0.25em] text-forest-500">{plant.region || "N/A"}</span>
          <Link className="text-sm font-semibold text-forest-800 hover:text-clay-700" to={`/plants/${plantId}`}>
            Learn More
          </Link>
        </div>
      </div>
    </article>
  );
}
