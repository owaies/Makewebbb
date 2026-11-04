import { ReactNode, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

interface PageTransitionProps {
  children: ReactNode;
  transitionKey: string;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 28,
    filter: 'blur(6px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.42,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: 'blur(4px)',
    transition: {
      duration: 0.24,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const staticPageVariants = {
  initial: { opacity: 1, y: 0, filter: 'blur(0px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0 } },
  exit: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0 } },
};

export function PageTransition({ children, transitionKey }: PageTransitionProps) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Scroll to top upon mounting a new route view
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [transitionKey]);

  return (
    <AnimatePresence mode={shouldReduceMotion ? 'sync' : 'wait'} initial={false}>
      <motion.div
        key={transitionKey}
        variants={shouldReduceMotion ? staticPageVariants : pageVariants}
        initial={shouldReduceMotion ? false : 'initial'}
        animate="animate"
        exit="exit"
        className="w-full flex-1"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
