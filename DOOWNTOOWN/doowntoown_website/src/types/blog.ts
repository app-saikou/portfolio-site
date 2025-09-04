export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: BlogCategory;
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt: string;
  isPublished: boolean;
  isFeatured: boolean;
  readTime: number; // 読了時間（分）
}

export type BlogCategory =
  | "BRAND STORY"
  | "FASHION TALK"
  | "LIMITED EDITION"
  | "STREET CULTURE"
  | "PHILOSOPHY"
  | "BEHIND THE SCENES";

export interface BlogCategoryInfo {
  id: BlogCategory;
  name: string;
  description: string;
  color: string;
  icon: string;
  lucideIcon: string;
}

export const BLOG_CATEGORIES: BlogCategoryInfo[] = [
  {
    id: "BRAND STORY",
    name: "BRAND STORY",
    description: "ブランドの背景ストーリー",
    color: "text-yellow-400",
    icon: "🎭",
    lucideIcon: "BookOpen",
  },
  {
    id: "FASHION TALK",
    name: "FASHION TALK",
    description: "ファッションに関する考察",
    color: "text-red-400",
    icon: "👕",
    lucideIcon: "Shirt",
  },
  {
    id: "LIMITED EDITION",
    name: "LIMITED EDITION",
    description: "限定商品の詳細情報",
    color: "text-orange-400",
    icon: "⚠️",
    lucideIcon: "AlertTriangle",
  },
  {
    id: "STREET CULTURE",
    name: "STREET CULTURE",
    description: "ストリートカルチャー",
    color: "text-blue-400",
    icon: "🌆",
    lucideIcon: "Building2",
  },
  {
    id: "PHILOSOPHY",
    name: "PHILOSOPHY",
    description: "ブランド哲学・価値観",
    color: "text-purple-400",
    icon: "💭",
    lucideIcon: "Brain",
  },
  {
    id: "BEHIND THE SCENES",
    name: "BEHIND THE SCENES",
    description: "制作過程・裏話",
    color: "text-green-400",
    icon: "📸",
    lucideIcon: "Camera",
  },
];
