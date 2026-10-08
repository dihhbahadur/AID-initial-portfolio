'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import ScrollDown from './ScrollDown';

// Custom Design Tokens
const TOKENS = {
  base: '#0A0A0A',
  panel: '#101012',
  hairline: '#1F1F1F',
  ink: '#F2F1ED',
  inkMuted: '#8C8C87',
  accent: '#7C8CFF', // Customize your brand glow color here
} as const;

const NAV_LINKS = ['Works', 'Services', 'About', 'Team'] as const;

const WORLD_CLOCKS: { city: string; tz: string }[] = [
  { city: 'London', tz: 'Europe/London' },
  { city: 'New York', tz: 'America/New_York' },
  { city: 'Tokyo', tz: 'Asia/Tokyo' },
];

// Personal Branding Configuration
const YOUR_NAME = "AID Studio";
const HEADLINE = 'We Build Fast, Clean, Unbreakable Software.';
const SUBTITLE = 'No fluff. No bloated code. Just young engineers building high-performance web applications and digital systems.';

const BADGES = [
  'Available for Projects',
  'Software Engineering',
  'ISMT Engineers',
];

function WorldClocks() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="hidden items-center gap-5 lg:flex">
      {WORLD_CLOCKS.map(({ city, tz }) => (
        <div key={city} className="flex items-baseline gap-1.5 text-xs">
          <span style={{ color: TOKENS.inkMuted }}>{city}</span>
          <span
            className="font-medium tabular-nums"
            style={{ color: TOKENS.ink }}
            suppressHydrationWarning
          >
            {now
              ? new Intl.DateTimeFormat('en-GB', {
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZone: tz,
                }).format(now)
              : '--:--'}
          </span>
        </div>
      ))}
    </div>
  );
}

function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 240, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 240, damping: 18, mass: 0.4 });

  function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * 0.35);
    y.set(relY * 0.35);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY, backgroundColor: TOKENS.accent }}
      className="group relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-[#0A0A0A] transition-shadow duration-300 hover:shadow-[0_0_28px_-4px_rgba(124,140,255,0.65)]"
    >
      {children}
      <ArrowUpRight
        size={15}
        strokeWidth={2.25}
        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </motion.button>
  );
}

function AmbientGlow() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 60, damping: 20, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 60, damping: 20, mass: 0.6 });

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
    }
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [x, y]);

  const translateX = useTransform(springX, (v) => v - 320);
  const translateY = useTransform(springY, (v) => v - 320);

  return (
    <motion.div
      aria-hidden
      style={{ x: translateX, y: translateY }}
      className="pointer-events-none absolute left-0 top-0 h-[640px] w-[640px] rounded-full opacity-[0.18] blur-[110px]"
    >
      <div
        className="h-full w-full rounded-full"
        style={{
          background: `radial-gradient(circle, ${TOKENS.accent} 0%, transparent 70%)`,
        }}
      />
    </motion.div>
  );
}

const wordContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

const wordUp: Variants = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

function KineticHeadline() {
  const words = HEADLINE.split(' ');
  return (
    <motion.h1
      variants={wordContainer}
      initial="hidden"
      animate="visible"
      className="max-w-4xl text-[12vw] font-medium leading-[0.98] tracking-tight sm:text-[7vw] lg:text-[5vw]"
      style={{ color: TOKENS.ink }}
    >
      {words.map((word, i) => (
        <span key={i} className="mr-[0.28em] inline-block overflow-hidden align-top">
          <motion.span variants={wordUp} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 12);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-500"
      style={{
        backgroundColor: scrolled ? 'rgba(10,10,10,0.72)' : 'transparent',
        borderBottom: scrolled ? `1px solid ${TOKENS.hairline}` : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
      }}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 lg:px-10">
        {/* Local Anchor Link (Prevents opening external websites) */}
        <a href="#hero" className="text-sm font-semibold tracking-tight" style={{ color: TOKENS.ink }}>
          {YOUR_NAME}
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm transition-colors duration-200"
              style={{ color: TOKENS.inkMuted }}
              onMouseEnter={(e) => (e.currentTarget.style.color = TOKENS.ink)}
              onMouseLeave={(e) => (e.currentTarget.style.color = TOKENS.inkMuted)}
            >
              {link}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <WorldClocks />
          <MagneticButton>Launch Your Project</MagneticButton>
        </div>
      </div>
    </header>
  );
}

function SocialProofBadges() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-wrap items-center gap-3"
    >
      {BADGES.map((label) => (
        <div
          key={label}
          className="rounded-full px-4 py-2 text-xs"
          style={{
            border: '1px solid rgba(255,255,255,0.1)',
            backgroundColor: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            color: TOKENS.inkMuted,
          }}
        >
          {label}
        </div>
      ))}
    </motion.div>
  );
}

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-between overflow-hidden"
      style={{ backgroundColor: TOKENS.base }}
    >
      <AmbientGlow />
      <Header />

      {/* Hero Content Area */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-6 pt-28 lg:px-10">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mb-6 text-sm tracking-wide uppercase"
          style={{ color: TOKENS.inkMuted }}
        >
          {YOUR_NAME} — Portfolio
        </motion.p>

        <KineticHeadline />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-md text-base leading-relaxed"
          style={{ color: TOKENS.inkMuted }}
        >
          {SUBTITLE}
        </motion.p>

        <div className="mt-10">
          <SocialProofBadges />
        </div>
      </div>

      {/* Animated Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex justify-center pb-8 pt-4"
      >
        <ScrollDown targetId="services" />
      </motion.div>
    </section>
  );
}