export type Category = 
  | 'All'
  | 'AI Apps'
  | 'Web Tools'
  | 'E-Commerce'
  | 'Games'
  | 'Dashboards'
  | 'Landing Pages';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: Category;
  prompt: string;
  liveUrl: string;
  githubUrl?: string;
  instagramPostUrl?: string;
  thumbnailUrl: string;
  tags: string[];
  isFeatured: boolean;
  views: number;
  likes: number;
  createdAt: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface CreatorProfile {
  name: string;
  handle: string;
  avatarUrl: string;
  bio: string;
  instagramUrl: string;
  youtubeUrl?: string;
  githubUrl?: string;
  websiteUrl?: string;
  customNotice?: string;
}

export type ViewMode = 'grid' | 'list' | 'bento';

export interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}
