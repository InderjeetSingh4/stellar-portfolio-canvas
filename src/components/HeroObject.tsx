import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function GlassTorus() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.PI / 2.5 + pointer.y * 0.2;
      meshRef.current.rotation.y = t * 0.15;
      meshRef.current.rotation.z = pointer.x * 0.15;
    }
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#f5f0e8" />
      <directionalLight position={[-3, 2, -2]} intensity={0.4} color="#e8e0d4" />
      <pointLight position={[0, 3, 3]} intensity={0.8} color="#ffffff" />
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.5}>
        <mesh ref={meshRef}>
          <torusGeometry args={[1.4, 0.5, 64, 128]} />
          <meshPhysicalMaterial
            color="#f0ece6"
            transmission={0.92}
            thickness={1.2}
            roughness={0.05}
            metalness={0.0}
            ior={1.5}
            envMapIntensity={1.5}
            clearcoat={1}
            clearcoatRoughness={0.1}
            transparent
            opacity={0.85}
            side={THREE.DoubleSide}
          />
        </mesh>
      </Float>
    </>
  );
}

const HeroObject = () => (
  <div className="w-full h-[400px] md:h-[500px]" style={{ willChange: "transform" }}>
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <GlassTorus />
    </Canvas>
  </div>
);

export default HeroObject;
