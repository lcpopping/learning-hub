"use client";

import { cn } from "@/lib/utils";
import { Category } from "@/lib/data";

interface CategoryCardProps {
  category: Category;
  resourceCount?: number;
  className?: string;
}

export function CategoryCard({ category, resourceCount, className }: CategoryCardProps) {
  return (
    <a
      href={`/category/${category.slug}`}
      className={cn(
        "block p-4 sm:p-6 rounded-xl border bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1",
        className
      )}
      style={{ borderColor: `${category.color}30` }}
    >
      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
        <span className="text-2xl sm:text-3xl">{category.icon}</span>
        <div className="min-w-0">
          <h3 className="font-semibold text-base sm:text-lg truncate">{category.name}</h3>
          {resourceCount !== undefined && (
            <span className="text-xs text-gray-400">{resourceCount} 个资源</span>
          )}
        </div>
      </div>
      <p className="text-gray-600 text-xs sm:text-sm line-clamp-2">{category.description}</p>
      <div className="mt-3 sm:mt-4 flex items-center text-sm" style={{ color: category.color }}>
        <span>查看全部 &rarr;</span>
      </div>
    </a>
  );
}