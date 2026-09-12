import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { siteConfig, services, projects, tickerItems } from '../data';
import { Reveal } from '../components/Reveal';
import { SplitReveal } from '../components/SplitReveal';
import { TiltCard } from '../components/TiltCard';
import { FloatingStudioLayer } from '../components/FloatingStudioLayer';
import { CofoundersFloatingShowcase } from '../components/CofoundersFloatingShowcase';

export function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -70]);

  // Framer Motion entrance variants for hero
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 22, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <main>
      {/* Hero Section with Framer Motion Entrance Animations */}
      <section ref={heroRef} className="aurora grain relative min-h-[100svh] overflow-hidden">
        {/* Subtle dynamic ambient glow orbs behind hero */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.35, 0.55, 0.35],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-violet-deep/40 blur-[130px]"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1.5,
          }}
          className="pointer-events-none absolute top-1/3 right-10 h-80 w-80 rounded-full bg-primary/25 blur-[120px]"
        />

        <div className="relative mx-auto grid max-w-6xl gap-10 px-5 pt-36 pb-24 md:px-10 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:pt-44">
          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Studio Badge */}
            <motion.div variants={itemVariants} className="flex items-center gap-2">
              <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs tracking-[0.2em] text-foreground/80 uppercase font-medium">
                <Sparkles className="h-3 w-3 text-primary animate-pulse" />
                {siteConfig.name} · Digital Studio
              </span>
            </motion.div>

            {/* Split Reveal Heading */}
            <motion.h1 variants={itemVariants} className="text-huge mt-6">
              <SplitReveal text="Websites that" />
              <span className="block text-foreground/45">
                <SplitReveal text="work harder" />
              </span>
            </motion.h1>

            {/* Description */}
            <motion.div variants={itemVariants} className="mt-8 max-w-md">
              <p className="text-base md:text-lg text-foreground/80 leading-relaxed font-normal">
                {siteConfig.description}
              </p>
            </motion.div>

            {/* CTAs with Spring Physics */}
            <motion.div variants={itemVariants} className="mt-9 flex flex-wrap gap-3">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background shadow-lg transition-colors hover:bg-white"
                >
                  Start a project
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/work"
                  className="glass inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-foreground hover:bg-white/10 transition-colors"
                >
                  See our work
                </Link>
              </motion.div>
            </motion.div>

            {/* Live Stats Capsule */}
            <motion.div variants={itemVariants} className="mt-10">
              <div className="glass inline-flex items-center gap-3 rounded-full py-2 pr-5 pl-3 border border-white/10 shadow-sm">
                <span className="flex -space-x-2">
                  <span
                    className="h-6 w-6 rounded-full border border-border"
                    style={{ background: 'oklch(0.6 0.24 295)' }}
                  />
                  <span
                    className="h-6 w-6 rounded-full border border-border"
                    style={{ background: 'oklch(0.7 0.17 200)' }}
                  />
                </span>
                <span className="text-xs text-foreground/85 font-medium">
                  {siteConfig.stats}
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Hero Card with Tilt & Live Preview */}
          <motion.div
            style={{ y: cardY }}
            initial={{ opacity: 0, scale: 0.94, y: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Subtle floating idle animation */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <TiltCard className="glass shadow-float p-4 border border-white/15">
                <div
                  className="relative h-56 overflow-hidden rounded-2xl p-4 flex flex-col justify-between"
                  style={{
                    background:
                      'radial-gradient(90% 80% at 30% 20%, oklch(0.75 0.18 305), oklch(0.3 0.2 300) 60%, oklch(0.12 0.04 295))',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="glass rounded-full px-3 py-1 text-[11px] font-medium tracking-wide">
                      Live build
                    </span>
                    <span className="glass rounded-full px-3 py-1 text-[11px] font-medium text-emerald-400 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                      ● Shipping
                    </span>
                  </div>

                  <div className="glass rounded-xl p-3 bg-black/20 backdrop-blur-md">
                    <div className="flex items-center justify-between text-xs text-white/90">
                      <span>Performance</span>
                      <span className="font-mono text-emerald-300 font-semibold">99 / 100</span>
                    </div>
                    <div className="mt-2 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-violet-glow"
                        initial={{ width: '0%' }}
                        animate={{ width: '99%' }}
                        transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between rounded-2xl bg-secondary px-4 py-3">
                  <span className="text-sm font-medium">Ship an AI-powered product</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((step) => (
                    <motion.span
                      key={step}
                      className="h-1 rounded-full bg-foreground/25"
                      animate={{ opacity: [0.25, 1, 0.25] }}
                      transition={{ duration: 2.2, repeat: Infinity, delay: step * 0.25 }}
                    />
                  ))}
                </div>

                <div className="mt-5 px-1 pb-1">
                  <p className="text-sm font-medium">Design → Build → Automate</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Typical first release in 2–4 weeks.
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Infinite Horizontal Ticker */}
      <div className="overflow-hidden border-y border-border bg-ink py-5">
        <motion.div
          className="flex gap-10 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        >
          {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => (
            <span
              key={idx}
              className="font-display text-sm tracking-[0.28em] text-muted-foreground uppercase flex items-center gap-3"
            >
              {item} <span className="text-primary text-xs">✦</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Four Disciplines, One Team */}
      <section className="mx-auto max-w-6xl px-5 py-28 md:px-10">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase font-medium">
            What we do
          </p>
          <h2 className="text-big mt-5 max-w-2xl">Four disciplines, one team</h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {services.map((item, idx) => (
            <Reveal key={item.id} delay={idx * 0.08}>
              <TiltCard intensity={9} className="glass h-full p-7">
                <div className="flex items-start justify-between">
                  <span className="font-display text-sm text-primary font-semibold">
                    {item.id}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <h3 className="mt-8 text-3xl font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {item.blurb}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-secondary px-3 py-1 text-xs text-foreground/80 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Cofounders 3D Floating Cards Section with Image on Homepage */}
      <CofoundersFloatingShowcase />

      {/* Floating 3D Layer Component */}
      <FloatingStudioLayer />

      {/* Selected Work */}
      <section className="mx-auto max-w-6xl px-5 py-28 md:px-10">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase font-medium">
              Selected work
            </p>
            <h2 className="text-big mt-5">Shipped, not slides</h2>
          </div>
          <Link to="/work" className="glass rounded-full px-5 py-2.5 text-sm hover:bg-white/10 transition-colors">
            All projects
          </Link>
        </Reveal>

        <div className="mt-14 space-y-3">
          {projects.slice(0, 3).map((proj, idx) => (
            <Reveal key={proj.code} delay={idx * 0.07}>
              <a
                href={proj.url}
                target="_blank"
                rel="noreferrer"
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 rounded-2xl border border-border px-5 py-6 transition-all hover:bg-secondary/70 hover:border-primary/40"
              >
                <span className="font-display text-xs text-muted-foreground font-mono">
                  {proj.code}
                </span>
                <span>
                  <span className="block text-xl font-semibold transition-transform group-hover:translate-x-1">
                    {proj.name}
                  </span>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    {proj.tech}
                  </span>
                </span>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-5 md:px-10">
        <div className="aurora grain relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] px-8 py-24 text-center md:px-16 border border-border/50">
          <Reveal>
            <h2 className="text-huge">Let's build it</h2>
            <p className="mx-auto mt-6 max-w-md text-sm text-foreground/80 leading-relaxed">
              Tell us what you're making. We'll come back with a plan, a timeline and a price — no discovery theatre.
            </p>
            <Link
              to="/contact"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-transform hover:scale-[1.03]"
            >
              Get started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
