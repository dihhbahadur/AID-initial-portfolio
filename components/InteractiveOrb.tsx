"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Environment } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

function DistortedOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!meshRef.current) return;
    const { pointer } = state;
    targetRotation.current.x += (pointer.y * 0.4 - targetRotation.current.x) * 0.03;
    targetRotation.current.y += (pointer.x * 0.4 - targetRotation.current.y) * 0.03;
    meshRef.current.rotation.x = targetRotation.current.x;
    meshRef.current.rotation.y += 0.0025 + targetRotation.current.y * 0.002;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.9}>
      <mesh ref={meshRef} scale={2.1}>
        <icosahedronGeometry args={[1, 8]} />
        <MeshDistortMaterial
          color="#7C8CFF"
          emissive="#3A3FCC"
          emissiveIntensity={0.35}
          roughness={0.15}
          metalness={0.6}
          distort={0.35}
          speed={1.8}
        />
      </mesh>
    </Float>
  );
}

function Rig() {
  useFrame((state) => {
    state.camera.position.lerp(
      new THREE.Vector3(state.pointer.x * 0.6, state.pointer.y * 0.3, 5.5),
      0.04
    );
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function InteractiveOrb() {
  return (
    <section className="relative w-full py-32 px-6 md:px-16">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-[#7C8CFF] text-sm tracking-[0.3em] uppercase mb-4 text-center"
      >
        Explore
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl md:text-5xl font-medium text-white text-center mb-4"
      >
        Move your cursor
      </motion.h2>
      <p className="text-white/50 text-center max-w-md mx-auto mb-12">
        A living piece of the studio — drag your cursor across it.
      </p>

      <div className="relative w-full h-[420px] md:h-[560px] rounded-2xl border border-white/10 bg-[#101012] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,140,255,0.12),transparent_70%)]" />
        <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }} dpr={[1, 2]}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <pointLight position={[4, 4, 4]} intensity={1.2} color="#7C8CFF" />
            <pointLight position={[-4, -2, -3]} intensity={0.6} color="#ffffff" />
            <DistortedOrb />
            <Rig />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
}