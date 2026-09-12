export interface Project {
  code: string;
  name: string;
  type: string;
  tech: string;
  url: string;
  gradient?: string;
}

export interface Service {
  id: string;
  title: string;
  blurb: string;
  tags: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  focus: string;
  initials: string;
  portfolio: string;
  github: string;
  linkedin: string;
  email: string;
  phone: string;
  gradient: string;
  image: string;
  bio?: string;
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
}

export interface FloatingCard {
  label: string;
  hue: string;
  x: string;
  y: string;
  w: number;
  h: number;
  d: number;
}
