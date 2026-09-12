import { ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

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
      ease: [0.16, 1, 0.3, 1], // Clean exponential ease out for snappy, fluid slide
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

export function PageTransition({ children, transitionKey }: PageTransitionProps) {
  useEffect(() => {
    // Scroll to top upon mounting a new route view
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [transitionKey]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={transitionKey}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full flex-1"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
