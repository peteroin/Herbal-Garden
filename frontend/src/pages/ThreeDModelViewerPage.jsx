import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import SectionHeading from "../components/ui/SectionHeading";
import SkeletonLoader from "../components/ui/SkeletonLoader";
import ThreeModelStage from "../components/ThreeModelStage";
import { models3dAPI } from "../lib/api";
import NotFoundPage from "./NotFoundPage";

export default function ThreeDModelViewerPage() {
  const { modelSlug } = useParams();
  const [model, setModel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Construct full model URL for loading
  const getFullModelUrl = (modelPath) => {
    if (!modelPath) return null;
    
    // For local development, use local file path from public directory
    if (import.meta.env.DEV) {
      return modelPath; // Use relative path directly (e.g., "/models/tulsi.glb")
    }
    
    // If it's already an absolute URL, return as-is
    if (modelPath.startsWith('http://') || modelPath.startsWith('https://')) {
      return modelPath;
    }
    
    // For production, construct from API base URL
    const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    const baseUrl = apiBase.replace('/api', ''); // Remove /api to get base URL
    return baseUrl + modelPath;
  };

  useEffect(() => {
    const fetchModel = async () => {
      try {
        setIsLoading(true);
        const response = await models3dAPI.getBySlug(modelSlug);
        // The API returns { data: model }
        setModel(response.data || response);
      } catch (err) {
        console.error('Error fetching model:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchModel();
  }, [modelSlug]);

  if (isLoading) {
    return (
      <section className="section-shell py-20">
        <SkeletonLoader variant="hero" />
      </section>
    );
  }

  if (error || !model) {
    return <NotFoundPage message="That 3D model is not available yet." />;
  }

  return (
    <section className="section-shell py-20">
      <SectionHeading
        eyebrow="Live Viewer"
        title={model.title}
        copy="Explore interactive 3D models of medicinal herbs. Rotate, zoom, and examine botanical details."
      />
      <ThreeModelStage modelPath={getFullModelUrl(model.modelPath)} />
    </section>
  );
}
