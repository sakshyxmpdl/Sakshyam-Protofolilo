export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  category: 'Minecraft' | 'Discord Server' | 'Discord Bots' | 'Web Design' | 'Full Stack' | 'Plugins';
  tags: string[];
  image: string;
  demoUrl: string;
  githubUrl: string;
  tiktokUrl?: string;
  youtubeUrl?: string;
  discordUrl?: string;
  websiteUrl?: string;
  featured: boolean;
  metrics?: { label: string; value: string }[];
}

export interface DiscordBot {
  id: string;
  name: string;
  role: string;
  description: string;
  features: string[];
  status: string;
  serversCount: string;
  image: string;
  commands: string[];
}

export interface SkillItem {
  name: string;
  level: number; // 1-100
  iconName: string;
  years: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  skills: string[];
  type: 'Work' | 'Education';
  url?: string;
}

export interface UserProfile {
  name: string;
  title: string;
  location: string;
  email: string;
  github: string;
  discord: string;
  bio: string;
  availability: string;
  yearsExperience: number;
  completedProjects: number;
  age: number;
}

