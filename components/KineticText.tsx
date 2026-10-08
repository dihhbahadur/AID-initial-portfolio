"use client";

import React from "react";
import { motion, type Transition } from "framer-motion";

const SPRING_TRANSITION: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 14,
  mass: 0.4,
};

interface KineticTextProps {
  text: string;
  className?: string;
}

export default function KineticText({ text, className = "" }: KineticTextProps) {
  const letters = Array.from(text);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.025,
      },
    },
  };

  const letterVariants = {
    hidden: {
      y: "100%",
      opacity: 0,
      rotateX: -80,
    },
    visible: {
      y: "0%",
      opacity: 1,
      rotateX: 0,
      transition: SPRING_TRANSITION,
    },
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap overflow-hidden perspective-1000 ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          variants={letterVariants}
          className="inline-block transform-gpuWill-change-transform"
          style={{ transformOrigin: "bottom center" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
}