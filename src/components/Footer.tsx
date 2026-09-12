import { Link } from 'react-router-dom';
import { siteConfig } from '../data';

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border bg-ink px-5 py-16 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <span className="inline-block h-3 w-3 rotate-45 rounded-[3px] bg-primary" />
            <h2 className="text-big mt-5">{siteConfig.name}</h2>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground leading-relaxed">
              {siteConfig.description}
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-5 inline-block text-sm text-foreground underline-offset-4 hover:underline hover:text-primary transition-colors"
            >
              {siteConfig.email}
            </a>
          </div>

          <div>
            <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase font-medium">
              Studio
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/work" className="text-muted-foreground hover:text-primary transition-colors">
                  Work
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-muted-foreground hover:text-primary transition-colors">
                  Team
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase font-medium">
              Elsewhere
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                >
                  makewebb.vercel.app
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/mohammed-owaies-507b4a398"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                >
                  Owaies · LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/mansafaf"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                >
                  Hassan · LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-border/40 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2026 MakeWebb. Built in India.</p>
          <p className="text-[11px] text-muted-foreground/60">
            Engineered with obsessive craft
          </p>
        </div>
      </div>
    </footer>
  );
}
