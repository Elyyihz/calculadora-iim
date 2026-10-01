export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  bio: string;
  avatarUrl: string;
  skills: string[];
  linkedin?: string;
  email?: string;
}

export interface Pillar {
  id: string;
  title: string;
  description: string;
  iconName: string;
  metrics?: string;
}

export interface ResponsibilityItem {
  id: string;
  category: 'ESG' | 'Social' | 'Governança' | 'Mobilidade';
  title: string;
  description: string;
  impactMetrics: string;
  commitments: string[];
}

export interface StatMetric {
  value: string;
  label: string;
  subtext: string;
}
