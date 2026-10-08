"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen px-6 md:px-16 py-32 flex items-center"
    >
      <div className="max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[#7C8CFF] text-sm tracking-[0.3em] uppercase mb-6"
        >
          About
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-6xl font-medium text-white leading-tight mb-8"
        >
          We build digital work that feels
          <span className="text-[#7C8CFF]"> deliberate.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg text-white/60 leading-relaxed max-w-2xl"
        >
          Led by Ian Gurung, our studio partners with founders and brands to
          design and build products that hold up under real use — not just
          in a portfolio shot. We work in small, senior teams across
          strategy, design, and engineering, and we stay in the details from
          first sketch to shipped code.
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-8 border-t border-white/10">
          {[
            { label: "Founded", value: "2021" },
            { label: "Projects", value: "40+" },
            { label: "Team", value: "3" },
            { label: "Based in", value: "Kathmandu" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl md:text-3xl text-white font-medium">
                {stat.value}
              </p>
              <p className="text-sm text-white/40 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}