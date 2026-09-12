import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { services, processSteps } from '../data';
import { Reveal } from '../components/Reveal';
import { SplitReveal } from '../components/SplitReveal';
import { TiltCard } from '../components/TiltCard';

export function ServicesPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="aurora grain px-5 pt-40 pb-24 md:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs tracking-[0.3em] text-foreground/70 uppercase font-medium">
            Services
          </p>
          <h1 className="text-huge mt-6 max-w-4xl">
            <SplitReveal text="Everything from" />
            <span className="block text-foreground/45">
              <SplitReveal text="idea to uptime" />
            </span>
          </h1>
        </div>
      </section>

      {/* Services Grid */}
      <section className="mx-auto max-w-6xl px-5 py-24 md:px-10">
        <div className="grid gap-5 md:grid-cols-2">
          {services.map((service, idx) => (
            <Reveal key={service.id} delay={idx * 0.08}>
              <TiltCard intensity={10} className="glass h-full p-8">
                <div className="flex items-start justify-between">
                  <span className="font-display text-sm text-primary font-semibold">
                    {service.id}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <h2 className="mt-8 text-3xl font-semibold tracking-tight">{service.title}</h2>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {service.blurb}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-secondary px-3 py-1 text-xs text-foreground/80 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How We Work */}
      <section className="mx-auto max-w-6xl px-5 pb-28 md:px-10">
        <Reveal>
          <h2 className="text-big">How we work</h2>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {processSteps.map((step, idx) => (
            <Reveal key={step.id} delay={idx * 0.08}>
              <div className="h-full rounded-2xl border border-border p-6 bg-secondary/30 hover:border-primary/40 transition-colors">
                <span className="font-display text-xs text-primary font-semibold font-mono">
                  {step.id}
                </span>
                <h3 className="mt-6 text-xl font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.35} className="mt-14">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.03]"
          >
            Start a project
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
