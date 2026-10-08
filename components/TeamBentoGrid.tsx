'use client';

import { useRef } from 'react';
import Image from 'next/image';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from 'framer-motion';
import { Mail } from 'lucide-react';

const TOKENS = {
  base: '#0A0A0A',
  panel: '#101012',
  hairline: '#1F1F1F',
  ink: '#F2F1ED',
  inkMuted: '#8C8C87',
  accent: '#7C8CFF',
} as const;

const SPRING = { stiffness: 100, damping: 20, mass: 0.5 };

type TeamMember = {
  name: string;
  role: string;
  focus: string;
  motto: string;
  email: string;
  image?: string;
  span: 'lead' | 'support';
};

const TEAM: TeamMember[] = [
  {
    name: 'Awasar Gurung',
    role: 'Systems Architect',
    focus: 'Deep tech, performance tuning, system logic.',
    motto: "If the code isn't efficient, it's broken.",
    email: 'awasar.gurung@example.com',
    span: 'lead',
  },
  {
    name: 'Ian Gurung',
    role: 'Frontend & Product Designer',
    focus: 'Modern UI/UX, responsive interfaces, user retention.',
    motto: 'Great design makes complex logic look effortless.',
    email: 'dihhbahadur@gmail.com',
    image: '/Ian.png',
    span: 'support',
  },
  {
    name: 'DhanRaj Gurung',
    role: 'DevOps & Operations',
    focus: 'CI/CD pipelines, infrastructure, delivery timelines.',
    motto: 'Zero downtime. Zero excuses.',
    email: 'gurungdhanraj470@gmail.com',
    image: '/DhanRaj.jpeg',
    span: 'support',
  },
];

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

function TiltCard({ member, className }: { member: TeamMember; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const springRotateX = useSpring(rotateX, SPRING);
  const springRotateY = useSpring(rotateY, SPRING);

  const contentX = useTransform(springRotateY, [-8, 8], [-6, 6]);
  const contentY = useTransform(springRotateX, [-8, 8], [6, -6]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    rotateY.set((px - 0.5) * 16);
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

  const isLead = member.span === 'lead';

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
      data-cursor="view"
      className={`group relative overflow-hidden rounded-2xl border ${className ?? ''}`}
    >
      {/* Ambient Cursor Glow */}
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

      {/* Surface Grain */}
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
        className="relative z-10 flex h-full flex-col justify-between p-6"
      >
        {/* Top Row: Role Badge + Portrait Avatar */}
        <div className="flex items-start justify-between gap-4">
          <motion.div
            initial={{ y: 12, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            className="inline-flex w-fit items-center rounded-full px-3 py-1 text-xs"
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

          {/* Photo Avatar Frame */}
          {member.image ? (
            <div className={`relative overflow-hidden rounded-full border border-white/20 shadow-xl ${isLead ? 'h-24 w-24' : 'h-20 w-20'}`}>
              <Image
                src={member.image}
                alt={member.name}
                fill
                priority
                className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ) : (
            <div className={`flex items-center justify-center rounded-full border border-white/10 bg-white/5 font-mono text-xs text-zinc-500 ${isLead ? 'h-24 w-24' : 'h-20 w-20'}`}>
              N/A
            </div>
          )}
        </div>

        {/* Bottom Section: Details */}
        <div>
          <p className="text-xl font-medium tracking-tight" style={{ color: TOKENS.ink }}>
            {member.name}
          </p>
          <p className="mt-0.5 text-xs font-mono" style={{ color: TOKENS.accent }}>
            {member.focus}
          </p>
          <p className="mt-2 text-sm italic" style={{ color: TOKENS.inkMuted }}>
            "{member.motto}"
          </p>

          <a
            href={`mailto:${member.email}`}
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.stopPropagation()}
            className="mt-4 inline-flex w-fit items-center gap-1.5 text-xs transition-colors duration-200"
            style={{ color: TOKENS.inkMuted }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.currentTarget.style.color = TOKENS.accent;
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.currentTarget.style.color = TOKENS.inkMuted;
            }}
          >
            <Mail size={13} strokeWidth={2} />
            {member.email}
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

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
          <SectionHeading text="The Team (AID)" />
          <p className="max-w-xs text-sm" style={{ color: TOKENS.inkMuted }}>
            Three Computer Systems Engineers from ISMT College. Equal commitment, equal workload, zero fluff.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:grid-rows-2 md:[&>*:first-child]:row-span-2">
          <TiltCard member={lead} className="h-[420px] md:h-full" />
          {support.map((member) => (
            <TiltCard key={member.name} member={member} className="h-[220px] md:h-full" />
          ))}
        </div>
      </div>
    </section>
  );
}