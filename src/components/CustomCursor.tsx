import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

export function CustomCursor() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isPointerFine, setIsPointerFine] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Magnetic target coordinates for outer follower ring
  const magneticX = useMotionValue(-100);
  const magneticY = useMotionValue(-100);

  // Springs for smooth physics
  // Inner dot: very fast response
  const dotX = useSpring(mouseX, { damping: 40, stiffness: 700, mass: 0.2 });
  const dotY = useSpring(mouseY, { damping: 40, stiffness: 700, mass: 0.2 });

  // Outer ring: fluid spring with magnetic attraction
  const ringX = useSpring(magneticX, { damping: 25, stiffness: 240, mass: 0.5 });
  const ringY = useSpring(magneticY, { damping: 25, stiffness: 240, mass: 0.5 });

  useEffect(() => {
    // Only enable on desktop/fine pointers (prevents interfering with touch devices)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsPointerFine(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsPointerFine(e.matches);
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    if (!mediaQuery.matches) {
      return () => mediaQuery.removeEventListener('change', handleMediaChange);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);

      if (!isVisible) setIsVisible(true);

      // Check if hovering an interactive element (buttons, links, form controls, clickable elements)
      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest(
        'button, a, [role="button"], input, textarea, select, [data-magnetic], [data-interactive]'
      ) as HTMLElement | null;

      if (interactiveEl) {
        setIsHovered(true);
        const rect = interactiveEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate subtle magnetic pull vector towards element center
        const pullFactor = 0.38;
        const pulledX = clientX + (centerX - clientX) * pullFactor;
        const pulledY = clientY + (centerY - clientY) * pullFactor;

        magneticX.set(pulledX);
        magneticY.set(pulledY);
      } else {
        setIsHovered(false);
        magneticX.set(clientX);
        magneticY.set(clientY);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY, magneticX, magneticY]);

  if (!isPointerFine) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      {/* Outer Magnetic Follower Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 56 : 34,
          height: isHovered ? 56 : 34,
          scale: isClicking ? 0.82 : 1,
          borderColor: isHovered
            ? isDark
              ? 'oklch(0.72 0.22 295 / 0.85)'
              : 'oklch(0.48 0.26 295 / 0.85)'
            : isDark
            ? 'oklch(0.68 0.18 295 / 0.38)'
            : 'oklch(0.48 0.2 295 / 0.35)',
          backgroundColor: isHovered
            ? isDark
              ? 'oklch(0.62 0.24 295 / 0.14)'
              : 'oklch(0.52 0.24 295 / 0.1)'
            : isDark
            ? 'oklch(0.62 0.24 295 / 0.04)'
            : 'oklch(0.52 0.24 295 / 0.03)',
        }}
        transition={{
          type: 'spring',
          stiffness: 380,
          damping: 24,
          mass: 0.3,
        }}
        className="fixed top-0 left-0 rounded-full border backdrop-blur-[1px] shadow-[0_0_24px_rgba(180,80,255,0.18)]"
      >
        {/* Ambient subtle glow pulse when hovering */}
        {isHovered && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 0.3 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 rounded-full bg-primary/20 blur-md"
          />
        )}
      </motion.div>

      {/* Inner Precision Dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 0.65 : isClicking ? 1.4 : 1,
          backgroundColor: isHovered
            ? isDark
              ? 'oklch(0.98 0.02 295)'
              : 'oklch(0.35 0.28 295)'
            : isDark
            ? 'oklch(0.85 0.16 295)'
            : 'oklch(0.42 0.24 295)',
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
        }}
        className="fixed top-0 left-0 h-2 w-2 rounded-full shadow-[0_0_10px_oklch(0.75_0.2_295)]"
      />
    </div>
  );
}
