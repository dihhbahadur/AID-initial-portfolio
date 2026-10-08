'use client';

import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from 'framer-motion';

// ---------------------------------------------------------------------------
// Shared tokens — mirrors HeroSection.tsx, now extended per Tweaks_Web.md
// (deep obsidian base, glowing translucent borders, single restrained accent)
// ---------------------------------------------------------------------------
const TOKENS = {
  base: '#0A0A0A',
  panel: '#101012',
  hairline: '#1F1F1F',
  ink: '#F2F1ED',
  inkMuted: '#8C8C87',
  accent: '#7C8CFF',
} as const;

// Spring physics standard per Tweaks_Web.md: stiffness 100 / damping 20
const SPRING = { stiffness: 100, damping: 20, mass: 0.5 };

type TeamMember = {
  name: string;
  role: string;
  image: string; // replace with real asset path, e.g. /images/team/aiden.jpg
  span: 'lead' | 'support';
};

const TEAM: TeamMember[] = [
  {
    name: 'Aiden Cross',
    role: 'Creative Director',
    image: '/images/team/aiden.jpg',
    span: 'lead',
  },
  {
    name: 'Mira Osei',
    role: 'Motion & Interaction',
    image: '/images/team/mira.jpg',
    span: 'support',
  },
  {
    name: 'Théo Lindqvist',
    role: 'Engineering Lead',
    image: '/images/team/theo.jpg',
    span: 'support',
  },
];

// ---------------------------------------------------------------------------
// Kinetic section heading — same staggered word-reveal pattern as the hero
// ---------------------------------------------------------------------------
const wordContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const wordUp: Variants = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

function SectionHeading({ text }: { text: string }) {
  const words = text.split(' ');
  return (
    <motion.h2
      variants={wordContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-15%' }}
      className="max-w-2xl text-[9vw] font-medium leading-[0.98] tracking-tight sm:text-[5vw] lg:text-[3.4vw]"
      style={{ color: TOKENS.ink }}
    >
      {words.map((word, i) => (
        <span key={i} className="mr-[0.28em] inline-block overflow-hidden align-top">
          <motion.span variants={wordUp} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  );
}

// ---------------------------------------------------------------------------
// Tilt card — rotates toward cursor position, clamped to ~8deg, spring-eased
// ---------------------------------------------------------------------------
function TiltCard({ member, className }: { member: TeamMember; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const springRotateX = useSpring(rotateX, SPRING);
  const springRotateY = useSpring(rotateY, SPRING);

  // Subtle counter-parallax on the inner content so it doesn't feel flat
  const contentX = useTransform(springRotateY, [-8, 8], [-6, 6]);
  const contentY = useTransform(springRotateX, [-8, 8], [6, -6]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    rotateY.set((px - 0.5) * 16); // max ~8deg either side
    rotateX.set((0.5 - py) * 16);
    glowX.set(px * 100);
    glowY.set(py * 100);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(50);
    glowY.set(50);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 900,
        borderColor: 'rgba(255,255,255,0.1)',
        backgroundColor: TOKENS.panel,
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative overflow-hidden rounded-2xl border ${className ?? ''}`}
    >
      {/* Cursor-tracking glow, matches ambient hero orb */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) =>
              `radial-gradient(360px circle at ${gx}% ${gy}%, rgba(124,140,255,0.18), transparent 70%)`
          ),
        }}
      />

      {/* Fine grain texture, per glowing-surface guidance */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <motion.div
        style={{ x: contentX, y: contentY }}
        className="relative flex h-full flex-col justify-end p-6"
      >
        {/* Photo placeholder — swap for next/image once assets exist */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background: `linear-gradient(160deg, ${TOKENS.panel} 0%, #16161a 100%)`,
          }}
        />

        {/* Glass overlay panel — rises on hover to reveal role tag */}
        <motion.div
          initial={{ y: 12, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
          className="mb-3 inline-flex w-fit items-center rounded-full px-3 py-1 text-xs"
          style={{
            border: '1px solid rgba(255,255,255,0.1)',
            backgroundColor: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            color: TOKENS.inkMuted,
          }}
        >
          {member.role}
        </motion.div>

        <p className="text-lg font-medium tracking-tight" style={{ color: TOKENS.ink }}>
          {member.name}
        </p>
        <p className="mt-0.5 text-sm" style={{ color: TOKENS.inkMuted }}>
          {member.role}
        </p>
      </motion.div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Root export
// ---------------------------------------------------------------------------
export default function TeamBentoGrid() {
  const lead = TEAM.find((m) => m.span === 'lead')!;
  const support = TEAM.filter((m) => m.span === 'support');

  return (
    <section
      id="team"
      className="relative px-6 py-28 lg:px-10"
      style={{ backgroundColor: TOKENS.base }}
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-14 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <SectionHeading text="Three people, one point of view." />
          <p className="max-w-xs text-sm" style={{ color: TOKENS.inkMuted }}>
            No departments, no hand-offs — every project passes through the
            same three sets of hands.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:grid-rows-2 md:[&>*:first-child]:row-span-2">
          <TiltCard member={lead} className="h-[420px] md:h-full" />
          {support.map((member) => (
            <TiltCard key={member.name} member={member} className="h-[200px] md:h-full" />
          ))}
        </div>
      </div>
    </section>
  );
}