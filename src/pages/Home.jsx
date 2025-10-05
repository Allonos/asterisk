import { Canvas } from "@react-three/fiber";
import { useState, useEffect } from "react";
import { ScrollControls } from "@react-three/drei";
import Scene from "../components/HomePage/Scene";
import Overlay from "../components/HomePage/Overlay.jsx";
import Loader from "../components/ui/Loader.jsx";

function Home({ onLoadingComplete }) {
  const [loading, setLoading] = useState(true);
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      if (onLoadingComplete) {
        setTimeout(() => {
          onLoadingComplete();
        }, 100);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  useEffect(() => {
    if (!canScroll) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.position = "static";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.position = "static";
    };
  }, [canScroll]);

  const handleAnimationComplete = () => {
    setCanScroll(true);
  };

  return (
    <>
      {loading && <Loader />}

      {!canScroll && !loading && (
        <div className="fixed inset-0 z-40 pointer-events-auto" />
      )}

      <div className="w-[100%] h-[100vh]">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ScrollControls pages={5} damping={0.3} enabled={canScroll}>
            <Scene onAnimationComplete={handleAnimationComplete} />
            <Overlay enabled={canScroll} />
          </ScrollControls>
        </Canvas>
      </div>
    </>
  );
}

export default Home;
