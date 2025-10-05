import { useRef } from "react";

function RandomStars({ count = 100 }) {
  const dots = useRef([]);

  if (dots.current.length === 0) {
    const positions = [];
    for (let i = 0; i < count; i++) {
      positions.push({
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 15,
        z: (Math.random() - 0.5) * 10 - 5,
        size: 0.01,
      });
    }
    dots.current = positions;
  }

  return (
    <group>
      {dots.current.map((dot, i) => (
        <mesh key={i} position={[dot.x, dot.y, dot.z]}>
          <sphereGeometry args={[dot.size, 8, 8]} />
          <meshBasicMaterial color="white" />
        </mesh>
      ))}
    </group>
  );
}

export default RandomStars;
