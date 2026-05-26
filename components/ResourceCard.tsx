"use client";

import { cn } from "@/lib/utils";
import { Resource } from "@/lib/data";

interface ResourceCardProps {
  resource: Resource;
  className?: string;
}

export function ResourceCard({ resource, className }: ResourceCardProps) {
  const isVideo = resource.type === "video";

  return (
    <div
      className={cn(
        "bg-white rounded-xl border overflow-hidden hover:shadow-lg transition-all duration-300",
        className
      )}
    >
      {isVideo && resource.thumbnail && (
        <div className="relative aspect-video bg-gray-100">
          <img
            src={resource.thumbnail}
            alt={resource.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {resource.duration && (
            <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded">
              {resource.duration}
            </span>
          )}
        </div>
      )}

      <div className="p-3 sm:p-4">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span
            className={cn(
              "text-xs px-2 py-0.5 rounded-full whitespace-nowrap",
              resource.difficulty === "beginner"
                ? "bg-green-100 text-green-700"
                : resource.difficulty === "intermediate"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            )}
          >
            {resource.difficulty === "beginner"
              ? "入门"
              : resource.difficulty === "intermediate"
              ? "进阶"
              : "高级"}
          </span>
          <span className="text-xs text-gray-400 whitespace-nowrap">
            {resource.language === "zh" ? "中文" : resource.language === "ja" ? "日文" : "英文"}
          </span>
        </div>

        <h3 className="font-medium text-sm mb-1 line-clamp-2 leading-tight">{resource.title}</h3>
        <p className="text-gray-500 text-xs line-clamp-2 leading-tight">{resource.description}</p>

        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center text-sm text-primary-600 hover:text-primary-700"
        >
          {isVideo ? "观看视频" : "查看详情"} &rarr;
        </a>
      </div>
    </div>
  );
}