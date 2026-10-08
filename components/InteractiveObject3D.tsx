"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Float, Center, Bounds } from "@react-three/drei";
import * as THREE from "three";

function Model() {
  const meshRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/3d_Gun.glb");

  useFrame((state) => {
    if (!meshRef.current) return;
    const { x, y } = state.pointer;
    
    // Increased rotation sensitivity (3.5x multiplier) and faster interpolation (0.08)
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, x * 3.5, 0.08);
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -y * 3.5, 0.08);
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      <group ref={meshRef}>
        <Center>
          <primitive object={scene} />
        </Center>
      </group>
    </Float>
  );
}

export default function InteractiveObject3D() {
  return (
    <div className="w-full h-[500px] relative rounded-2xl bg-[#101012] border border-[#7C8CFF]/20 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#7C8CFF" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#ffffff" />
        
        <Suspense fallback={null}>
          {/* Lower margin value zooms the model in closer */}
          <Bounds fit clip observe margin={0.7}>
            <Model />
          </Bounds>
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/3d_Gun.glb");