"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, type Transition } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SPRING_CONFIG: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 0.5,
};

const PROJECTS = [
  {
    id: "01",
    title: "Aura E-Commerce",
    category: "Web Application",
    year: "2024",
    image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=2400&auto=format&fit=crop",
    tags: ["Next.js", "WebGL", "Stripe"],
  },
  {
    id: "02",
    title: "Nova Fintech",
    category: "Product Design",
    year: "2023",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2400&auto=format&fit=crop",
    tags: ["React", "Framer Motion", "D3.js"],
  },
  {
    id: "03",
    title: "Lumina Studio",
    category: "Brand Identity",
    year: "2023",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2400&auto=format&fit=crop",
    tags: ["Creative Direction", "GSAP", "Three.js"],
  },
  {
    id: "04",
    title: "Orbit Analytics",
    category: "SaaS Platform",
    year: "2024",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2400&auto=format&fit=crop",
    tags: ["Vue", "Tailwind", "Node.js"],
  },
];

const ProjectCard = ({ project, index }: { project: typeof PROJECTS[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ ...SPRING_CONFIG, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex h-[500px] w-full cursor-pointer flex-col overflow-hidden rounded-[2rem] border border-[#1F1F1F] bg-[#101012] sm:h-[600px]"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(124, 140, 255, 0.1), transparent 40%)`,
        }}
      />

      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="h-full w-full object-cover opacity-50 grayscale-[30%] transition-all duration-700 group-hover:opacity-80 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent opacity-90" />
      </div>

      <div className="relative z-20 flex w-full justify-between p-8">
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-[#1F1F1F] bg-[#0A0A0A]/50 px-4 py-1.5 text-xs font-medium text-[#8C8C87] backdrop-blur-md">
            {project.category}
          </span>
          <span className="text-xs font-medium text-[#8C8C87]">{project.year}</span>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1F1F1F] bg-[#101012]/80 text-[#F2F1ED] backdrop-blur-md transition-all duration-500 group-hover:border-[#7C8CFF]/50 group-hover:bg-[#7C8CFF] group-hover:text-[#0A0A0A]">
          <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      <div className="relative z-20 mt-auto flex flex-col gap-4 p-8">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-[#7C8CFF]">{project.id}</span>
          <h3 className="text-3xl font-normal tracking-tight text-[#F2F1ED] sm:text-4xl">
            {project.title}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#1F1F1F]/50 px-3 py-1 text-xs text-[#8C8C87] backdrop-blur-sm transition-colors duration-300 group-hover:bg-[#1F1F1F] group-hover:text-[#F2F1ED]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function WorksShowcase() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#0A0A0A] px-4 py-32 selection:bg-[#7C8CFF] selection:text-[#0A0A0A] sm:px-6 lg:px-8"
      id="works"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end md:mb-24">
          <motion.div style={{ y: titleY, opacity: titleOpacity }} className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-[#7C8CFF]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7C8CFF] opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#7C8CFF]"></span>
              </span>
              <span className="text-sm font-mono tracking-widest uppercase">Archive</span>
            </div>
            <h2 className="text-5xl font-medium tracking-tighter text-[#F2F1ED] sm:text-6xl lg:text-7xl">
              Selected Works
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={SPRING_CONFIG}
            className="max-w-md text-base leading-relaxed text-[#8C8C87] md:text-right"
          >
            A curated collection of digital products and interactive experiences. 
            Blending form, function, and motion to solve complex problems.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {PROJECTS.map((project, index) => (
            <div
              key={project.id}
              className={cn("w-full", index % 2 !== 0 ? "md:mt-24" : "md:mb-24")}
            >
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...SPRING_CONFIG, delay: 0.4 }}
          className="mt-20 flex justify-center md:mt-32"
        >
          <button className="group relative flex items-center gap-4 rounded-full border border-[#1F1F1F] bg-[#101012] px-8 py-4 text-sm font-medium text-[#F2F1ED] transition-colors hover:border-[#7C8CFF]/50 hover:bg-[#101012]/80">
            <span>View All Archive</span>
            <div className="relative flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-[#1F1F1F] transition-colors group-hover:bg-[#7C8CFF]">
              <ArrowUpRight className="absolute h-3.5 w-3.5 -translate-x-full translate-y-full text-[#0A0A0A] transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0" />
              <ArrowUpRight className="absolute h-3.5 w-3.5 text-[#F2F1ED] transition-transform duration-500 group-hover:translate-x-full group-hover:-translate-y-full" />
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}