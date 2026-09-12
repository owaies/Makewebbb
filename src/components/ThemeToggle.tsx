import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className = '', showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      data-magnetic="true"
      aria-label={isDark ? 'Switch to high-contrast light mode' : 'Switch to default dark mode'}
      title={isDark ? 'Switch to high-contrast light mode' : 'Switch to dark mode'}
      className={`relative inline-flex items-center justify-center rounded-full border border-border p-2 text-foreground/80 hover:text-foreground hover:bg-foreground/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${className}`}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -45, scale: 0.6, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        exit={{ rotate: 45, scale: 0.6, opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="flex items-center justify-center"
      >
        {isDark ? (
          <Sun className="h-4 w-4 text-amber-300" />
        ) : (
          <Moon className="h-4 w-4 text-primary" />
        )}
      </motion.div>

      {showLabel && (
        <span className="ml-2 text-xs font-medium tracking-wide">
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </span>
      )}
    </motion.button>
  );
}
