import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

function GlassSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    meshRef.current.rotation.x = pointer.y * 0.3;
    meshRef.current.rotation.z = pointer.x * 0.2;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.6, 1]} />
        <MeshTransmissionMaterial
          backside
          samples={6}
          thickness={0.4}
          chromaticAberration={0.15}
          anisotropy={0.2}
          distortion={0.3}
          distortionScale={0.3}
          temporalDistortion={0.1}
          roughness={0.25}
          color="#8a8a8a"
          transmission={0.95}
          ior={1.5}
        />
      </mesh>
      {/* Inner wireframe */}
      <mesh>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial
          color="#555555"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
    </Float>
  );
}

const HeroObject = () => {
  return (
    <div className="w-full h-[400px] md:h-[500px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} color="#c0c0c0" />
        <pointLight position={[-5, -5, -5]} intensity={0.2} color="#8a8a8a" />
        <GlassSphere />
      </Canvas>
    </div>
  );
};

export default HeroObject;
