"use client";

import { cn } from "@/lib/utils";
import { Tool } from "@/lib/data";

interface ToolCardProps {
  tool: Tool;
  className?: string;
}

export function ToolCard({ tool, className }: ToolCardProps) {
  return (
    <a
      href={`/tools/${tool.slug}`}
      className={cn(
        "block p-4 sm:p-6 rounded-xl border bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1",
        className
      )}
      style={{ borderColor: `${tool.color}30` }}
    >
      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
        <span className="text-2xl sm:text-3xl">{tool.icon}</span>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-base sm:text-lg truncate">{tool.name}</h3>
          <span
            className="text-xs px-2 py-0.5 rounded-full inline-block mt-1"
            style={{
              backgroundColor: `${tool.color}20`,
              color: tool.color,
            }}
          >
            {tool.difficulty === "beginner"
              ? "入门"
              : tool.difficulty === "intermediate"
              ? "进阶"
              : "高级"}
          </span>
        </div>
      </div>
      <p className="text-gray-600 text-xs sm:text-sm line-clamp-2">{tool.description}</p>
      <div className="mt-3 sm:mt-4 flex items-center text-sm" style={{ color: tool.color }}>
        <span>查看学习资源 &rarr;</span>
      </div>
    </a>
  );
}