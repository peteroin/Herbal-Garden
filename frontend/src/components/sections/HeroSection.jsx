import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SectionHeading from "../ui/SectionHeading";
import { plantAPI, learningAPI } from "../../lib/api";
import { primaryButtonClass, secondaryButtonClass } from "../../constants/buttonClasses";

export default function HeroSection() {
  const [counts, setCounts] = useState({ plants: 0, resources: 3 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [plantsRes, resourcesRes] = await Promise.all([
          plantAPI.getAllPlants(),
          learningAPI.getAllLearningResources()
        ]);
        
        setCounts({
          plants: plantsRes.count || 0,
          resources: resourcesRes.count || 0
        });
      } catch (error) {
        console.error('Error fetching counts:', error);
        // Fallback to defaults
        setCounts({ plants: 18, resources: 3 });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCounts();
  }, []);

  return (
    <section className="section-shell pt-8 sm:pt-12" id="home">
      <div className="relative overflow-hidden rounded-[36px] border border-white/50 bg-forest-900 text-white shadow-soft">
        <video autoPlay className="absolute inset-0 h-full w-full object-cover opacity-35" loop muted playsInline>
          <source src="/images/bgvideo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(7,22,12,0.9),rgba(18,58,26,0.6),rgba(185,116,73,0.3))]" />
        <div className="relative grid gap-10 px-6 py-14 sm:px-10 lg:grid-cols-[1.2fr_0.8fr] lg:px-16 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-moss">Interactive Garden Learning</p>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-none sm:text-6xl lg:text-7xl">
              Explore medicinal plants through a modern digital garden.
            </h1>
            <p className="mt-6 max-w-2xl text-base text-forest-50/90 sm:text-lg">
              Discover medicinal plants, identify herbs by photo, grow your virtual garden, plan layouts with companion planting, and track plant care activities with comprehensive learning modules.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link className={primaryButtonClass} to="/my-garden">
                Explore Garden
              </Link>
              <Link className={secondaryButtonClass} to="/learning">
                Open Learning Hub
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <div className="glass-panel p-6 text-forest-900">
              <p className="text-sm uppercase tracking-[0.25em] text-forest-500">Plant Profiles</p>
              <p className="mt-3 font-display text-5xl font-semibold">{isLoading ? '-' : counts.plants}</p>
              <p className="mt-3 text-sm text-forest-700">Featured medicinal plants with detailed descriptions, uses, and tags.</p>
            </div>
            <div className="glass-panel p-6 text-forest-900">
              <p className="text-sm uppercase tracking-[0.25em] text-forest-500">Garden Features</p>
              <p className="mt-3 font-display text-5xl font-semibold">3</p>
              <p className="mt-3 text-sm text-forest-700">Virtual simulator, planner, and care tracking tools.</p>
            </div>
            <div className="glass-panel p-6 text-forest-900">
              <p className="text-sm uppercase tracking-[0.25em] text-forest-500">Learning Modules</p>
              <p className="mt-3 font-display text-5xl font-semibold">{isLoading ? '-' : counts.resources}</p>
              <p className="mt-3 text-sm text-forest-700">Encyclopedia entries, quizzes, and video tutorials in one place.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
