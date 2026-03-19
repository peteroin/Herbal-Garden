import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stage } from "@react-three/drei";

function PlantModel({ modelPath }) {
  const { scene } = useGLTF(modelPath);

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [scene]);

  return <primitive object={scene} />;
}

export default function ThreeModelStage({ modelPath }) {
  const [hasError, setHasError] = useState(false);

  console.log("ThreeModelStage rendering with path:", modelPath);

  if (!modelPath) {
    return (
      <div className="flex h-[500px] items-center justify-center rounded-[28px] bg-slate-100 italic text-slate-400">
        No model path provided
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="flex h-[500px] flex-col items-center justify-center rounded-[28px] border border-white/60 bg-forest-100">
        <p className="text-forest-700 font-medium">Unable to load 3D model</p>
        <button
          onClick={() => setHasError(false)}
          className="mt-4 rounded-lg bg-forest-600 px-4 py-2 text-sm text-white hover:bg-forest-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  const handleCanvasError = (error) => {
    console.error("Canvas error:", error);
    setHasError(true);
  };

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/60 bg-[#d7e8f2] shadow-soft">
      <div className="absolute left-5 top-5 z-10 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-forest-800 backdrop-blur">
        Drag to orbit. Scroll to zoom.
      </div>
      <div className="h-[500px] w-full" style={{ minHeight: '500px' }}>
        <Suspense fallback={
          <div className="flex h-full w-full items-center justify-center bg-[#bcd7ea] text-forest-800">
            Loading 3D Model...
          </div>
        }>
          <Canvas 
            camera={{ position: [0, 0, 5], fov: 45 }} 
            shadows
            onError={handleCanvasError}
          >
            <color attach="background" args={["#bcd7ea"]} />
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <Stage intensity={0.6} contactShadow={{ opacity: 0.7, blur: 2 }}>
              <PlantModel modelPath={modelPath} />
            </Stage>
            <OrbitControls autoRotate autoRotateSpeed={0.5} enablePan={false} minDistance={2} maxDistance={20} />
          </Canvas>
        </Suspense>
      </div>
    </div>
  );
}