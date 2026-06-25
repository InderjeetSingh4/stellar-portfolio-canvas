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
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={1.4} color="#ffffff" />
      <directionalLight position={[-3, 2, -2]} intensity={0.5} color="#cfd6e4" />
      <pointLight position={[0, 3, 3]} intensity={1.0} color="#dbe2ee" />
      <pointLight position={[-3, -2, 2]} intensity={0.5} color="#aab4c4" />

      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.5}>
        <mesh ref={meshRef}>
          <torusGeometry args={[1.4, 0.5, 64, 128]} />
          <meshPhysicalMaterial
            color="#dfe5ef"
            transmission={0.6}
            thickness={1.2}
            roughness={0.08}
            metalness={0.35}
            ior={1.5}
            iridescence={0.2}
            iridescenceIOR={1.2}
            envMapIntensity={1.2}
            clearcoat={1}
            clearcoatRoughness={0.12}
            transparent
            opacity={0.85}
            side={THREE.DoubleSide}
          />
        </mesh>
      </Float>

      <Float speed={2.2} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh ref={icoRef} position={[2.4, 1.2, -1.5]} scale={0.45}>
          <icosahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial
            color="#c9d2e3"
            transmission={0.5}
            thickness={0.8}
            roughness={0.14}
            metalness={0.45}
            ior={1.5}
            iridescence={0.25}
            iridescenceIOR={1.3}
            clearcoat={1}
            clearcoatRoughness={0.18}
            transparent
            opacity={0.82}
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
