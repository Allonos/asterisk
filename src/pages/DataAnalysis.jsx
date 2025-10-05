import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, PerspectiveCamera } from "@react-three/drei";

function Model() {
  const { scene } = useGLTF("/src/assets/solar_system_asteroids.glb");
  return <primitive object={scene} rotation={[0, Math.PI / 2, 0]} />;
}

const DataAnalysis = () => {
  return (
    <div style={{ width: "100%", height: "100vh", backgroundColor: "black" }}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[15, -30, -10]} />
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 3]} intensity={10} />
        <pointLight position={[-5, -5, -3]} intensity={10} />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
      </Canvas>
    </div>
  );
};

export default DataAnalysis;
