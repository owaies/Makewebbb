import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { siteConfig, navItems } from '../data';
import { ThemeToggle } from './ThemeToggle';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="glass pointer-events-auto flex w-full max-w-3xl items-center gap-1 rounded-full py-2 pr-2 pl-4 shadow-lg shadow-black/20"
      >
        <Link to="/" className="mr-auto flex items-center gap-2 group">
          <span className="inline-block h-2.5 w-2.5 rotate-45 rounded-[2px] bg-primary transition-transform group-hover:rotate-90 duration-300" />
          <span className="font-display text-sm font-semibold tracking-tight text-foreground">
            {siteConfig.name}
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.slice(1, 4).map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                  isActive
                    ? 'text-foreground font-medium bg-foreground/5'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <ThemeToggle className="ml-1" />

        <Link
          to="/contact"
          className="hidden rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform hover:scale-[1.03] md:inline-block"
        >
          Get started
        </Link>

        <button
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full border border-border p-2 text-foreground transition-colors hover:bg-white/5 md:hidden"
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto fixed inset-0 z-50 aurora bg-background px-6 pt-24"
          >
            <div className="absolute top-7 right-6 flex items-center gap-2">
              <ThemeToggle showLabel={true} className="px-3" />
              <button
                aria-label="Close menu"
                onClick={() => setIsOpen(false)}
                className="rounded-full border border-border p-2 text-foreground transition-colors hover:bg-white/5"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-col gap-2 max-w-md mx-auto mt-4">
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * idx, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className="text-big block border-b border-border py-4 text-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * navItems.length, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6"
              >
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center rounded-full bg-foreground px-6 py-3.5 text-base font-medium text-background transition-transform hover:scale-[1.02]"
                >
                  Get started
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
