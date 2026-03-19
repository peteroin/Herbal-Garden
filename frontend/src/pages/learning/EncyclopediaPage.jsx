import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SectionHeading from "../../components/ui/SectionHeading";
import SkeletonLoader from "../../components/ui/SkeletonLoader";
import FavoriteButton from "../../components/FavoriteButton";
import { encyclopediaAPI } from "../../lib/api";

export default function EncyclopediaPage() {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setIsLoading(true);
        const response = await encyclopediaAPI.getAllEntries();
        setEntries(response.data || []);
      } catch (err) {
        console.error('Error fetching encyclopedia entries:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntries();
  }, []);

  if (isLoading) {
    return (
      <section className="section-shell py-20">
        <SectionHeading
          eyebrow="Herb Encyclopedia"
          title="Traditional Medicine Systems"
          copy="Loading encyclopedia entries..."
        />
        <div className="mt-8 space-y-4">
          <SkeletonLoader variant="list" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section-shell py-20">
        <SectionHeading
          eyebrow="Herb Encyclopedia"
          title="Traditional Medicine Systems"
          copy={`Error loading entries: ${error}`}
        />
      </section>
    );
  }

  return (
    <>
      {/* Hero Banner with Background Image */}
      <div className="relative h-80 md:h-96 overflow-hidden rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-6 mb-12 shadow-2xl">
        <img
          src="/images/plant2.jpg"
          alt="Herb Encyclopedia"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-900/85 via-amber-900/75 to-forest-800/60" />
        
        <div className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-16 text-white">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Herb Encyclopedia</h1>
            <p className="text-lg text-white/90 mb-6">
              Explore centuries of healing wisdom from Ayurveda, Unani, Siddha, and Traditional Chinese Medicine
            </p>
            <div className="flex gap-3 flex-wrap">
              <span className="px-4 py-2 bg-amber-600/80 rounded-full text-sm font-semibold">
                Ancient Wisdom
              </span>
              <span className="px-4 py-2 bg-forest-700/80 rounded-full text-sm font-semibold">
                Global Traditions
              </span>
              <span className="px-4 py-2 bg-green-600/80 rounded-full text-sm font-semibold">
                Evidence-Based
              </span>
            </div>
          </div>
        </div>
      </div>

      <section className="section-shell py-20">
      <SectionHeading
        eyebrow="Herb Encyclopedia"
        title="Traditional Medicine Systems"
        copy="Explore detailed information about ancient healing traditions from around the world. Click on any entry to learn more."
      />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
        {entries.map((entry) => (
          <Link
            key={entry.slug || entry.title}
            to={`/learning/encyclopedia/${entry.slug}`}
            className="group"
          >
            <article className="glass-panel p-6 h-full transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="text-2xl font-semibold text-forest-900 group-hover:text-forest-700 transition-colors flex-1">
                  {entry.title}
                </h3>
                <FavoriteButton
                  resourceId={entry._id || entry.id}
                  resourceType="encyclopedia"
                  resourceName={entry.title}
                  className="flex-shrink-0"
                  onClick={(e) => e.preventDefault()}
                />
              </div>
              <p className="mt-2 text-sm text-forest-600 line-clamp-2">{entry.description}</p>
              
              {/* Preview of content */}
              <p className="mt-4 text-sm leading-6 text-forest-700 line-clamp-3">
                {entry.content?.substring(0, 200)}...
              </p>
              
              {/* Tags - First 3 only on preview */}
              <div className="mt-4 flex flex-wrap gap-2">
                {entry.tags?.slice(0, 3).map((tag) => (
                  <span 
                    key={tag} 
                    className="rounded-full bg-forest-100 px-3 py-1 text-xs text-forest-700"
                  >
                    {tag}
                  </span>
                ))}
                {entry.tags?.length > 3 && (
                  <span className="rounded-full bg-forest-100 px-3 py-1 text-xs text-forest-700">
                    +{entry.tags.length - 3} more
                  </span>
                )}
              </div>

              {/* Read more indicator */}
              <div className="mt-4 flex items-center text-forest-700 group-hover:text-forest-900 font-semibold text-sm">
                Read More <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </article>
          </Link>
        ))}
      </div>
      </section>
    </>
  );
}
