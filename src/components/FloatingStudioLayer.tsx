import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { floatingCards } from '../data';

export function FloatingStudioLayer() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const z = useTransform(scrollYProgress, [0, 1], [-200, 320]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [12, -12]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.05, 0.9]);

  return (
    <section
      ref={containerRef}
      className="perspective-far relative h-[110vh] overflow-hidden border-y border-border bg-ink"
    >
      <div className="absolute inset-0 preserve-3d pointer-events-none">
        {floatingCards.map((card) => (
          <motion.div
            key={card.label}
            className="absolute rounded-2xl border border-border"
            style={{
              left: card.x,
              top: card.y,
              width: card.w,
              height: card.h,
              background: `radial-gradient(120% 90% at 40% 20%, ${card.hue}, var(--background))`,
              boxShadow: 'var(--shadow-card)',
            }}
            animate={{
              y: [0, -22, 0],
              rotateZ: [-2, 2, -2],
            }}
            transition={{
              duration: 9 + card.d,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: card.d,
            }}
          >
            <span className="absolute top-3 left-3 text-[10px] tracking-[0.18em] text-foreground/70 uppercase font-medium">
              {card.label}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="relative flex h-full items-center justify-center px-5">
        <motion.div
          style={{
            z,
            rotateX,
            scale,
            transformStyle: 'preserve-3d',
          }}
          className="grain relative w-full max-w-xl overflow-hidden rounded-3xl border border-border p-8 shadow-float"
        >
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                'linear-gradient(135deg, oklch(0.9 0.03 280), oklch(0.62 0.2 270) 55%, oklch(0.3 0.14 290))',
            }}
          />
          <p className="text-[11px] tracking-[0.24em] text-ink/70 uppercase font-semibold">
            Live build
          </p>
          <h3 className="mt-4 text-3xl font-semibold text-ink md:text-5xl tracking-tight">
            One studio, every layer
          </h3>
          <p className="mt-4 max-w-md text-sm text-ink/75 leading-relaxed">
            Interface, model and infrastructure designed together — so the thing you launch feels like one product, not three vendors.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-3 text-ink text-center">
            {['Design', 'Engineer', 'Automate'].map((tag) => (
              <div
                key={tag}
                className="rounded-xl bg-ink/10 px-3 py-2 text-xs font-medium backdrop-blur-sm"
              >
                {tag}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
