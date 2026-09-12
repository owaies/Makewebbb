import { useState } from 'react';
import { ArrowUpRight, Mail, Phone, Github, Linkedin } from 'lucide-react';
import { teamMembers } from '../data';
import { TeamMember } from '../types';
import { Reveal } from '../components/Reveal';
import { SplitReveal } from '../components/SplitReveal';
import { TiltCard } from '../components/TiltCard';

function TeamMemberCard({ member }: { member: TeamMember }) {
  const [imgError, setImgError] = useState(false);

  return (
    <TiltCard intensity={8} className="glass h-full p-7 flex flex-col justify-between">
      <div>
        <div
          className="relative h-64 overflow-hidden rounded-2xl border border-white/10"
          style={{ background: member.gradient }}
        >
          {!imgError ? (
            <div className="relative h-full w-full bg-black/40">
              <img
                src={member.image}
                alt={member.name}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            </div>
          ) : (
            <div className="flex h-full w-full items-end p-5">
              <span className="font-display text-5xl font-semibold tracking-tight text-white">
                {member.initials}
              </span>
            </div>
          )}

          <div className="absolute bottom-3 left-3">
            <span className="glass rounded-full px-3 py-1 text-[11px] font-medium text-foreground">
              {member.role}
            </span>
          </div>
        </div>

        <h2 className="mt-6 text-3xl font-semibold tracking-tight text-foreground">
          {member.name}
        </h2>
        <p className="mt-1 text-sm text-primary font-medium">{member.role}</p>
        <p className="mt-1 text-xs tracking-[0.18em] text-muted-foreground font-mono">
          {member.focus}
        </p>
        {member.bio && (
          <p className="mt-3 text-xs md:text-sm text-muted-foreground leading-relaxed">
            {member.bio}
          </p>
        )}

        <div className="mt-6 space-y-2.5 text-sm">
          <a
            href={`mailto:${member.email}`}
            className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <Mail className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
            <span>{member.email}</span>
          </a>
          <a
            href={`tel:${member.phone}`}
            className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <Phone className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
            <span>{member.phone}</span>
          </a>
          <a
            href={member.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <Github className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
            <span>GitHub</span>
          </a>
          <a
            href={member.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <Linkedin className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-white/5">
        <a
          href={member.portfolio}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-transform hover:scale-[1.03]"
        >
          View portfolio
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </TiltCard>
  );
}

export function TeamPage() {
  return (
    <main>
      {/* Hero */}
      <section className="aurora grain px-5 pt-40 pb-24 md:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs tracking-[0.3em] text-foreground/70 uppercase font-medium">
            Founders
          </p>
          <h1 className="text-huge mt-6 max-w-4xl">
            <SplitReveal text="Two people," />
            <span className="block text-foreground/45">
              <SplitReveal text="zero handoffs" />
            </span>
          </h1>
        </div>
      </section>

      {/* Team Grid */}
      <section className="mx-auto max-w-6xl px-5 py-24 md:px-10">
        <div className="grid gap-6 md:grid-cols-2">
          {teamMembers.map((member, idx) => (
            <Reveal key={member.name} delay={idx * 0.1}>
              <TeamMemberCard member={member} />
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
