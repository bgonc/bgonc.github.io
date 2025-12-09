export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  githubUrl: string;
  liveUrl?: string;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100 for chart
  category: 'Frontend' | 'Backend' | 'Tools';
}

export interface SocialLink {
  platform: string;
  url: string;
  iconClass: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  imageUrl?: string;
  url?: string; // Could be internal or external link
}

export interface PortfolioData {
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  resumeUrl: string;
  socials: SocialLink[];
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  blogPosts: BlogPost[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}