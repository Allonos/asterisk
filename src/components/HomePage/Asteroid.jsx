import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { useMediaQuery } from "react-responsive";

export default function Asteroid({ scrollProgress, onAnimationComplete }) {
  const groupRef = useRef();
  const { scene } = useGLTF(`${import.meta.env.BASE_URL}assets/fbx.glb`);
  const diffuse = useTexture(`${import.meta.env.BASE_URL}assets/diffuse.jpg`);
  const [animationDone, setAnimationDone] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: 820 });
  const isTablet = useMediaQuery({ minWidth: 820, maxWidth: 1400 });
  const isLaptop = useMediaQuery({ minWidth: 1400, maxWidth: 1600 });

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        diffuse.colorSpace = THREE.SRGBColorSpace;
        diffuse.needsUpdate = true;

        child.material = new THREE.MeshStandardMaterial({
          map: diffuse,
          roughness: 1.5,
          metalness: 1,
        });

        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene, diffuse]);

  useEffect(() => {
    if (groupRef.current && !animationDone) {
      let targetX = 3.3;

      if (isTablet && !isMobile && !isLaptop) {
        targetX = 2.5;
      }

      groupRef.current.position.set(5, -10, 0);

      gsap.to(groupRef.current.position, {
        x: targetX,
        y: 0,
        z: 0,
        duration: 2,
        ease: "power2.out",
        onComplete: () => {
          setAnimationDone(true);
          if (onAnimationComplete) {
            onAnimationComplete();
          }
        },
      });

      gsap.to(groupRef.current.rotation, {
        y: Math.PI * 2,
        duration: 6,
        ease: "power2.out",
      });
    }
  }, [onAnimationComplete, animationDone, isTablet, isMobile, isLaptop]);

  useFrame(() => {
    if (groupRef.current && animationDone) {
      let startX = 3.3;
      let endX = -3.3;

      if (isTablet && !isMobile && !isLaptop) {
        startX = 2.5;
        endX = -2.5;
      }

      const x = startX - scrollProgress * (startX - endX);

      const z = -7 * Math.sin(scrollProgress * Math.PI);

      groupRef.current.position.set(x, 0, z);

      groupRef.current.rotation.y += 0.01;
      groupRef.current.rotation.x += 0.005;
    }
  });

  let asteroidsScale;

  if (isLaptop && !isTablet) {
    asteroidsScale = 1.5;
  } else if (isTablet && !isLaptop) {
    asteroidsScale = 1;
  } else {
    asteroidsScale = 2;
  }

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={asteroidsScale} />
    </group>
  );
}

useGLTF.preload(`${import.meta.env.BASE_URL}assets/fbx.glb`);
