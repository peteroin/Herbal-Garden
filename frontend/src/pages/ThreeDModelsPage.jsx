import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SectionHeading from "../components/ui/SectionHeading";
import SkeletonLoader from "../components/ui/SkeletonLoader";
import FavoriteButton from "../components/FavoriteButton";
import { models3dAPI } from "../lib/api";

export default function ThreeDModelsPage() {
  const [models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        setIsLoading(true);
        const response = await models3dAPI.getAll();
        setModels(response.data || []);
      } catch (err) {
        console.error('Error fetching 3D models:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchModels();
  }, []);

  return (
    <>
      {/* Hero Banner with Background Image */}
      <div className="relative h-80 md:h-96 overflow-hidden rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-6 mb-12 shadow-2xl">
        <img
          src="/images/plant1.jpg"
          alt="3D Models"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-900/85 via-emerald-900/75 to-forest-800/60" />
        
        <div className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-16 text-white">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">3D Plant Models</h1>
            <p className="text-lg text-white/90 mb-6">
              Explore detailed 3D representations of medicinal plants. Rotate, zoom, and inspect every detail
            </p>
            <div className="flex gap-3 flex-wrap">
              <span className="px-4 py-2 bg-emerald-600/80 rounded-full text-sm font-semibold">
                Interactive Viewing
              </span>
              <span className="px-4 py-2 bg-forest-700/80 rounded-full text-sm font-semibold">
                High Detail
              </span>
            </div>
          </div>
        </div>
      </div>

      <section className="section-shell py-20">
        <SectionHeading
          eyebrow="3D Models"
          title="Inspect living forms in 3D"
          copy={isLoading ? "Loading 3D models..." : error ? `Error loading models: ${error}` : "Explore and interact with high-detail 3D models of medicinal plants."}
        />

        {/* Loading State */}
        {isLoading && (
          <div className="mt-8 space-y-4 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <SkeletonLoader variant="card" count={4} />
          </div>
        )}

        {/* Models Grid with Enhanced Cards */}
        {!isLoading && !error && (
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {models.map((model, idx) => (
              <article className="group glass-panel overflow-hidden hover:shadow-lg transition-all duration-300" key={model.slug || model.title}>
                {/* Image Placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-green-100 to-emerald-200 overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={`/images/plant${(idx % 2) + 1}.jpg`}
                    alt={model.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-900/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-clay-700">3D Plant Model</p>
                    <FavoriteButton
                      resourceId={model._id || model.id}
                      resourceType="model3d"
                      resourceName={model.title}
                      className="flex-shrink-0"
                    />
                  </div>
                  <h2 className="mt-4 text-xl font-semibold text-forest-900 group-hover:text-forest-950 transition">{model.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-forest-700 line-clamp-2">{model.description}</p>
                  <div className="mt-4 pt-4 border-t border-forest-100 flex items-center justify-between">
                    <span className="text-xs text-forest-600 font-medium">Interactive View</span>
                    {model.modelPath ? (
                      <Link className="text-sm font-semibold text-forest-800 hover:text-clay-700 hover:underline transition" to={`/three-d-models/${model.slug}`}>
                        Open →
                      </Link>
                    ) : (
                      <p className="text-xs font-semibold text-forest-400">Coming soon</p>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
