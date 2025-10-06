import React, { Suspense, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, PerspectiveCamera } from "@react-three/drei";
import HeatmapPlot from "../components/DataVisualizationPage/HeatMapPlot";
import HeatMapContainer from "../components/DataVisualizationPage/HeatMapContainer";

function Model() {
  const { scene } = useGLTF(
    `${import.meta.env.BASE_URL}assets/solar_system_asteroids.glb`
  );
  const modelRef = useRef();

  // Rotate the model continuously
  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.x += delta * 0.3;
    }
  });

  return (
    <primitive ref={modelRef} object={scene} rotation={[0, Math.PI / 2, 0]} />
  );
}

const DataVisualization = () => {
  const [enableZooming, setEnableZooming] = useState(false);

  return (
    <div className="h-screen relative bg-black">
      <div className="absolute top-5  border-white left-5 text-white text-lg font-sans z-10 bg-black/60 px-4 py-3 rounded-lg max-w-[600px]">
        <h1 className="text-2xl">Visualization of Near Earth Asteroids from</h1>
        <p className="text-xl">2025-09-08 to 2025-10-01</p>
        <div className="mt-14">
          {!enableZooming && (
            <p>
              If you want to zoom in and out of the 3D Model click:{" "}
              <span
                onClick={() => setEnableZooming(true)}
                className="cursor-pointer underline text-[#9B68FD] hover:text-[#8848ff] ease-in-out"
              >
                Play
              </span>
            </p>
          )}

          {enableZooming && (
            <p>
              If you want to stop zoom in and out of the 3D Model click:{" "}
              <span
                onClick={() => setEnableZooming(false)}
                className="cursor-pointer underline text-[#9B68FD] hover:text-[#8848ff] ease-in-out"
              >
                Stop
              </span>
            </p>
          )}
        </div>
      </div>
      <Canvas>
        <PerspectiveCamera makeDefault position={[15, -25, -10]} />
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 3]} intensity={10} />
        <pointLight position={[-5, -5, -3]} intensity={10} />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        <OrbitControls
          enableZoom={enableZooming}
          enablePan={true}
          enableRotate={true}
        />
      </Canvas>

      <HeatMapContainer />
    </div>
  );
};

export default DataVisualization;
