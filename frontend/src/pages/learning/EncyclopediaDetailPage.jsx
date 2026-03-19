import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SectionHeading from "../../components/ui/SectionHeading";
import SkeletonLoader from "../../components/ui/SkeletonLoader";
import { encyclopediaAPI } from "../../lib/api";
import { useProgress } from "../../contexts/ProgressContext";

export default function EncyclopediaDetailPage() {
  const { slug } = useParams();
  const { recordEncyclopediaView } = useProgress();
  const [entry, setEntry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        setIsLoading(true);
        const response = await encyclopediaAPI.getBySlug(slug);
        if (!response.data) {
          setError("Encyclopedia entry not found");
        } else {
          setEntry(response.data);
          // Track encyclopedia view
          await recordEncyclopediaView(response.data._id, slug, response.data.title);
        }
      } catch (err) {
        console.error('Error fetching encyclopedia entry:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntry();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="section-shell py-20">
        <SkeletonLoader variant="article" />
      </div>
    );
  }

  if (error || !entry) {
    return (
      <div className="section-shell py-20">
        <div className="text-center">
          <h1 className="font-display text-4xl font-semibold text-forest-900">Entry Not Found</h1>
          <p className="mt-4 text-forest-700">{error || "The requested encyclopedia entry could not be found."}</p>
          <Link 
            to="/learning/encyclopedia" 
            className="mt-6 inline-block rounded-full bg-forest-700 px-6 py-3 text-sm font-semibold text-white hover:bg-forest-800"
          >
            ← Back to Encyclopedia
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-forest-700 to-forest-900 py-16">
        <div className="section-shell">
          <Link 
            to="/learning/encyclopedia" 
            className="inline-flex items-center text-forest-100 hover:text-white transition-colors mb-6"
          >
            <span className="mr-2">←</span> Back to Encyclopedia
          </Link>
          <h1 className="font-display text-5xl font-semibold text-white mt-4">{entry.title}</h1>
          <p className="mt-4 max-w-3xl text-lg text-forest-100">{entry.description}</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-shell py-16">
        <div className="max-w-3xl">
          {/* Main Content */}
          <article className="prose prose-forest max-w-none">
            <div className="whitespace-pre-wrap text-lg leading-8 text-forest-700">
              {entry.content}
            </div>
          </article>

          {/* Tags Section */}
          {entry.tags && entry.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-forest-200">
              <h3 className="font-semibold text-forest-900 mb-4">Topics Covered</h3>
              <div className="flex flex-wrap gap-2">
                {entry.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="inline-block rounded-full bg-forest-100 px-4 py-2 text-sm text-forest-700 hover:bg-forest-200 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Entries Section - Can be expanded later */}
      <section className="section-shell py-16 bg-forest-50">
        <h2 className="font-display text-3xl font-semibold text-forest-900 mb-4">Explore More</h2>
        <p className="text-forest-700 mb-8">Continue learning about traditional medicine systems in our encyclopedia.</p>
        <Link 
          to="/learning/encyclopedia" 
          className="inline-block rounded-full bg-forest-700 px-6 py-3 text-sm font-semibold text-white hover:bg-forest-800"
        >
          View All Encyclopedia Entries
        </Link>
      </section>
    </main>
  );
}
