import { useFrame } from "@react-three/fiber";
import { useState } from "react";
import { useScroll } from "@react-three/drei";
import RandomStars from "./RandomStars";
import Asteroid from "./Asteroid";
import { useMediaQuery } from "react-responsive";

export default function Scene({ onAnimationComplete }) {
  const scroll = useScroll();
  const [scrollProgress, setScrollProgress] = useState(0);
  const isMobile = useMediaQuery({ maxWidth: 900 });

  useFrame(() => {
    setScrollProgress(scroll.offset);
  });

  return (
    <>
      <color attach="background" args={["black"]} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[-5, -3, -3]} intensity={8} />
      <directionalLight position={[1, -2, 2]} intensity={8} />
      <RandomStars count={150} />
      {!isMobile && (
        <Asteroid
          scrollProgress={scrollProgress}
          onAnimationComplete={onAnimationComplete}
        />
      )}
    </>
  );
}
