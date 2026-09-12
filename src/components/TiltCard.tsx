import { ReactNode } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useMotionTemplate } from 'motion/react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  glare?: boolean;
}

export function TiltCard({
  children,
  className = '',
  intensity = 12,
  glare = true,
}: TiltCardProps) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const opacity = useMotionValue(0);

  const springConfig = { stiffness: 140, damping: 18, mass: 0.6 };

  const rotateX = useSpring(useTransform(y, [0, 1], [intensity, -intensity]), springConfig);
  const rotateY = useSpring(useTransform(x, [0, 1], [-intensity, intensity]), springConfig);

  const glareX = useTransform(x, (val) => `${val * 100}%`);
  const glareY = useTransform(y, (val) => `${val * 100}%`);

  const backgroundGlare = useMotionTemplate`radial-gradient(320px circle at ${glareX} ${glareY}, oklch(1 0 0 / 0.18), transparent 62%)`;

  return (
    <div className="perspective-far h-full">
      <motion.div
        onPointerMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          x.set((e.clientX - rect.left) / rect.width);
          y.set((e.clientY - rect.top) / rect.height);
          opacity.set(1);
        }}
        onPointerLeave={() => {
          x.set(0.5);
          y.set(0.5);
          opacity.set(0);
        }}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.015 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className={`relative overflow-hidden rounded-3xl h-full ${className}`}
      >
        {children}
        {glare && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background: backgroundGlare,
              opacity,
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
