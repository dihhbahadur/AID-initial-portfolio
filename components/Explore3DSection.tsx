"use client";

import dynamic from "next/dynamic";

const InteractiveObject3D = dynamic(() => import("./InteractiveObject3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] rounded-2xl bg-[#101012] border border-[#7C8CFF]/20 flex items-center justify-center text-zinc-500 font-mono text-sm">
      Loading 3D Model...
    </div>
  ),
});

export default function Explore3DSection() {
  return (
    <section id="explore" className="py-24 px-6 max-w-7xl mx-auto text-center">
      <span className="text-[#7C8CFF] text-xs uppercase tracking-widest font-mono">EXPLORE</span>
      <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">Move your cursor</h2>
      <p className="text-zinc-400 mb-10">A living piece of the studio — drag your cursor across it.</p>
      
      <InteractiveObject3D />
    </section>
  );
}