import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import SectionHeading from "../components/ui/SectionHeading";
import PlantCard from "../components/ui/PlantCard";
import SkeletonLoader from "../components/ui/SkeletonLoader";
import VideoPlayer from "../components/VideoPlayer";
import FavoriteButton from "../components/FavoriteButton";
import { AuthContext } from "../contexts/AuthContext";
import { favoriteAPI } from "../lib/api";

export default function FavoritesPage() {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState({ grouped: {} });
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  const fetchFavorites = async () => {
    try {
      setIsLoading(true);
      const response = await favoriteAPI.getUserFavorites();
      setFavorites(response);
      setActiveTab('all');
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFavoriteRemove = () => {
    fetchFavorites();
  };

  const groupedFavorites = favorites.grouped || {};
  const resourceTypes = Object.keys(groupedFavorites);
  const hasAnyFavorites = resourceTypes.some(type => groupedFavorites[type].length > 0);

  if (isLoading) {
    return (
      <section className="section-shell py-20">
        <SectionHeading 
          eyebrow="Personal Collection" 
          title="My Favorites"
          copy="Loading your favorites..."
        />
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <SkeletonLoader variant="gallery" count={3} />
        </div>
      </section>
    );
  }

  if (!hasAnyFavorites) {
    return (
      <section className="section-shell py-20">
        <div className="text-center">
          <h1 className="font-display text-4xl font-semibold text-forest-900">My Favorites</h1>
          <p className="mt-4 text-lg text-forest-600">You haven't added any favorites yet.</p>
          <p className="mt-2 text-base text-forest-500">
            Explore our content and click the heart icon to save your favorites.
          </p>
          <Link 
            to="/" 
            className="mt-6 inline-flex rounded-full bg-forest-600 px-8 py-3 font-semibold text-white hover:bg-forest-700 transition"
          >
            Explore Content
          </Link>
        </div>
      </section>
    );
  }

  // Calculate totals for each type
  const plantCount = (groupedFavorites.plant || []).length;
  const videoCount = (groupedFavorites.video || []).length;
  const encyclopediaCount = (groupedFavorites.encyclopedia || []).length;
  const model3DCount = (groupedFavorites.model3d || []).length;
  const totalCount = plantCount + videoCount + encyclopediaCount + model3DCount;

  const tabs = [
    { id: 'all', label: `All (${totalCount})` },
    ...(plantCount > 0 ? [{ id: 'plant', label: `Plants (${plantCount})` }] : []),
    ...(videoCount > 0 ? [{ id: 'video', label: `Videos (${videoCount})` }] : []),
    ...(encyclopediaCount > 0 ? [{ id: 'encyclopedia', label: `Encyclopedia (${encyclopediaCount})` }] : []),
    ...(model3DCount > 0 ? [{ id: 'model3d', label: `3D Models (${model3DCount})` }] : []),
  ];

  const currentFavorites = activeTab === 'all' 
    ? Object.values(groupedFavorites).flat()
    : groupedFavorites[activeTab] || [];

  // Extract YouTube video ID from URL
  const getYouTubeId = (url) => {
    const match = url?.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=))([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const renderFavoriteItem = (item, type) => {
    switch (type) {
      case 'plant':
        return (
          <PlantCard key={item._id} plant={item} />
        );
      case 'video':
        const youtubeId = getYouTubeId(item.url);
        return (
          <div key={item._id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
            <div className="relative aspect-video bg-gray-200">
              <img 
                src={youtubeId ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg` : 'https://via.placeholder.com/320x180?text=Video'}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <FavoriteButton 
                  resourceId={item._id}
                  resourceType="video"
                  resourceName={item.title}
                  onToggle={handleFavoriteRemove}
                  className="bg-white text-clay-600 hover:text-clay-700"
                />
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-forest-900 line-clamp-2">{item.title}</h3>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">{item.description}</p>
            </div>
          </div>
        );
      case 'encyclopedia':
        return (
          <div key={item._id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-forest-900" >{item.title}</h3>
              <FavoriteButton 
                resourceId={item._id}
                resourceType="encyclopedia"
                resourceName={item.title}
                onToggle={handleFavoriteRemove}
                className="text-clay-600 hover:text-clay-700"
              />
            </div>
            <p className="text-sm text-gray-600 line-clamp-3">{item.content}</p>
          </div>
        );
      case 'model3d':
        return (
          <div key={item._id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
            <div className="relative aspect-square bg-gradient-to-br from-forest-100 to-plant-100 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">📦</div>
                <p className="text-sm text-forest-600">{item.title}</p>
              </div>
              <div className="absolute top-2 right-2">
                <FavoriteButton 
                  resourceId={item._id}
                  resourceType="model3d"
                  resourceName={item.title}
                  onToggle={handleFavoriteRemove}
                  className="bg-white text-clay-600 hover:text-clay-700"
                />
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-forest-900">{item.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{item.description}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Hero Banner with Background Image */}
      <div className="relative h-80 md:h-96 overflow-hidden rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-6 mb-12 shadow-2xl">
        <img
          src="/images/plant1.jpg"
          alt="My Favorites"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-900/85 via-rose-900/75 to-forest-800/60" />
        
        <div className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-16 text-white">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">My Favorites</h1>
            <p className="text-lg text-white/90 mb-6">
              Curated collection of plants, videos, encyclopedia entries, and 3D models you love
            </p>
            <div className="flex gap-3 flex-wrap">
              <span className="px-4 py-2 bg-rose-600/80 rounded-full text-sm font-semibold">
                Saved Items
              </span>
              <span className="px-4 py-2 bg-forest-700/80 rounded-full text-sm font-semibold">
                Quick Access
              </span>
              <span className="px-4 py-2 bg-green-600/80 rounded-full text-sm font-semibold">
                Personal Library
              </span>
            </div>
          </div>
        </div>
      </div>

      <section className="section-shell py-20">
      <SectionHeading 
        eyebrow="Personal Collection" 
        title="My Favorites"
        copy={`You have ${totalCount} favorite item${totalCount !== 1 ? 's' : ''} saved.`}
      />

      {/* Tabs */}
      <div className="mt-8 flex gap-2 flex-wrap">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              activeTab === tab.id
                ? 'bg-forest-600 text-white'
                : 'bg-gray-200 text-forest-700 hover:bg-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Favorites Grid */}
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {currentFavorites.filter(item => item).map((item) => {
          // Determine type from grouped data
          let type = 'plant';
          if (activeTab !== 'all') {
            type = activeTab;
          } else {
            for (const [key, items] of Object.entries(groupedFavorites)) {
              if (items.some(i => i._id === item._id)) {
                type = key;
                break;
              }
            }
          }
          return renderFavoriteItem(item, type);
        })}
      </div>

      <div className="mt-12 flex justify-center">
        <button
          onClick={handleFavoriteRemove}
          className="px-6 py-2 text-sm font-semibold text-forest-600 hover:text-clay-600 hover:underline transition"
        >
          Refresh
        </button>
      </div>
      </section>
    </>
  );
}
