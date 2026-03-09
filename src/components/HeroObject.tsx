import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

function GlassSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const { pointer } = useThree();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(t * 0.6) * 0.15;
      meshRef.current.rotation.y = t * 0.12;
      meshRef.current.rotation.x = pointer.y * 0.25;
      meshRef.current.rotation.z = pointer.x * 0.15;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.08;
      innerRef.current.rotation.x = t * 0.05;
    }
    if (lightRef.current) {
      lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, pointer.x * 4, 0.05);
      lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, pointer.y * 3, 0.05);
    }
  });

  return (
    <>
      <pointLight ref={lightRef} position={[0, 0, 4]} intensity={0.6} color="#c0b8a8" />
      <Float speed={1} rotationIntensity={0.15} floatIntensity={0.4}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.6, 1]} />
          <MeshTransmissionMaterial
            backside
            samples={6}
            thickness={0.5}
            chromaticAberration={0.1}
            anisotropy={0.15}
            distortion={0.2}
            distortionScale={0.25}
            temporalDistortion={0.08}
            roughness={0.3}
            color="#b0a898"
            transmission={0.96}
            ior={1.5}
          />
        </mesh>
        <mesh ref={innerRef}>
          <icosahedronGeometry args={[1.15, 1]} />
          <meshBasicMaterial color="#9a9080" wireframe transparent opacity={0.12} />
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
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#d0c8b8" />
      <GlassSphere />
    </Canvas>
  </div>
);

export default HeroObject;
