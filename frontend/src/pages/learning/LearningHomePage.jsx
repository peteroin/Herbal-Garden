import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SectionHeading from "../../components/ui/SectionHeading";
import SkeletonLoader from "../../components/ui/SkeletonLoader";
import { learningAPI } from "../../lib/api";

export default function LearningHomePage() {
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setIsLoading(true);
        const response = await learningAPI.getAllLearningResources();
        setResources(response.data || []);
      } catch (err) {
        console.error('Error fetching learning resources:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, []);

  if (isLoading) {
    return (
      <section className="section-shell py-20">
        <SectionHeading
          eyebrow="Learning"
          title="Choose how you want to learn"
          copy="Loading learning resources..."
        />
        <div className="mt-8 space-y-4 grid gap-6 lg:grid-cols-3">
          <SkeletonLoader variant="card" count={3} />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section-shell py-20">
        <SectionHeading
          eyebrow="Learning"
          title="Choose how you want to learn"
          copy={`Error loading learning resources: ${error}`}
        />
      </section>
    );
  }

  return (
    <section className="section-shell py-20">
      <SectionHeading
        eyebrow="Learning"
        title="Choose how you want to learn"
        copy="The learning section is now a routed hub for encyclopedia content, interactive quizzes, and embedded video tutorials."
      />
      <div className="grid gap-6 lg:grid-cols-3 mt-8">
        {resources.map((resource, idx) => (
          <article key={resource.slug || resource.title} className="group relative h-full">
            {/* Background Image Overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl">
              <img 
                src={idx === 0 ? '/images/plant1.jpg' : '/images/plant2.jpg'}
                alt={resource.title}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>

            {/* Card */}
            <div className="relative glass-panel p-8 h-full rounded-2xl border border-forest-100 hover:border-forest-300 shadow-md hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 flex flex-col">
              {/* Top accent bar */}
              <div className="h-1 w-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full mb-6" />

              {/* Content */}
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-forest-900 group-hover:text-forest-950 transition">{resource.title}</h2>
                <p className="mt-4 text-sm leading-6 text-forest-700">{resource.description}</p>
              </div>

              {/* CTA */}
              <Link className="mt-6 inline-flex text-sm font-semibold text-forest-800 hover:text-clay-700 hover:underline transition" to={resource.href}>
                Open Resource →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
