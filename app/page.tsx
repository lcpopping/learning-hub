"use client";

import { useState, useEffect } from "react";
import { Search, Sparkles } from "lucide-react";
import { ToolCard } from "@/components/ToolCard";
import { ResourceCard } from "@/components/ResourceCard";
import { CategoryCard } from "@/components/CategoryCard";
import { FilterBar } from "@/components/FilterBar";
import { categories, tools, resources, getFeaturedResources, searchResources, Resource } from "@/lib/data";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResources, setFilteredResources] = useState<Resource[]>(resources);
  const featured = getFeaturedResources();

  useEffect(() => {
    if (searchQuery.trim()) {
      setFilteredResources(searchResources(searchQuery));
    } else {
      setFilteredResources(resources);
    }
  }, [searchQuery]);

  const handleFilter = (filtered: Resource[]) => {
    setFilteredResources(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-10 sm:py-16">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-primary-100 text-xs sm:text-sm">Learning Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
            打造你的知识体系
          </h1>
          <p className="text-primary-100 text-sm sm:text-base lg:text-lg max-w-2xl mb-6 sm:mb-8">
            聚合高质量的学习资料，涵盖 AI 编程、历史、科学、商业、设计、语言等领域
          </p>

          {/* Search */}
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索学习资源..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 sm:py-3 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-300 text-sm sm:text-base"
            />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        {/* Categories Section */}
        <section className="mb-10 sm:mb-16">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
            <span className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 text-base sm:text-lg">
              📚
            </span>
            学习分类
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {categories.map((category) => {
              const categoryTools = tools.filter((t) => t.category === category.id);
              const categoryResources = resources.filter((r) => categoryTools.some((t) => t.id === r.tool));
              return (
                <CategoryCard
                  key={category.id}
                  category={category}
                  resourceCount={categoryResources.length}
                />
              );
            })}
          </div>
        </section>

        {/* Featured Videos */}
        <section className="mb-10 sm:mb-16">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
            <span className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-red-500 text-base sm:text-lg">
              ▶
            </span>
            热门视频
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {featured.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </section>

        {/* All Resources */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
            <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-500 text-base sm:text-lg">
              📖
            </span>
            全部资源
          </h2>

          <FilterBar resources={resources} onFilter={handleFilter} />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mt-4 sm:mt-6">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p>未找到匹配的资源，请尝试其他搜索词</p>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-6 sm:py-8 mt-12 sm:mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-xs sm:text-sm">Learning Hub - 专注知识体系化学习</p>
          <p className="text-xs mt-2">本网站仅供学习交流，资源版权归原作者所有</p>
        </div>
      </footer>
    </div>
  );
}