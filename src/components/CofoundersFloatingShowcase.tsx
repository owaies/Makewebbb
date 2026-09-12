import { useState, MouseEvent } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useMotionTemplate } from 'motion/react';
import { ArrowUpRight, Mail, Phone, Github, Linkedin, Sparkles, Check } from 'lucide-react';
import { teamMembers } from '../data';
import { TeamMember } from '../types';
import { Reveal } from './Reveal';

interface FounderCardProps {
  member: TeamMember;
  index: number;
}

function FounderFloatingCard({ member, index }: FounderCardProps) {
  const [imageError, setImageError] = useState(false);
  const [copied, setCopied] = useState(false);

  // Mouse tilt tracking
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const glareOpacity = useMotionValue(0);

  const springConfig = { stiffness: 160, damping: 20, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [0, 1], [14, -14]), springConfig);
  const rotateY = useSpring(useTransform(x, [0, 1], [-14, 14]), springConfig);

  const glareX = useTransform(x, (val) => `${val * 100}%`);
  const glareY = useTransform(y, (val) => `${val * 100}%`);
  const backgroundGlare = useMotionTemplate`radial-gradient(380px circle at ${glareX} ${glareY}, oklch(1 0 0 / 0.22), transparent 65%)`;

  const isEven = index % 2 === 0;

  const handleCopyEmail = (e: MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(member.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="perspective-far w-full">
      {/* Continuous ambient float */}
      <motion.div
        animate={{
          y: isEven ? [0, -14, 0] : [0, -16, 0],
          rotateZ: isEven ? [-0.7, 0.7, -0.7] : [0.7, -0.7, 0.7],
        }}
        transition={{
          duration: 6 + index * 0.8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.9,
        }}
        className="w-full"
      >
        <motion.div
          onPointerMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            x.set((e.clientX - rect.left) / rect.width);
            y.set((e.clientY - rect.top) / rect.height);
            glareOpacity.set(1);
          }}
          onPointerLeave={() => {
            x.set(0.5);
            y.set(0.5);
            glareOpacity.set(0);
          }}
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 240, damping: 22 }}
          className="glass relative overflow-hidden rounded-3xl border border-white/10 p-6 md:p-8 shadow-2xl backdrop-blur-xl group"
        >
          {/* Subtle colored backlight matching founder gradient */}
          <div
            className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full opacity-30 blur-3xl transition-opacity duration-500 group-hover:opacity-50"
            style={{ background: member.gradient }}
          />

          {/* Glare specular overlay */}
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-30"
            style={{
              background: backgroundGlare,
              opacity: glareOpacity,
            }}
          />

          {/* Top Status Bar with 3D offset */}
          <div
            className="flex items-center justify-between gap-2"
            style={{ transform: 'translateZ(20px)' }}
          >
            <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium tracking-wide text-foreground/90">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>CO-FOUNDER</span>
            </span>
            <span className="rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-[10px] font-mono tracking-widest text-primary uppercase">
              {member.focus}
            </span>
          </div>

          {/* Portrait Image Container with multi-layered depth */}
          <div
            className="relative mt-6 overflow-hidden rounded-2xl border border-white/10"
            style={{
              transform: 'translateZ(30px)',
              background: member.gradient,
            }}
          >
            {!imageError ? (
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-black/40">
                <img
                  src={member.image}
                  alt={member.name}
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Gradient bottom fade for seamless text integration */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              </div>
            ) : (
              <div className="flex h-72 sm:h-80 w-full items-center justify-center">
                <span className="font-display text-6xl font-semibold tracking-tight text-white/90">
                  {member.initials}
                </span>
              </div>
            )}

            {/* Quick badge on image */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <span className="glass rounded-lg px-2.5 py-1 text-[11px] font-medium text-foreground/90 backdrop-blur-md">
                {member.role}
              </span>
            </div>
          </div>

          {/* Info Block with 3D depth */}
          <div className="mt-6" style={{ transform: 'translateZ(25px)' }}>
            <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
              {member.name}
            </h3>
            <p className="mt-2 text-xs md:text-sm text-muted-foreground leading-relaxed">
              {member.bio}
            </p>
          </div>

          {/* Contact & Social Links Bar */}
          <div
            className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3"
            style={{ transform: 'translateZ(20px)' }}
          >
            <div className="flex items-center gap-2">
              <a
                href={`mailto:${member.email}`}
                title={`Email ${member.name}`}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-muted-foreground hover:text-foreground hover:bg-white/10 hover:border-primary/40 border border-transparent transition-all"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href={`tel:${member.phone}`}
                title={`Call ${member.phone}`}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-muted-foreground hover:text-foreground hover:bg-white/10 hover:border-primary/40 border border-transparent transition-all"
              >
                <Phone className="h-4 w-4" />
              </a>
              <a
                href={member.github}
                target="_blank"
                rel="noreferrer"
                title="GitHub profile"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-muted-foreground hover:text-foreground hover:bg-white/10 hover:border-primary/40 border border-transparent transition-all"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noreferrer"
                title="LinkedIn profile"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-muted-foreground hover:text-foreground hover:bg-white/10 hover:border-primary/40 border border-transparent transition-all"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>

            <a
              href={member.portfolio}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background transition-transform hover:scale-105"
            >
              <span>Portfolio</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Interactive email copy shortcut */}
          <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground/75 px-1">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="hover:text-foreground underline underline-offset-2 transition-colors flex items-center gap-1"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-emerald-400" />
                  <span className="text-emerald-400">Copied {member.email}</span>
                </>
              ) : (
                <span>Copy {member.email}</span>
              )}
            </button>
            <span className="font-mono text-[10px]">{member.phone}</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function CofoundersFloatingShowcase() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 py-28 md:px-10 overflow-hidden">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-40">
        <div className="h-[450px] w-[650px] rounded-full bg-gradient-to-r from-violet-deep via-primary/20 to-accent blur-[120px]" />
      </div>

      <Reveal className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-medium text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Leadership &amp; Engineering</span>
        </div>
        <h2 className="text-big mt-4">Built by co-founders, shipped without layers</h2>
        <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
          Zero middle managers, zero handoffs. When you partner with MakeWebb, you work directly with the two engineers designing your product, training your models, and deploying your code.
        </p>
      </Reveal>

      {/* Floating 3D Cards Grid */}
      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:gap-10">
        {teamMembers.map((member, idx) => (
          <Reveal key={member.name} delay={idx * 0.15}>
            <FounderFloatingCard member={member} index={idx} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
