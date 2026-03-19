import { useState, useEffect, useContext } from "react";
import SectionHeading from "../components/ui/SectionHeading";
import PlantCard from "../components/ui/PlantCard";
import SkeletonLoader from "../components/ui/SkeletonLoader";
import SelectFilter from "../components/ui/SelectFilter";
import { plantAPI } from "../lib/api";
import { AuthContext } from "../contexts/AuthContext";

export default function BrowsePlantsPage() {
  const { isLoggedIn } = useContext(AuthContext);
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAyushSystem, setSelectedAyushSystem] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [ayushSystems, setAyushSystems] = useState([]);

  useEffect(() => {
    fetchPlants();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [plants, searchTerm, selectedAyushSystem, sortBy]);

  const fetchPlants = async () => {
    try {
      setIsLoading(true);
      const response = await plantAPI.getAllPlants();
      const plantsData = response.plants || response.data || [];
      setPlants(plantsData);

      // Extract unique AYUSH systems
      const systems = new Set();
      plantsData.forEach((plant) => {
        if (plant.ayushSystem && Array.isArray(plant.ayushSystem)) {
          plant.ayushSystem.forEach((sys) => systems.add(sys));
        }
      });
      setAyushSystems(Array.from(systems).sort());

      setError("");
    } catch (err) {
      setError("Failed to load plants. Please try again.");
      console.error("Error fetching plants:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...plants];

    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (plant) =>
          plant.name?.toLowerCase().includes(term) ||
          plant.scientificName?.toLowerCase().includes(term) ||
          plant.description?.toLowerCase().includes(term)
      );
    }

    // AYUSH system filter
    if (selectedAyushSystem !== "all") {
      filtered = filtered.filter((plant) =>
        plant.ayushSystem?.includes(selectedAyushSystem)
      );
    }

    // Sorting
    switch (sortBy) {
      case "name":
        filtered.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        break;
      case "scientific":
        filtered.sort((a, b) =>
          (a.scientificName || "").localeCompare(b.scientificName || "")
        );
        break;
      case "recent":
        filtered.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      default:
        break;
    }

    setFilteredPlants(filtered);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedAyushSystem("all");
    setSortBy("name");
  };

  return (
    <section className="section-shell py-20">
      {/* Hero Banner with Image */}
      <div className="relative mb-16 h-96 rounded-3xl overflow-hidden shadow-2xl">
        <img
          src="/images/plant1.jpg"
          alt="Medicinal Plants"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-900/80 via-forest-900/60 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-16 text-white">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Medicinal Plants</h1>
            <p className="text-xl text-white/90 mb-6">
              Explore {filteredPlants.length} healing herbs from ancient and modern traditions
            </p>
            <div className="flex gap-3">
              <span className="px-4 py-2 bg-green-600 rounded-full text-sm font-semibold">
                Verified & Researched
              </span>
              <span className="px-4 py-2 bg-forest-700 rounded-full text-sm font-semibold">
                Detailed Info
              </span>
            </div>
          </div>
        </div>
      </div>

      <SectionHeading
        eyebrow="Plant Collection"
        title="Browse Medicinal Plants"
        copy="Explore our comprehensive collection of healing herbs and plants from various traditions."
      />

      {/* Filters */}
      <div className="mt-12 glass-panel p-6 mb-8">
        <div className="grid gap-4 md:grid-cols-4">
          <div>
            <label className="block text-sm font-semibold text-forest-700 mb-2">
              Search Plants
            </label>
            <input
              type="text"
              placeholder="Name, scientific name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-forest-100 bg-white px-4 py-2 text-sm outline-none transition focus:border-forest-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-forest-700 mb-2">
              AYUSH System
            </label>
            {isLoading ? (
              <SkeletonLoader variant="filter" />
            ) : (
              <select
                value={selectedAyushSystem}
                onChange={(e) => setSelectedAyushSystem(e.target.value)}
                className="w-full rounded-xl border border-forest-100 bg-white px-4 py-2 text-sm outline-none transition focus:border-forest-400"
              >
                <option value="all">All Systems</option>
                {ayushSystems.map((system) => (
                  <option key={system} value={system}>
                    {system}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-forest-700 mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full rounded-xl border border-forest-100 bg-white px-4 py-2 text-sm outline-none transition focus:border-forest-400"
            >
              <option value="name">Name (A-Z)</option>
              <option value="scientific">Scientific Name</option>
              <option value="recent">Most Recent</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={resetFilters}
              className="w-full rounded-xl border border-forest-300 bg-white px-4 py-2 text-sm font-semibold text-forest-700 hover:bg-forest-50 transition"
            >
              Reset Filters
            </button>
          </div>
        </div>

        <div className="mt-3 text-sm text-forest-600">
          {isLoading ? (
            <SkeletonLoader variant="text" className="w-32 inline-block" />
          ) : (
            <>Found <span className="font-semibold">{filteredPlants.length}</span> plant
            {filteredPlants.length !== 1 ? "s" : ""}</>
          )}
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="rounded-[28px] border border-dashed border-red-200 bg-red-50 px-6 py-12 text-center text-red-700">
          <p>{error}</p>
          <button
            onClick={fetchPlants}
            className="mt-4 inline-flex rounded-full bg-forest-600 px-6 py-2 font-semibold text-white hover:bg-forest-700 transition"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <SkeletonLoader variant="gallery" count={6} />
        </div>
      )}

      {/* Plants Grid */}
      {!isLoading && !error && filteredPlants.length > 0 ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPlants.map((plant) => (
            <PlantCard 
              key={plant._id || plant.id} 
              plant={plant} 
            />
          ))}
        </div>
      ) : !isLoading && !error ? (
        <div className="mt-8 rounded-[28px] border border-dashed border-forest-200 bg-forest-50 px-6 py-12 text-center text-forest-700">
          <p>
            No plants match your search criteria. Try adjusting your filters.
          </p>
          <button
            onClick={resetFilters}
            className="mt-4 inline-flex rounded-full bg-forest-600 px-6 py-2 font-semibold text-white hover:bg-forest-700 transition"
          >
            Reset All Filters
          </button>
        </div>
      ) : null}

      {/* Info Section */}
      <div className="mt-16 rounded-[28px] bg-forest-50 p-8 text-center">
        <h3 className="text-2xl font-semibold text-forest-900 mb-4">
          Save Your Favorites
        </h3>
        <p className="text-forest-700 mb-6 max-w-2xl mx-auto">
          {isLoggedIn
            ? "Click the heart icon on any plant to save it to your favorites for quick access."
            : "Sign in to save your favorite plants and create a personalized wellness collection."}
        </p>
        {!isLoggedIn && (
          <a
            href="/login"
            className="inline-flex rounded-full bg-forest-600 px-6 py-2 font-semibold text-white hover:bg-forest-700 transition"
          >
            Sign In
          </a>
        )}
      </div>
    </section>
  );
}
