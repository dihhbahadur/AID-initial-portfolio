"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { Plus, Minus, Cpu, Sparkles, Layers, Terminal } from "lucide-react";

const SPRING_CONFIG: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 0.5,
};

const SERVICES = [
  {
    id: "01",
    title: "Creative Engineering",
    icon: Terminal,
    description:
      "Transforming complex visual concepts into pixel-perfect, performant code. We build immersive web apps with custom WebGL shaders, 3D Canvas scenes, and fluid dynamic interactions.",
    capabilities: ["WebGL & Three.js", "GSAP & Framer Motion", "Custom Shaders", "Performance Tuning"],
  },
  {
    id: "02",
    title: "Interactive Product Design",
    icon: Layers,
    description:
      "Crafting intuitive design systems and high-fidelity interfaces that captivate users. Focused on micro-interactions, accessibility, and modern aesthetic precision.",
    capabilities: ["Design Systems", "UI/UX Architecture", "Prototyping", "Micro-Interactions"],
  },
  {
    id: "03",
    title: "AI Integration & Architecture",
    icon: Cpu,
    description:
      "Embedding cutting-edge AI models directly into modern web runtimes. Enabling real-time generative interfaces, smart workflows, and intelligent canvas interactions.",
    capabilities: ["LLM Workflows", "Custom AI Pipelines", "Next.js App Router", "Edge Computing"],
  },
  {
    id: "04",
    title: "Brand Strategy & Motion Design",
    icon: Sparkles,
    description:
      "Elevating modern brands with kinetic visual identities. We define brand guidelines, dynamic typography systems, and motion languages built for digital platforms.",
    capabilities: ["Visual Identity", "Kinetic Typography", "Motion Style Guides", "Creative Direction"],
  },
];

export default function ServicesGrid() {
  const [activeAccordion, setActiveAccordion] = useState<string | null>("01");

  const toggleAccordion = (id: string) => {
    setActiveAccordion((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative w-full bg-[#0A0A0A] px-4 py-32 text-[#F2F1ED] sm:px-6 lg:px-8" id="services">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end md:mb-24">
          <div>
            <div className="mb-4 flex items-center gap-3 text-[#7C8CFF]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7C8CFF] opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#7C8CFF]"></span>
              </span>
              <span className="text-sm font-mono tracking-widest uppercase">Capabilities</span>
            </div>
            <h2 className="text-5xl font-medium tracking-tighter text-[#F2F1ED] sm:text-6xl lg:text-7xl">
              Services & Expertise
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-[#8C8C87]">
            Delivering end-to-end digital craft through dynamic technology and modern design discipline.
          </p>
        </div>

        {/* Services Accordion List */}
        <div className="flex flex-col gap-4">
          {SERVICES.map((service) => {
            const isOpen = activeAccordion === service.id;
            const Icon = service.icon;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={SPRING_CONFIG}
                className={`group relative overflow-hidden rounded-3xl border transition-colors duration-500 ${
                  isOpen
                    ? "border-[#7C8CFF]/40 bg-[#101012]"
                    : "border-[#1F1F1F] bg-[#0A0A0A] hover:border-[#1F1F1F]/80 hover:bg-[#101012]/50"
                }`}
              >
                {/* Header Row */}
                <button
                  onClick={() => toggleAccordion(service.id)}
                  className="flex w-full items-center justify-between p-6 text-left sm:p-8"
                >
                  <div className="flex items-center gap-6">
                    <span className="text-sm font-mono text-[#8C8C87]">{service.id}</span>
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-2xl border transition-colors duration-300 ${
                          isOpen
                            ? "border-[#7C8CFF]/30 bg-[#7C8CFF]/10 text-[#7C8CFF]"
                            : "border-[#1F1F1F] bg-[#101012] text-[#8C8C87]"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-2xl font-normal text-[#F2F1ED] sm:text-3xl">{service.title}</h3>
                    </div>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1F1F1F] bg-[#101012] text-[#8C8C87] transition-all group-hover:text-[#F2F1ED]">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </div>
                </button>

                {/* Expandable Body */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-[#1F1F1F] p-6 sm:p-8">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                          <p className="text-base leading-relaxed text-[#8C8C87] lg:col-span-7">
                            {service.description}
                          </p>

                          <div className="flex flex-col gap-3 lg:col-span-5">
                            <span className="text-xs font-mono text-[#8C8C87] uppercase tracking-wider">
                              Deliverables
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {service.capabilities.map((cap) => (
                                <span
                                  key={cap}
                                  className="rounded-full border border-[#1F1F1F] bg-[#0A0A0A] px-3 py-1.5 text-xs text-[#F2F1ED]"
                                >
                                  {cap}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}