import { useState, FormEvent } from 'react';
import { Mail, Github, Globe, ArrowUpRight, Check, Send } from 'lucide-react';
import { siteConfig, teamMembers } from '../data';
import { Reveal } from '../components/Reveal';
import { SplitReveal } from '../components/SplitReveal';
import { TiltCard } from '../components/TiltCard';

export function ContactPage() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formProject, setFormProject] = useState('Web Application');
  const [formMessage, setFormMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Inquiry: ${formProject} - from ${formName || 'MakeWebb visitor'}`);
    const body = encodeURIComponent(
      `Hello MakeWebb Team,\n\nName: ${formName}\nEmail: ${formEmail}\nProject Type: ${formProject}\n\nProject details:\n${formMessage}\n\nSent from MakeWebb website.`
    );
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <main>
      {/* Hero */}
      <section className="aurora grain px-5 pt-40 pb-24 md:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs tracking-[0.3em] text-foreground/70 uppercase font-medium">
            Contact
          </p>
          <h1 className="text-huge mt-6 max-w-4xl">
            <SplitReveal text="Tell us what" />
            <span className="block text-foreground/45">
              <SplitReveal text="you're building" />
            </span>
          </h1>

          <Reveal delay={0.2} className="mt-8">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.03]"
              >
                <Mail className="h-4 w-4" />
                {siteConfig.email}
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="glass rounded-full px-5 py-3 text-sm font-medium text-foreground hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                {copiedEmail ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span>Copied to clipboard</span>
                  </>
                ) : (
                  <span>Copy email</span>
                )}
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Main Grid */}
      <section className="mx-auto max-w-6xl px-5 py-24 md:px-10">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Studio Info Card */}
          <Reveal>
            <TiltCard intensity={8} className="glass h-full p-8 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">Studio</h2>
                <div className="mt-6 space-y-3.5 text-sm">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors group"
                  >
                    <Mail className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                    <span>{siteConfig.email}</span>
                  </a>
                  <a
                    href={siteConfig.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors group"
                  >
                    <Github className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                    <span>github.com/owaies/MakeWebb</span>
                  </a>
                  <a
                    href={siteConfig.website}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors group"
                  >
                    <Globe className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                    <span>makewebb.vercel.app</span>
                  </a>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-border/50">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Send a few lines about the product, your deadline and your budget range. You'll hear back within a day.
                </p>
              </div>
            </TiltCard>
          </Reveal>

          {/* Talk to a Founder Card */}
          <Reveal delay={0.1}>
            <TiltCard intensity={8} className="glass h-full p-8">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Talk to a founder
              </h2>
              <div className="mt-6 space-y-5">
                {teamMembers.map((member) => (
                  <div
                    key={member.name}
                    className="rounded-2xl bg-secondary/80 p-5 border border-border/40 hover:border-primary/30 transition-colors"
                  >
                    <p className="font-semibold text-foreground">{member.name}</p>
                    <p className="text-xs text-primary font-medium">{member.role}</p>

                    <div className="mt-3.5 flex flex-wrap gap-x-4 gap-y-2 text-xs">
                      <a
                        href={`mailto:${member.email}`}
                        className="text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
                      >
                        {member.email}
                      </a>
                      <a
                        href={`tel:${member.phone}`}
                        className="text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
                      >
                        {member.phone}
                      </a>
                      <a
                        href={member.portfolio}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-foreground underline-offset-4 hover:underline font-medium hover:text-primary"
                      >
                        Portfolio
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </TiltCard>
          </Reveal>
        </div>

        {/* Interactive Fast Inquiry Form */}
        <div className="mt-12">
          <Reveal delay={0.2}>
            <div className="glass rounded-3xl p-8 md:p-10 border border-border">
              <div className="max-w-2xl">
                <span className="text-xs font-mono tracking-widest text-primary uppercase">
                  Project Inquiry
                </span>
                <h3 className="mt-2 text-2xl font-semibold text-foreground">
                  Send us a direct brief
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Fill in the details below and we will prepare a proposal within 24 hours.
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="mt-8 grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-foreground/80 mb-2">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full rounded-xl bg-secondary/80 border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-foreground/80 mb-2">
                    Your Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="jane@company.com"
                    className="w-full rounded-xl bg-secondary/80 border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="project-type" className="block text-xs font-medium text-foreground/80 mb-2">
                    Project Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['Websites', 'Web Applications', 'AI Integration', 'Workflow Automation'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormProject(type)}
                        className={`rounded-xl px-3 py-2.5 text-xs font-medium border text-center transition-all ${
                          formProject === type
                            ? 'bg-foreground text-background border-foreground shadow-sm'
                            : 'bg-secondary/60 text-muted-foreground border-border hover:text-foreground hover:bg-secondary'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="message" className="block text-xs font-medium text-foreground/80 mb-2">
                    Project Scope &amp; Timeline
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    placeholder="Tell us what you're building, target launch date, and any specific stack requirements..."
                    className="w-full rounded-xl bg-secondary/80 border border-border p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                  />
                </div>

                <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-4 pt-2">
                  <p className="text-xs text-muted-foreground">
                    Or reach out directly at <span className="text-foreground font-medium">{siteConfig.email}</span>
                  </p>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-transform hover:scale-[1.03]"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send inquiry</span>
                  </button>
                </div>

                {submitted && (
                  <div className="md:col-span-2 rounded-xl bg-emerald-950/40 border border-emerald-500/40 p-4 text-emerald-300 text-sm flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0" />
                    <span>Email client opened! We look forward to connecting with you shortly.</span>
                  </div>
                )}
              </form>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
