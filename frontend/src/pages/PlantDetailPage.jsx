import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import SectionHeading from "../components/ui/SectionHeading";
import SkeletonLoader from "../components/ui/SkeletonLoader";
import InfoItem from "../components/ui/InfoItem";
import Pill from "../components/ui/Pill";
import NotFoundPage from "./NotFoundPage";
import { Link } from "react-router-dom";
import { plantAPI } from "../lib/api";

export default function PlantDetailPage() {
  const { plantId } = useParams();
  const [plant, setPlant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadPlant();
  }, [plantId]);

  const loadPlant = async () => {
    try {
      setIsLoading(true);
      const response = await plantAPI.getPlantById(plantId);
      if (response) {
        setPlant(response);
      } else {
        setError("Plant not found");
      }
    } catch (err) {
      setError("Failed to load plant details");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section className="section-shell py-20">
        <SkeletonLoader variant="hero" />
      </section>
    );
  }

  if (error || !plant) {
    return <NotFoundPage message="That plant profile could not be found." />;
  }

  return (
    <section className="section-shell py-20">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <img 
          alt={plant.name} 
          className="w-full rounded-[32px] object-cover shadow-soft" 
          src={plant.image || "https://via.placeholder.com/400?text=Plant"} 
        />
        <div className="glass-panel p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-clay-700">Plant Detail</p>
          <h1 className="mt-4 font-display text-5xl font-semibold text-forest-900">{plant.name}</h1>
          <p className="mt-2 text-lg italic text-forest-500">{plant.scientificName}</p>
          <p className="mt-6 text-base leading-7 text-forest-700">{plant.description}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <InfoItem label="Region" value={plant.region} />
            <InfoItem label="Type" value={plant.plantType} />
            <InfoItem label="AYUSH System" value={plant.ayushSystem?.[0] || "N/A"} />
            <InfoItem label="Season" value={plant.season || "Year-round"} />
          </div>
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-clay-700">Uses</p>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-forest-700">
              {plant.uses && plant.uses.length > 0 ? (
                plant.uses.map((useItem, idx) => (
                  <li key={idx}>
                    • {typeof useItem === 'string' ? useItem : useItem.use}
                  </li>
                ))
              ) : (
                <li>No uses documented</li>
              )}
            </ul>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {plant.tags && plant.tags.length > 0 ? (
              plant.tags.map((tag) => (
                <Pill key={tag}>{tag}</Pill>
              ))
            ) : (
              <p className="text-sm text-forest-600">No tags available</p>
            )}
          </div>
          {plant.cautions && plant.cautions.length > 0 && (
            <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-yellow-700">Cautions</p>
              <ul className="mt-2 space-y-1 text-sm text-yellow-800">
                {plant.cautions.map((caution, idx) => (
                  <li key={idx}>• {caution}</li>
                ))}
              </ul>
            </div>
          )}
          <Link className="mt-8 inline-flex text-sm font-semibold text-forest-800 hover:text-clay-700" to="/#garden">
            Back to Garden
          </Link>
        </div>
      </div>
    </section>
  );
}
