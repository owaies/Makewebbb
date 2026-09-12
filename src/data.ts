import { Project, Service, TeamMember, ProcessStep, FloatingCard } from './types';

export const siteConfig = {
  name: 'MakeWebb',
  tagline: 'We build systems that ship',
  description: 'Websites, apps, AI integration and automation — designed and shipped by two engineers.',
  email: 'hello.makewebb@gmail.com',
  github: 'https://github.com/owaies/MakeWebb',
  website: 'https://makewebb.vercel.app/',
  stats: 'Two founders · 5 shipped products',
};

export const navItems = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/work', label: 'Work' },
  { to: '/team', label: 'Team' },
  { to: '/contact', label: 'Contact' },
];

export const tickerItems = ['WEB', 'APPS', 'AI INTEGRATION', 'AUTOMATION', 'UI/UX', 'DATA'];

export const services: Service[] = [
  {
    id: '01',
    title: 'Websites',
    blurb: 'Fast, animated, SEO-ready sites built to convert — from landing pages to full marketing platforms.',
    tags: ['Next.js', 'React', 'Motion'],
  },
  {
    id: '02',
    title: 'Applications',
    blurb: 'Product-grade web and mobile apps with real auth, real data and interfaces people keep.',
    tags: ['Web Apps', 'Dashboards', 'Mobile'],
  },
  {
    id: '03',
    title: 'AI Integration',
    blurb: 'Models wired into your product: assistants, vision, search and generation that actually run in production.',
    tags: ['LLMs', 'Vision', 'RAG'],
  },
  {
    id: '04',
    title: 'Automation',
    blurb: 'Pipelines, agents and workflows that remove the repetitive part of running a business.',
    tags: ['Workflows', 'Agents', 'Data'],
  },
];

export const processSteps: ProcessStep[] = [
  {
    id: '01',
    title: 'Scope',
    description: 'A short call, a written plan, a fixed price and timeline.',
  },
  {
    id: '02',
    title: 'Design',
    description: 'Interface and motion prototyped before a line of product code.',
  },
  {
    id: '03',
    title: 'Build',
    description: 'Shipped in weekly slices you can click, not screenshots.',
  },
  {
    id: '04',
    title: 'Run',
    description: 'Deploy, monitor, automate and keep improving after launch.',
  },
];

export const projects: Project[] = [
  {
    code: 'MW / 001',
    name: 'AI Job Tracker',
    type: 'AI PRODUCT',
    tech: 'Next.js · AI · Analytics',
    url: 'https://ai-job-application-tracker-rose.vercel.app',
    gradient: 'radial-gradient(100% 90% at 25% 15%, oklch(0.7 0.2 300), oklch(0.2 0.1 295))',
  },
  {
    code: 'MW / 002',
    name: 'E-Examiner',
    type: 'EXAM PLATFORM',
    tech: 'Web App · Assessments · Exams',
    url: 'https://e-examiner.vercel.app/',
    gradient: 'radial-gradient(100% 90% at 75% 20%, oklch(0.65 0.18 220), oklch(0.18 0.08 250))',
  },
  {
    code: 'MW / 003',
    name: 'World Object Detector',
    type: 'COMPUTER VISION',
    tech: 'Python · Vision · Detection',
    url: 'https://world-object-detector.netlify.app/',
    gradient: 'radial-gradient(100% 90% at 40% 80%, oklch(0.66 0.2 150), oklch(0.16 0.07 180))',
  },
  {
    code: 'MW / 004',
    name: 'Silsila Burqa House',
    type: 'E-COMMERCE',
    tech: 'Web · Commerce · Product Experience',
    url: 'https://silsilaburqahouse.web.app',
    gradient: 'radial-gradient(100% 90% at 65% 25%, oklch(0.68 0.21 25), oklch(0.18 0.09 20))',
  },
  {
    code: 'MW / 005',
    name: 'Hand Gesture Controller',
    type: 'COMPUTER VISION',
    tech: 'Python · Hand Tracking · Interaction',
    url: 'https://handgesturecontroller.netlify.app/',
    gradient: 'radial-gradient(100% 90% at 30% 70%, oklch(0.72 0.19 95), oklch(0.18 0.08 110))',
  },
];

export const teamMembers: TeamMember[] = [
  {
    name: 'Mohammed Owaies',
    role: 'AI/ML Engineer',
    focus: 'AI · ML · DATA',
    initials: 'MO',
    portfolio: 'https://owaies-portfolio.base44.app',
    github: 'https://github.com/owaies',
    linkedin: 'https://www.linkedin.com/in/mohammed-owaies-507b4a398',
    email: 'owaies786@gmail.com',
    phone: '7619329863',
    gradient: 'radial-gradient(110% 90% at 30% 20%, oklch(0.7 0.2 300), oklch(0.18 0.09 295))',
    image: '/herome.png',
    bio: 'Architecting machine learning pipelines, vision models, autonomous workflows, and production AI backends.',
  },
  {
    name: 'Mohammed Afaf Hassan',
    role: 'Web Developer',
    focus: 'WEB · APPS · UI/UX',
    initials: 'MAH',
    portfolio: 'https://afaf.base44.app',
    github: 'https://github.com/afaf-app',
    linkedin: 'https://www.linkedin.com/in/mansafaf',
    email: 'kingahassan786@gmail.com',
    phone: '8073818817',
    gradient: 'radial-gradient(110% 90% at 70% 25%, oklch(0.68 0.18 220), oklch(0.17 0.08 250))',
    image: '/afaf.png',
    bio: 'Crafting fluid motion systems, responsive web applications, and high-conversion visual design experiences.',
  },
];

export const floatingCards: FloatingCard[] = [
  { label: 'Vision', hue: 'oklch(0.5 0.24 300)', x: '4%', y: '12%', w: 150, h: 200, d: 0 },
  { label: 'Automation', hue: 'oklch(0.45 0.18 200)', x: '78%', y: '8%', w: 130, h: 180, d: 0.4 },
  { label: 'Commerce', hue: 'oklch(0.5 0.22 20)', x: '10%', y: '62%', w: 160, h: 210, d: 0.8 },
  { label: 'Signal', hue: 'oklch(0.5 0.19 150)', x: '72%', y: '58%', w: 170, h: 150, d: 1.2 },
  { label: 'Agents', hue: 'oklch(0.55 0.2 330)', x: '42%', y: '82%', w: 140, h: 120, d: 1.6 },
];
