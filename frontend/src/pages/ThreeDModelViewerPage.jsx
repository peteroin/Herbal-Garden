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
      <ThreeModelStage modelPath={model.modelPath} />
    </section>
  );
}
