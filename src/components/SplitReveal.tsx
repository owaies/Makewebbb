import { motion, useReducedMotion } from 'motion/react';

interface SplitRevealProps {
  text: string;
  className?: string;
}

export function SplitReveal({ text, className = '' }: SplitRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(' ');

  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, idx) => (
        <span key={`${word}-${idx}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={shouldReduceMotion ? false : { y: '110%' }}
            whileInView={shouldReduceMotion ? undefined : { y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.9, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
}
