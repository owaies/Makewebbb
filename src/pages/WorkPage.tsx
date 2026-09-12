import { ArrowUpRight } from 'lucide-react';
import { projects } from '../data';
import { Reveal } from '../components/Reveal';
import { SplitReveal } from '../components/SplitReveal';
import { TiltCard } from '../components/TiltCard';

export function WorkPage() {
  return (
    <main>
      {/* Hero */}
      <section className="aurora grain px-5 pt-40 pb-24 md:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs tracking-[0.3em] text-foreground/70 uppercase font-medium">
            Selected work
          </p>
          <h1 className="text-huge mt-6 max-w-4xl">
            <SplitReveal text="Things we" />
            <span className="block text-foreground/45">
              <SplitReveal text="actually shipped" />
            </span>
          </h1>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="mx-auto max-w-6xl px-5 py-24 md:px-10">
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((proj, idx) => {
            const isFeatured = idx === 0;
            return (
              <div
                key={proj.code}
                className={isFeatured ? 'md:col-span-2' : ''}
              >
                <Reveal delay={idx * 0.08}>
                  <TiltCard intensity={9} className="glass h-full p-5 group">
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noreferrer"
                      className="block"
                    >
                      <div
                        className={`relative overflow-hidden rounded-2xl ${
                          isFeatured ? 'h-72' : 'h-52'
                        } transition-transform duration-500 group-hover:scale-[1.01]`}
                        style={{ background: proj.gradient }}
                      >
                        <span className="glass absolute top-3 left-3 rounded-full px-3 py-1 text-[11px] tracking-[0.14em] uppercase font-medium">
                          {proj.type}
                        </span>
                      </div>

                      <div className="mt-5 flex items-start justify-between gap-4 px-1 pb-1">
                        <div>
                          <span className="font-display text-[11px] text-muted-foreground font-mono">
                            {proj.code}
                          </span>
                          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                            {proj.name}
                          </h2>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {proj.tech}
                          </p>
                        </div>
                        <ArrowUpRight className="mt-2 h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </div>
                    </a>
                  </TiltCard>
                </Reveal>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
