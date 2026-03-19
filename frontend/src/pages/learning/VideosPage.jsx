import { useState, useEffect } from "react";
import SectionHeading from "../../components/ui/SectionHeading";
import SkeletonLoader from "../../components/ui/SkeletonLoader";
import VideoPlayer from "../../components/VideoPlayer";
import { videoAPI } from "../../lib/api";
import { useProgress } from "../../contexts/ProgressContext";

export default function VideosPage() {
  const { markVideoWatched } = useProgress();
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        const response = await videoAPI.getAllVideos();
        setVideos(response.data || []);
      } catch (err) {
        console.error('Error fetching videos:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (isLoading) {
    return (
      <section className="section-shell py-20">
        <SectionHeading
          eyebrow="Video Tutorials"
          title="Watch herb-focused explainers"
          copy="Loading videos..."
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
          eyebrow="Video Tutorials"
          title="Watch herb-focused explainers"
          copy={`Error loading videos: ${error}`}
        />
      </section>
    );
  }

  return (
    <>
      {/* Hero Banner with Background Image */}
      <div className="relative h-80 md:h-96 overflow-hidden rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-6 mb-12 shadow-2xl">
        <img
          src="/images/plant1.jpg"
          alt="Video Tutorials"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-900/85 via-purple-900/75 to-forest-800/60" />
        
        <div className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-16 text-white">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Video Tutorials</h1>
            <p className="text-lg text-white/90 mb-6">
              Learn herbalism from experts. Watch comprehensive video tutorials on plant identification, preparation methods, and traditional uses
            </p>
            <div className="flex gap-3 flex-wrap">
              <span className="px-4 py-2 bg-purple-600/80 rounded-full text-sm font-semibold">
                Expert Guidance
              </span>
              <span className="px-4 py-2 bg-forest-700/80 rounded-full text-sm font-semibold">
                High Quality
              </span>
              <span className="px-4 py-2 bg-green-600/80 rounded-full text-sm font-semibold">
                Proven Methods
              </span>
            </div>
          </div>
        </div>
      </div>

      <section className="section-shell py-20">
      <SectionHeading
        eyebrow="Video Tutorials"
        title="Watch herb-focused explainers"
        copy="Learn herbalism through comprehensive video tutorials."
      />
      <div className="grid gap-6 xl:grid-cols-2">
        {videos.map((video) => (
          <VideoPlayer 
            key={video.slug || video.title} 
            video={video}
            onVideoWatched={markVideoWatched}
          />
        ))}
      </div>
      </section>
    </>
  );
}
