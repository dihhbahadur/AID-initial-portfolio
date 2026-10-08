"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

type TrailPoint = {
  x: number;
  y: number;
  life: number; // 1 = fresh, fades to 0
};

const TRAIL_MAX_LIFE = 26; // frames a point survives
const TRAIL_MAX_POINTS = 40; // safety cap

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useSpring(0, { stiffness: 400, damping: 28 });
  const mouseY = useSpring(0, { stiffness: 400, damping: 28 });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailRef = useRef<TrailPoint[]>([]);
  const rawPos = useRef({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      canvas!.width = window.innerWidth * window.devicePixelRatio;
      canvas!.height = window.innerHeight * window.devicePixelRatio;
      canvas!.style.width = `${window.innerWidth}px`;
      canvas!.style.height = `${window.innerHeight}px`;
      ctx!.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      rawPos.current = { x: e.clientX, y: e.clientY };

      // distance moved since last frame drives how much trail to lay down —
      // fast drags leave a longer, denser streak
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const dist = Math.hypot(dx, dy);
      const steps = Math.min(Math.max(Math.floor(dist / 6), 1), 6);

      for (let i = 0; i < steps; i++) {
        const t = (i + 1) / steps;
        trailRef.current.push({
          x: lastPos.current.x + dx * t,
          y: lastPos.current.y + dy * t,
          life: 1,
        });
      }
      if (trailRef.current.length > TRAIL_MAX_POINTS) {
        trailRef.current.splice(0, trailRef.current.length - TRAIL_MAX_POINTS);
      }
      lastPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") ||
          target.closest("a") ||
          target.getAttribute("role") === "button")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      trailRef.current.forEach((point) => {
        const alpha = point.life / TRAIL_MAX_LIFE;
        const radius = 1 + alpha * 5;
        ctx!.beginPath();
        ctx!.arc(point.x, point.y, radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(124, 140, 255, ${alpha * 0.5})`;
        ctx!.fill();
        point.life -= 1;
      });

      trailRef.current = trailRef.current.filter((p) => p.life > 0);
      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 hidden overflow-hidden sm:block">
      {/* Trail canvas — fading comet effect while dragging */}
      <canvas ref={canvasRef} className="fixed inset-0" />

      {/* Dynamic Cursor Ring */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          scale: isHovered ? 2.2 : 1,
          borderColor: isHovered ? "rgba(124, 140, 255, 0.8)" : "rgba(242, 241, 237, 0.25)",
          backgroundColor: isHovered ? "rgba(124, 140, 255, 0.15)" : "transparent",
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="fixed -left-3 -top-3 h-6 w-6 rounded-full border border-white/30 backdrop-blur-[1px]"
      />
      {/* Center Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          scale: isHovered ? 0 : 1,
        }}
        className="fixed -left-1 -top-1 h-2 w-2 rounded-full bg-[#7C8CFF]"
      />
    </div>
  );
}