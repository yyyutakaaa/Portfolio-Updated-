export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string[];
  location: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  description?: string;
}

export interface Skill {
  name: string;
  category: 'technical' | 'soft' | 'language';
}

export interface Project {
  title: string;
  tech: string[];
  description: string;
  link?: string;
}
