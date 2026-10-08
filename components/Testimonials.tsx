"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

const SPRING_CONFIG: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 0.5,
};

const TESTIMONIALS = [
  {
    id: "01",
    quote:
      "They delivered a WebGL experience that completely transformed how our users interact with our brand. The attention to detail and smooth micro-interactions set a new standard for our team.",
    author: "Elena Rostova",
    role: "VP of Product",
    company: "Aura Labs",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "02",
    quote:
      "Working with this studio felt like partnering with world-class engineers who also happen to be visionary designers. The Framer Motion integration was flawless.",
    author: "Marcus Chen",
    role: "Co-Founder & CEO",
    company: "Nova Fintech",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "03",
    quote:
      "The dynamic canvas performance and custom shaders surpassed every expectation. They took our static brand identity and brought it to life through kinetic typography.",
    author: "Sarah Jenkins",
    role: "Creative Director",
    company: "Lumina Studio",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="relative w-full bg-[#0A0A0A] px-4 py-32 text-[#F2F1ED] sm:px-6 lg:px-8" id="testimonials">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3 text-[#7C8CFF]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7C8CFF] opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#7C8CFF]"></span>
              </span>
              <span className="text-sm font-mono tracking-widest uppercase">Endorsements</span>
            </div>
            <h2 className="text-5xl font-medium tracking-tighter text-[#F2F1ED] sm:text-6xl">
              Client Voices
            </h2>
          </div>

          {/* Carousel Navigation Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              aria-label="Previous Testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#1F1F1F] bg-[#101012] text-[#F2F1ED] transition-colors hover:border-[#7C8CFF]/50 hover:bg-[#7C8CFF] hover:text-[#0A0A0A]"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#1F1F1F] bg-[#101012] text-[#F2F1ED] transition-colors hover:border-[#7C8CFF]/50 hover:bg-[#7C8CFF] hover:text-[#0A0A0A]"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Testimonial Card Display */}
        <div className="relative min-h-[380px] w-full rounded-[2.5rem] border border-[#1F1F1F] bg-[#101012] p-8 sm:p-12 lg:p-16">
          <Quote className="absolute right-8 top-8 h-20 w-20 text-[#1F1F1F]/40 sm:right-12 sm:top-12 sm:h-32 sm:w-32" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={SPRING_CONFIG}
              className="relative z-10 flex h-full flex-col justify-between gap-8"
            >
              <p className="max-w-4xl text-2xl font-normal leading-relaxed text-[#F2F1ED] sm:text-3xl lg:text-4xl">
                "{current.quote}"
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={current.avatar}
                  alt={current.author}
                  className="h-14 w-14 rounded-full border border-[#1F1F1F] object-cover"
                />
                <div>
                  <h4 className="text-lg font-medium text-[#F2F1ED]">{current.author}</h4>
                  <p className="text-sm text-[#8C8C87]">
                    {current.role} — <span className="text-[#7C8CFF]">{current.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}