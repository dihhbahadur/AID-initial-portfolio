"use client";

import React, { useState } from "react";
import { motion, type Transition } from "framer-motion";
import { Copy, Check, ArrowUpRight, Globe, Share2, Compass, MessageSquare } from "lucide-react";

const SPRING_CONFIG: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 0.5,
};

// Generic icons used as placeholders for social platforms
const SOCIALS = [
  { name: "GitHub", href: "https://github.com", icon: Globe },
  { name: "Twitter / X", href: "https://twitter.com", icon: Share2 },
  { name: "LinkedIn", href: "https://linkedin.com", icon: MessageSquare },
  { name: "Dribbble", href: "https://dribbble.com", icon: Compass },
];

export default function FooterCTA() {
  const [copied, setCopied] = useState(false);
  const email = "hello@studio.design";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full border-t border-[#1F1F1F] bg-[#0A0A0A] px-4 pt-32 pb-12 text-[#F2F1ED] sm:px-6 lg:px-8" id="contact">
      <div className="mx-auto max-w-7xl">
        {/* Main CTA Container */}
        <div className="relative overflow-hidden rounded-[2.5rem] border border-[#1F1F1F] bg-[#101012] p-8 sm:p-16 lg:p-20">
          {/* Background Ambient Glow */}
          <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#7C8CFF]/10 blur-[120px]" />

          <div className="relative z-10 flex flex-col items-start justify-between gap-12 lg:flex-row lg:items-end">
            <div className="flex max-w-2xl flex-col gap-6">
              <div className="flex items-center gap-3 text-[#7C8CFF]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7C8CFF] opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#7C8CFF]"></span>
                </span>
                <span className="text-sm font-mono tracking-widest uppercase">Start a Conversation</span>
              </div>

              <h2 className="text-5xl font-medium tracking-tighter text-[#F2F1ED] sm:text-6xl lg:text-7xl">
                Have a project in mind? Let's talk.
              </h2>

              <p className="text-base leading-relaxed text-[#8C8C87] sm:text-lg">
                We collaborate with ambitious brands and forward-thinking teams to build remarkable digital experiences.
              </p>
            </div>

            {/* Email Copy Box */}
            <div className="flex w-full flex-col gap-4 sm:w-auto">
              <button
                onClick={handleCopyEmail}
                className="group relative flex items-center justify-between gap-6 rounded-2xl border border-[#1F1F1F] bg-[#0A0A0A] p-4 text-left transition-all duration-300 hover:border-[#7C8CFF]/50"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-mono text-[#8C8C87] uppercase">Direct Email</span>
                  <span className="text-lg font-medium text-[#F2F1ED] sm:text-xl">{email}</span>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#1F1F1F] bg-[#101012] text-[#F2F1ED] transition-colors group-hover:bg-[#7C8CFF] group-hover:text-[#0A0A0A]">
                  {copied ? <Check className="h-5 w-5 text-emerald-400 group-hover:text-[#0A0A0A]" /> : <Copy className="h-5 w-5" />}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Links & Sub-Footer */}
        <div className="mt-20 flex flex-col justify-between gap-12 border-t border-[#1F1F1F] pt-12 md:flex-row md:items-center">
          {/* Social Links */}
          <div className="flex flex-wrap items-center gap-6">
            {SOCIALS.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-sm text-[#8C8C87] transition-colors hover:text-[#F2F1ED]"
                >
                  <Icon className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                  <span>{social.name}</span>
                </a>
              );
            })}
          </div>

          {/* Copyright & Scroll to Top */}
          <div className="flex items-center justify-between gap-8 md:justify-end">
            <span className="text-xs font-mono text-[#8C8C87]">
              © {new Date().getFullYear()} Studio. All rights reserved.
            </span>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-xs font-mono text-[#8C8C87] transition-colors hover:text-[#7C8CFF]"
            >
              <span>Back to top</span>
              <ArrowUpRight className="h-3.5 w-3.5 -rotate-45" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}