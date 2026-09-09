export interface Project {
  id: string;
  number: string;
  name: string;
  tagline?: string;
  category?: string;
  industry?: string;
  services: string[];
  description: string;
  metrics?: string;
  image: string;
  color?: string;
  featured?: boolean;
  link?: string;
  highlights?: string[];
  filterTags?: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty?: string;
  bio: string;
  skills: string[];
  isFounder?: boolean;
  linkedin?: string;
}

export interface Service {
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  iconName: string;
}

export interface Benefit {
  title: string;
  description: string;
  iconName: string;
  tag: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  timeline: string;
}

export interface ClientReview {
  id: string;
  name: string;
  rating: number; // 1 to 5
  review: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  company?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  tagline: string;
  priceINR: string;
  priceUSD: string;
  timeline: string;
  features: string[];
  highlighted?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface ProjectInquiry {
  id?: string;
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  description: string;
  timeline?: string;
  createdAt: string;
  userId?: string | null;
  status: 'received' | 'in-review' | 'discovery-scheduled';
}

export interface AgencyStats {
  projects: string;
  clients: string;
  satisfaction: string;
  support: string;
}
