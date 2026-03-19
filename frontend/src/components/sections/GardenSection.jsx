import { useRef, useState, useEffect } from "react";
import SectionHeading from "../ui/SectionHeading";
import PlantCard from "../ui/PlantCard";
import SelectFilter from "../ui/SelectFilter";
import SkeletonLoader from "../ui/SkeletonLoader";
import { plantAPI } from "../../lib/api";

export default function GardenSection() {
  const [plants, setPlants] = useState([]);
  const [displayPlants, setDisplayPlants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [focus, setFocus] = useState("");
  const [region, setRegion] = useState("");
  const [type, setType] = useState("");
  const sliderRef = useRef(null);

  // Fetch plants from backend
  useEffect(() => {
    loadPlants();
  }, []);

  const loadPlants = async () => {
    try {
      setIsLoading(true);
      const response = await plantAPI.getAllPlants();
      if (response && response.plants) {
        setPlants(response.plants);
        // Show first 6 plants in featured section
        setDisplayPlants(response.plants.slice(0, 6));
      }
    } catch (err) {
      setError("Failed to load plants");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Get unique options from plants
  const focusOptions = [...new Set(plants.map((plant) => plant.ayushSystem?.[0] || "Unknown"))].filter(Boolean);
  const regionOptions = [...new Set(plants.map((plant) => plant.region || "Unknown"))].filter(Boolean);
  const typeOptions = [...new Set(plants.map((plant) => plant.plantType || "Unknown"))].filter(Boolean);

  // Filter plants
  const filteredPlants = plants.filter((plant) => {
    const normalizedQuery = query.trim().toLowerCase();
    const matchesQuery =
      normalizedQuery.length === 0 ||
      plant.name.toLowerCase().includes(normalizedQuery) ||
      plant.scientificName?.toLowerCase().includes(normalizedQuery);
    const matchesFocus = !focus || plant.ayushSystem?.includes(focus);
    const matchesRegion = !region || plant.region === region;
    const matchesType = !type || plant.plantType === type;
    return matchesQuery && matchesFocus && matchesRegion && matchesType;
  });

  if (isLoading) {
    return (
      <section className="section-shell py-20" id="garden">
        <SectionHeading
          eyebrow="Plant Garden"
          title="Explore Our Medicinal Plants"
          copy="Browse and filter our collection of healing herbs."
        />
        <div className="mt-8 space-y-4">
          <SkeletonLoader variant="gallery" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section-shell py-20" id="garden">
        <p className="text-center text-red-600">{error}</p>
      </section>
    );
  }

  return (
    <section className="section-shell py-20" id="garden">
      {/* Filter Section */}
      <SectionHeading
        eyebrow="Virtual Garden"
        title="Discover more medicinal plants"
        copy="Explore our comprehensive collection of healing herbs from around the world. Filter by therapeutic benefits, plant origin, or type to find the perfect remedy for your wellness needs."
      />

      <div className="glass-panel p-6 sm:p-8">
        <div className="grid gap-4 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-forest-700">Search by plant name</span>
            <input
              className="rounded-2xl border border-forest-100 bg-white px-4 py-3 outline-none transition focus:border-forest-400"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search Echinacea, Ginger, Aloe Vera..."
              type="text"
              value={query}
            />
          </label>
          <SelectFilter label="Focus" onChange={setFocus} options={focusOptions} value={focus} />
          <SelectFilter label="Region" onChange={setRegion} options={regionOptions} value={region} />
          <SelectFilter label="Type" onChange={setType} options={typeOptions} value={type} />
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <p className="text-sm text-forest-600">
            Showing <span className="font-semibold text-forest-900">{filteredPlants.length}</span> matching plant profiles.
          </p>
          <div className="flex gap-3">
            <button
              className="rounded-full border border-forest-200 px-4 py-2 text-sm font-semibold text-forest-800 transition hover:border-forest-500"
              onClick={() => sliderRef.current?.scrollBy({ left: -340, behavior: "smooth" })}
              type="button"
            >
              Prev
            </button>
            <button
              className="rounded-full border border-forest-200 px-4 py-2 text-sm font-semibold text-forest-800 transition hover:border-forest-500"
              onClick={() => sliderRef.current?.scrollBy({ left: 340, behavior: "smooth" })}
              type="button"
            >
              Next
            </button>
          </div>
        </div>

        {filteredPlants.length ? (
          <div className="mt-8 flex gap-5 overflow-x-auto pb-4" ref={sliderRef}>
            {filteredPlants.map((plant) => (
              <PlantCard key={plant._id || plant.id} plant={plant} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-[28px] border border-dashed border-forest-200 bg-forest-50 px-6 py-12 text-center text-forest-700">
            No plants match the current search filters.
          </div>
        )}
      </div>
    </section>
  );
}
