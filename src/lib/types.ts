export type ArticleStatus = "menunggu" | "diterima" | "ditolak";

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface Author {
  id: string;
  name: string;
  username: string;
  avatarUrl?: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnailUrl?: string;
  category: Category;
  tags: Tag[];
  author: Author;
  status: ArticleStatus;
  isEditorPick: boolean;
  views: number;
  createdAt: string;
  publishedAt?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: string;
}

export interface UserBadge {
  id: string;
  badge: Badge;
  progress: number;
  total: number;
  completed: boolean;
  completedAt?: string;
}

export interface SiteStats {
  totalMembers: number;
  totalArticles: number;
  totalContributors: number;
}

export type UserRole = "member" | "contributor" | "moderator" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  avatarUrl?: string;
  role: UserRole;
  points: number;
  articleCount: number;
  badges: string[];
  joinDate: string;
}
