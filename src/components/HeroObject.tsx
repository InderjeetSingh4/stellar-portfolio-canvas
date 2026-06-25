import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function GlassTorus() {
  const meshRef = useRef<THREE.Mesh>(null);
  const icoRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.PI / 2.5 + pointer.y * 0.25;
      meshRef.current.rotation.y = t * 0.18;
      meshRef.current.rotation.z = pointer.x * 0.2;
    }
    if (icoRef.current) {
      icoRef.current.rotation.x = t * 0.12 + pointer.y * 0.3;
      icoRef.current.rotation.y = -t * 0.15 + pointer.x * 0.3;
      icoRef.current.position.x = pointer.x * 0.4;
      icoRef.current.position.y = pointer.y * 0.3;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#cfd3da" />
      <directionalLight position={[-3, 2, -2]} intensity={0.4} color="#8a8f9a" />
      <pointLight position={[0, 3, 3]} intensity={0.9} color="#aab0bc" />
      <pointLight position={[-3, -2, 2]} intensity={0.5} color="#6b707a" />

      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.5}>
        <mesh ref={meshRef}>
          <torusGeometry args={[1.4, 0.5, 64, 128]} />
          <meshPhysicalMaterial
            color="#1a1b1e"
            transmission={0.95}
            thickness={1.4}
            roughness={0.06}
            metalness={0.05}
            ior={1.6}
            iridescence={0.15}
            iridescenceIOR={1.2}
            envMapIntensity={1.4}
            clearcoat={1}
            clearcoatRoughness={0.1}
            transparent
            opacity={0.92}
            side={THREE.DoubleSide}
          />
        </mesh>
      </Float>

      <Float speed={2.2} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh ref={icoRef} position={[2.4, 1.2, -1.5]} scale={0.45}>
          <icosahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial
            color="#101113"
            transmission={0.85}
            thickness={0.8}
            roughness={0.12}
            metalness={0.2}
            ior={1.5}
            iridescence={0.2}
            iridescenceIOR={1.3}
            clearcoat={1}
            clearcoatRoughness={0.18}
            transparent
            opacity={0.88}
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
