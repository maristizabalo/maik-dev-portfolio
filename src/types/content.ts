export type Locale = "es" | "en";

export type Localized = Record<Locale, string>;

export type ProficiencyLevel =
  | "expert"
  | "advanced"
  | "proficient"
  | "working"
  | "familiar";

export type TechCategory =
  | "frontend"
  | "backend"
  | "databases"
  | "cloud"
  | "devops"
  | "ai"
  | "automation"
  | "testing"
  | "architecture";

export type ProjectStatus = "public" | "private" | "in-progress";

export type CareerArc = "web" | "backend" | "fullstack" | "architecture" | "ai";

export interface Profile {
  name: string;
  firstName: string;
  title: string;
  role: Localized;
  location: Localized;
  yearsExperience: number;
  headline: Localized;
  bio: Localized[];
  availability: Localized;
  languages: { name: Localized; level: Localized }[];
  photo: { src: string; alt: Localized };
  cvUrl: string;
  portfolioUrl: string;
}

export interface Contact {
  email: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  location: Localized;
  github: string;
  linkedin: string;
  calendly?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: Localized;
  period: Localized;
  location: Localized;
  arc: CareerArc;
  summary: Localized;
  highlights: Localized[];
  stack: string[];
  datesConfirmed: boolean;
}

export interface Project {
  slug: string;
  name: string;
  category: Localized;
  status: ProjectStatus;
  year: string;
  company?: string;
  featured: boolean;
  summary: Localized;
  problem: Localized;
  solution: Localized;
  impact: Localized;
  stack: string[];
  links?: { demo?: string; github?: string };
  cover?: string;
}

export interface Tech {
  id: string;
  name: string;
  category: TechCategory;
  level: ProficiencyLevel;
  years: number;
  projects: string[];
  contexts: string[];
}

export type CertificationArea =
  | "development"
  | "backend"
  | "frontend"
  | "cloud"
  | "data"
  | "ai"
  | "digital-gov"
  | "other";

export interface Certification {
  id: string;
  title: Localized;
  issuer: string;
  year: number;
  hours: number | null;
  area: CertificationArea;
  verifyUrl?: string;
}

export interface Service {
  id: string;
  title: Localized;
  description: Localized;
  forWhom: Localized;
  stack: string[];
}

export interface Stat {
  id: string;
  value: number;
  prefix?: string;
  suffix?: string;
  label: Localized;
  confirmed: boolean;
}
