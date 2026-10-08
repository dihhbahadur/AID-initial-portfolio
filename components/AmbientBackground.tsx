"use client";

import React, { useEffect, useRef } from "react";

export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Glowing orbs parameters
    let time = 0;

    const render = () => {
      time += 0.005;
      ctx.clearRect(0, 0, width, height);

      // Orb 1 (Accent Violet)
      const x1 = width * 0.3 + Math.sin(time) * 150;
      const y1 = height * 0.4 + Math.cos(time * 0.8) * 100;
      const grad1 = ctx.createRadialGradient(x1, y1, 0, x1, y1, width * 0.4);
      grad1.addColorStop(0, "rgba(124, 140, 255, 0.08)");
      grad1.addColorStop(1, "rgba(10, 10, 10, 0)");

      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      // Orb 2 (Deep Indigo)
      const x2 = width * 0.7 + Math.cos(time * 0.6) * 180;
      const y2 = height * 0.6 + Math.sin(time * 0.9) * 120;
      const grad2 = ctx.createRadialGradient(x2, y2, 0, x2, y2, width * 0.5);
      grad2.addColorStop(0, "rgba(90, 100, 220, 0.05)");
      grad2.addColorStop(1, "rgba(10, 10, 10, 0)");

      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-70 transform-gpu"
    />
  );
}