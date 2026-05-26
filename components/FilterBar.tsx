"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Resource } from "@/lib/data";

interface FilterBarProps {
  resources: Resource[];
  onFilter: (filtered: Resource[]) => void;
}

export function FilterBar({ resources, onFilter }: FilterBarProps) {
  const [selectedTool, setSelectedTool] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [expanded, setExpanded] = useState(false);

  const tools = ["all", "claude-code", "openclaude", "cursor", "github-copilot", "history", "science", "business", "design", "language", "programming"];
  const difficulties = ["all", "beginner", "intermediate", "advanced"];
  const types = ["all", "video", "documentation", "blog"];

  const handleFilter = (tool: string, difficulty: string, type: string) => {
    setSelectedTool(tool);
    setSelectedDifficulty(difficulty);
    setSelectedType(type);

    let filtered = [...resources];

    if (tool !== "all") {
      filtered = filtered.filter((r) => r.tool === tool);
    }
    if (difficulty !== "all") {
      filtered = filtered.filter((r) => r.difficulty === difficulty);
    }
    if (type !== "all") {
      filtered = filtered.filter((r) => r.type === type);
    }

    onFilter(filtered);
  };

  return (
    <div className="bg-gray-50 rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-center justify-between text-left lg:hidden"
      >
        <span className="font-medium text-sm">筛选条件</span>
        <svg
          className={cn("w-5 h-5 transition-transform", expanded && "rotate-180")}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div className={cn("p-4", !expanded && "hidden lg:block")}>
        <div className="flex flex-wrap gap-3">
          <div className="min-w-[120px]">
            <label className="text-xs text-gray-500 block mb-1">工具/分类</label>
            <select
              value={selectedTool}
              onChange={(e) => handleFilter(e.target.value, selectedDifficulty, selectedType)}
              className="w-full px-3 py-2 text-sm border rounded-lg bg-white"
            >
              {tools.map((t) => (
                <option key={t} value={t}>
                  {t === "all" ? "全部" : t.replace("-", " ").toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div className="min-w-[100px]">
            <label className="text-xs text-gray-500 block mb-1">难度</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => handleFilter(selectedTool, e.target.value, selectedType)}
              className="w-full px-3 py-2 text-sm border rounded-lg bg-white"
            >
              {difficulties.map((d) => (
                <option key={d} value={d}>
                  {d === "all" ? "全部" : d === "beginner" ? "入门" : d === "intermediate" ? "进阶" : "高级"}
                </option>
              ))}
            </select>
          </div>

          <div className="min-w-[100px]">
            <label className="text-xs text-gray-500 block mb-1">类型</label>
            <select
              value={selectedType}
              onChange={(e) => handleFilter(selectedTool, selectedDifficulty, e.target.value)}
              className="w-full px-3 py-2 text-sm border rounded-lg bg-white"
            >
              {types.map((t) => (
                <option key={t} value={t}>
                  {t === "all" ? "全部" : t === "video" ? "视频" : t === "documentation" ? "文档" : t}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}