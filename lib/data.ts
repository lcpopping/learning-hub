import resourcesData from "@/data/resources.json";

export interface SubCategory {
  id: string;
  name: string;
  items: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  subCategories?: SubCategory[];
}

export interface Tool {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  icon: string;
  color: string;
  difficulty: string;
  officialUrl: string;
  learningPath: {
    step: number;
    title: string;
    items: string[];
  }[];
}

export interface Resource {
  id: string;
  tool: string;
  type: "video" | "documentation" | "blog" | "tutorial" | "article";
  title: string;
  description: string;
  url: string;
  thumbnail?: string;
  duration?: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  language: "en" | "zh" | "ja";
  views?: number;
  publishedAt?: string;
  author?: string;
  platform?: string;
  subCategory?: string;
}

export const categories: Category[] = resourcesData.categories as Category[];
export const tools: Tool[] = resourcesData.tools as Tool[];
export const resources: Resource[] = resourcesData.resources as Resource[];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByCategory(categorySlug: string): Tool[] {
  return tools.filter((t) => t.category === categorySlug);
}

export function getResourcesByTool(toolSlug: string): Resource[] {
  return resources.filter((r) => r.tool === toolSlug);
}

export function getResourcesByCategory(categorySlug: string): Resource[] {
  const categoryTools = getToolsByCategory(categorySlug);
  const toolIds = categoryTools.map((t) => t.id);
  return resources.filter((r) => toolIds.includes(r.tool));
}

export function getResourcesBySubCategory(subCategoryId: string): Resource[] {
  return resources.filter((r) => r.subCategory === subCategoryId);
}

export function getResourcesByType(type: Resource["type"]): Resource[] {
  return resources.filter((r) => r.type === type);
}

export function getResourcesByDifficulty(difficulty: Resource["difficulty"]): Resource[] {
  return resources.filter((r) => r.difficulty === difficulty);
}

export function getChineseResources(): Resource[] {
  return resources.filter((r) => r.language === "zh");
}

export function getFeaturedResources(): Resource[] {
  return resources
    .filter((r) => r.type === "video")
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 8);
}

export function searchResources(query: string): Resource[] {
  const lowerQuery = query.toLowerCase();
  return resources.filter(
    (r) =>
      r.title.toLowerCase().includes(lowerQuery) ||
      r.description.toLowerCase().includes(lowerQuery)
  );
}

export const difficultyLabels = {
  beginner: "入门",
  intermediate: "进阶",
  advanced: "高级",
} as const;

export const typeLabels = {
  video: "视频",
  documentation: "文档",
  blog: "博客",
  tutorial: "教程",
  article: "文章",
} as const;

export const languageLabels = {
  en: "英文",
  zh: "中文",
  ja: "日文",
} as const;

export const platformLabels = {
  bilibili: "B站",
  douyin: "抖音",
  zhihu: "知乎",
  youtube: "YouTube",
  csdn: "CSDN",
  jianshu: "简书",
} as const;