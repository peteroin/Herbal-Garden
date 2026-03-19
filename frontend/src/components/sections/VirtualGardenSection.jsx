import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SectionHeading from "../ui/SectionHeading";
import SkeletonLoader from "../ui/SkeletonLoader";
import { gardenAPI } from "../../lib/api";
import { Leaf, Sprout, Trophy } from "lucide-react";

export default function VirtualGardenSection() {
  const [garden, setGarden] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isNotLoggedIn, setIsNotLoggedIn] = useState(false);

  useEffect(() => {
    fetchGarden();
  }, []);

  const fetchGarden = async () => {
    try {
      setIsLoading(true);
      const response = await gardenAPI.getUserGarden();
      setGarden(response.data);
    } catch (err) {
      console.error('Error fetching garden:', err);
      if (err.statusCode === 401) {
        setIsNotLoggedIn(true);
      } else {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section className="section-shell py-32" id="virtual-garden">
        <SectionHeading
          eyebrow="Virtual Garden"
          title="Grow Your Herbal Garden"
          copy="Loading your garden..."
        />
        <div className="mt-8">
          <SkeletonLoader variant="gallery" />
        </div>
      </section>
    );
  }

  if (isNotLoggedIn) {
    return (
      <section className="section-shell py-32" id="virtual-garden">
        <SectionHeading
          eyebrow="Virtual Garden"
          title="Grow Your Herbal Garden"
          copy="Create your own virtual garden and start growing medicinal herbs."
        />
        <div className="mt-16 rounded-[28px] border border-dashed border-forest-200 bg-forest-50 px-8 py-12 text-center">
          <p className="text-forest-600 mb-6">Log in to create and manage your virtual garden</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="inline-block px-8 py-3 bg-forest-600 hover:bg-forest-700 text-white font-semibold rounded-lg transition-all duration-300"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="inline-block px-8 py-3 border-2 border-forest-600 text-forest-600 hover:bg-forest-50 font-semibold rounded-lg transition-all duration-300"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section-shell py-32" id="virtual-garden">
        <SectionHeading
          eyebrow="Virtual Garden"
          title="Grow Your Herbal Garden"
          copy="Start your virtual gardening journey"
        />
        <div className="mt-16 rounded-[28px] border border-dashed border-red-200 bg-red-50 px-8 py-12 text-center">
          <p className="text-red-600 mb-4">Unable to load your garden</p>
          <button
            onClick={fetchGarden}
            className="px-6 py-2 bg-forest-600 text-white rounded-lg hover:bg-forest-700 transition"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  const plantedCount = garden?.plots?.filter(p => p.plantId).length || 0;
  const totalPlots = garden?.plots?.length || 0;

  return (
    <section className="section-shell py-32" id="virtual-garden">
      {/* Decorative Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
      </div>

      <SectionHeading
        eyebrow="Virtual Garden"
        title="Grow Your Herbal Garden"
        copy="Plant, care for, and harvest virtual medicinal herbs. Track growth stages and stay on top of plant care schedules."
      />

      <div className="mt-16 rounded-3xl border border-forest-200 bg-gradient-to-br from-white to-forest-50 overflow-hidden shadow-xl">
        {/* Garden Header with Image */}
        <div className="relative h-56 bg-gradient-to-r from-green-600 to-forest-800 overflow-hidden">
          <img
            src="/images/plant2.jpg"
            alt="Garden Preview"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-900/80 to-forest-900/40" />
          
          <div className="relative h-full flex items-center px-8 md:px-12 text-white">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-2">🌿 Your Virtual Garden</h3>
              <p className="text-white/90">Grow medicinal herbs and track their progress in real-time</p>
            </div>
          </div>
        </div>

        <div className="px-8 md:px-12 py-12">
          {garden ? (
            <div className="space-y-12">
              {/* Garden Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200 hover:shadow-lg transition">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-500 mb-3">
                    <Leaf className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-sm font-medium text-green-700">Plants Growing</p>
                  <p className="text-4xl font-bold text-green-900 mt-2">{plantedCount}/{totalPlots}</p>
                  <p className="text-xs text-green-600 mt-1">active plots</p>
                </div>
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 hover:shadow-lg transition">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-amber-500 mb-3">
                    <Trophy className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-sm font-medium text-amber-700">Total Harvests</p>
                  <p className="text-4xl font-bold text-amber-900 mt-2">{garden.totalHarvests || 0}</p>
                  <p className="text-xs text-amber-600 mt-1">completed cycles</p>
                </div>
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 hover:shadow-lg transition">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 mb-3">
                    <Sprout className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-sm font-medium text-emerald-700">Seedlings</p>
                  <p className="text-4xl font-bold text-emerald-900 mt-2">
                    {garden.plots?.filter(p => p.healthStatus === 'seedling').length || 0}
                  </p>
                  <p className="text-xs text-emerald-600 mt-1">early stage</p>
                </div>
              </div>

              {/* Mini Garden Preview */}
              {garden.plots && garden.plots.length > 0 && (
                <div className="p-8 rounded-2xl bg-white border-2 border-dashed border-forest-200">
                  <h4 className="text-xl font-bold text-forest-900 mb-6 flex items-center gap-2">
                    <span className="text-2xl">🌾</span>
                    Garden Layout Preview
                  </h4>
                  <div className="grid grid-cols-8 gap-3 max-w-lg">
                    {garden.plots.slice(0, 16).map((plot) => (
                      <div
                        key={plot.plotId}
                        className={`aspect-square rounded-xl border-2 flex items-center justify-center font-bold text-xl transition-all hover:scale-110 ${
                          plot.plantId
                            ? 'bg-gradient-to-br from-green-300 to-green-500 border-green-600 text-white shadow-md'
                            : 'bg-gradient-to-br from-amber-50 to-amber-100 border-amber-300 text-amber-700'
                        }`}
                      >
                        {plot.plantId ? '🌿' : '◻'}
                      </div>
                    ))}
                  </div>
                  {garden.plots.length > 16 && (
                    <p className="text-sm text-forest-600 mt-4 font-medium">
                      ➜ +{garden.plots.length - 16} more plots available
                    </p>
                  )}
                </div>
              )}

              {/* Features */}
              <div className="grid md:grid-cols-3 gap-6 pt-8 border-t-2 border-forest-100">
                <div className="text-center p-6 hover:bg-forest-50 rounded-2xl transition">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-forest-600 text-xl font-bold text-white">
                    🌱
                  </div>
                  <h4 className="font-semibold text-forest-900 mb-2">Grow Virtual Plants</h4>
                  <p className="text-sm text-forest-700">
                    Plant seeds, watch them grow through seedling, growing, mature, and harvest stages.
                  </p>
                </div>
                <div className="text-center p-6 hover:bg-forest-50 rounded-2xl transition">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-forest-600 text-xl font-bold text-white">
                    📐
                  </div>
                  <h4 className="font-semibold text-forest-900 mb-2">Plan Your Layout</h4>
                  <p className="text-sm text-forest-700">
                    Design garden layouts with detailed planning tools and get seasonal recommendations.
                  </p>
                </div>
                <div className="text-center p-6 hover:bg-forest-50 rounded-2xl transition">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-forest-600 text-xl font-bold text-white">
                    💧
                  </div>
                  <h4 className="font-semibold text-forest-900 mb-2">Track Care</h4>
                  <p className="text-sm text-forest-700">
                    Log watering, fertilizing, and other plant care activities with smart reminders.
                  </p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <Link
                  to="/my-garden"
                  className="inline-block px-8 py-3 bg-forest-600 hover:bg-forest-700 text-white font-semibold rounded-lg transition-all duration-300"
                >
                  Visit Your Garden
                </Link>
                <Link
                  to="/my-garden"
                  className="inline-block px-8 py-3 border-2 border-forest-600 text-forest-600 hover:bg-forest-50 font-semibold rounded-lg transition-all duration-300"
                >
                  Explore All Features
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-forest-600 mb-6">Create your first virtual garden to get started!</p>
              <Link
                to="/my-garden"
                className="inline-block px-8 py-3 bg-forest-600 hover:bg-forest-700 text-white font-semibold rounded-lg transition-all duration-300"
              >
                Start Your Garden
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
