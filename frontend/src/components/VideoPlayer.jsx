import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Play, X, Maximize2 } from "lucide-react";
import FavoriteButton from "./FavoriteButton";

export default function VideoPlayer({ video, onVideoWatched }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isYouTubeLoaded, setIsYouTubeLoaded] = useState(false);
  const [videoTracked, setVideoTracked] = useState(false);

  // Track video as watched when opened/played
  const handleVideoOpen = () => {
    if (!videoTracked && onVideoWatched) {
      onVideoWatched(video._id, video.slug || video.title?.toLowerCase().replace(/\s+/g, '-'), video.title, 100, video.duration);
      setVideoTracked(true);
    }
  };

  // Track video when zoomed opens
  useEffect(() => {
    if (isZoomed) {
      handleVideoOpen();
    }
  }, [isZoomed]);

  // Extract YouTube video ID from URL
  const getYouTubeId = (url) => {
    const match = url?.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=))([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const isYouTubeUrl = video.url && video.url.includes("youtube.com") || video.url?.includes("youtu.be");
  const youtubeId = isYouTubeUrl ? getYouTubeId(video.url) : null;
  const isLocalFile = video.url?.endsWith(".mp4");

  // Truncate description to ~150 characters for preview
  const truncateText = (text, maxLength = 150) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const displayDescription = isExpanded ? video.description : truncateText(video.description);
  const showExpandButton = video.description && video.description.length > 150;

  return (
    <>
      {/* Zoomed Modal Overlay */}
      {isZoomed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95 p-4">
          {/* Close Button */}
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-4 right-4 rounded-full bg-white p-2 text-forest-900 transition-all duration-200 hover:bg-forest-100 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close zoomed view"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Zoomed Video Container */}
          <div className="relative w-full max-w-5xl">
            <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
              {isYouTubeUrl && youtubeId ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${youtubeId}?rel=0&autoplay=1`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              ) : isLocalFile ? (
                <video
                  controls
                  autoPlay
                  className="h-full w-full"
                  poster={video.thumbnail}
                  controlsList="nodownload"
                >
                  <source src={video.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="flex h-full flex-col items-center justify-center space-y-3">
                  <Play className="h-16 w-16 text-white opacity-30" />
                  <p className="text-center text-lg text-white">Video not available</p>
                </div>
              )}
            </div>

            {/* Video Title in Zoomed View */}
            <div className="mt-4 text-center">
              <h2 className="text-xl font-bold text-white">{video.title}</h2>
              <p className="mt-1 text-sm text-gray-300">{video.duration}</p>
            </div>
          </div>
        </div>
      )}

      {/* Normal Video Card */}
      {/* Normal Video Card */}
      <article className="glass-panel overflow-hidden transition-all duration-300 hover:shadow-lg">
        {/* Video Container - Clickable */}
        <div
          onClick={() => {
            handleVideoOpen();
            setIsZoomed(true);
          }}
          className="group relative aspect-video w-full overflow-hidden bg-gradient-to-br from-forest-900 to-forest-800 cursor-pointer transition-transform duration-300 hover:scale-105"
        >
          {isYouTubeUrl && youtubeId ? (
            // YouTube Embed
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${youtubeId}?rel=0`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="h-full w-full"
              onClick={(e) => e.stopPropagation()}
            />
          ) : isLocalFile ? (
            // Local Video File
            <video
              controls
              className="h-full w-full"
              poster={video.thumbnail}
              controlsList="nodownload"
              onClick={(e) => e.stopPropagation()}
            >
              <source src={video.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            // Fallback - No Video Available
            <div className="flex h-full flex-col items-center justify-center space-y-3">
              <Play className="h-12 w-12 text-forest-300 opacity-50" />
              <p className="text-center text-sm text-forest-300">Video not available</p>
            </div>
          )}

          {/* Zoom Button Overlay */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleVideoOpen();
              setIsZoomed(true);
            }}
            className="absolute top-4 right-4 rounded-full bg-white bg-opacity-80 p-2 text-forest-900 opacity-0 transition-all duration-300 group-hover:opacity-100 hover:bg-opacity-100 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Zoom video"
          >
            <Maximize2 className="h-5 w-5" />
          </button>
        </div>

      {/* Content Container */}
      <div className="space-y-4 p-6">
        {/* Title with Favorite Button */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-forest-900 line-clamp-2">
              {video.title}
            </h3>
          </div>
          <FavoriteButton
            resourceId={video._id || video.id}
            resourceType="video"
            resourceName={video.title}
            className="flex-shrink-0"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
            {video.duration && (
              <span className="inline-block rounded-full bg-forest-100 px-3 py-1 text-xs font-medium text-forest-700">
                ⏱️ {video.duration}
              </span>
            )}
            {video.category && (
              <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 capitalize">
                {video.category}
              </span>
            )}
          </div>

        {/* Description with Expander */}
        <div className="space-y-3">
          <p
            className={`text-sm leading-relaxed text-forest-700 transition-all duration-300 ${
              isExpanded ? "line-clamp-none" : "line-clamp-3"
            }`}
          >
            {displayDescription}
          </p>

          {showExpandButton && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-green-600 transition-colors duration-200 hover:text-green-700"
            >
              {isExpanded ? (
                <>
                  <span>Show Less</span>
                  <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  <span>Read More</span>
                  <ChevronDown className="h-4 w-4" />
                </>
              )}
            </button>
          )}
        </div>

        {/* Learning Objectives (if expanded and available) */}
        {isExpanded && video.learning_objectives && video.learning_objectives.length > 0 && (
          <div className="space-y-2 border-t border-forest-200 pt-4">
            <h4 className="text-sm font-semibold text-forest-800">Learning Objectives:</h4>
            <ul className="space-y-2">
              {video.learning_objectives.map((objective, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-forest-700">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-green-500 flex-shrink-0" />
                  <span>{objective}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Target Audience (if expanded and available) */}
        {isExpanded && video.target_audience && (
          <div className="space-y-1 border-t border-forest-200 pt-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-forest-600">
              Target Audience
            </p>
            <p className="text-sm text-forest-700">{video.target_audience}</p>
          </div>
        )}

        {/* Related Plants (if expanded and available) */}
        {isExpanded && video.related_plants && (
          <div className="space-y-2 border-t border-forest-200 pt-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-forest-600">
              Related Plants
            </p>
            <div className="flex flex-wrap gap-2">
              {video.related_plants.split(",").map((plant, idx) => (
                <span
                  key={idx}
                  className="rounded-full bg-forest-50 px-2.5 py-1 text-xs text-forest-700"
                >
                  {plant.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      </article>
    </>
  );
}
