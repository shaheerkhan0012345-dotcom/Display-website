import React from 'react';
import { Category } from '../types';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: Category;
  onSelectCategory: (cat: Category) => void;
  showFeaturedOnly?: boolean;
  setShowFeaturedOnly?: (val: boolean) => void;
  selectedDifficulty: string;
  setSelectedDifficulty: (diff: string) => void;
  sortBy: 'popular' | 'newest' | 'likes';
  setSortBy: (sort: 'popular' | 'newest' | 'likes') => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  selectedDifficulty,
  setSelectedDifficulty,
  sortBy,
  setSortBy,
}) => {
  return (
    <div className="space-y-4 mb-6">
      {/* Category Pills Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none scroll-smooth">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                isActive
                  ? 'bg-white text-black shadow-md font-bold'
                  : 'bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 border border-zinc-800/80 hover:border-zinc-700'
              }`}
            >
              {cat === 'All' && <span>⚡</span>}
              {cat === 'AI Apps' && <span>🤖</span>}
              {cat === 'Web Tools' && <span>🛠️</span>}
              {cat === 'E-Commerce' && <span>🛍️</span>}
              {cat === 'Games' && <span>🎮</span>}
              {cat === 'Dashboards' && <span>📊</span>}
              {cat === 'Landing Pages' && <span>🚀</span>}
              <span>{cat}</span>
            </button>
          );
        })}
      </div>

      {/* Sub-filters & Sort options */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-300 bg-zinc-950/80 p-3 rounded-2xl border border-zinc-800/80 backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Difficulty Filter */}
          <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg">
            <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400" />
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="bg-transparent text-xs text-zinc-200 focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-zinc-900">All Levels</option>
              <option value="Beginner" className="bg-zinc-900">Beginner</option>
              <option value="Intermediate" className="bg-zinc-900">Intermediate</option>
              <option value="Advanced" className="bg-zinc-900">Advanced</option>
            </select>
          </div>

        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />
          <span className="hidden sm:inline text-zinc-400">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-zinc-500 cursor-pointer"
          >
            <option value="popular" className="bg-zinc-900">Most Viewed</option>
            <option value="likes" className="bg-zinc-900">Highest Rated ❤️</option>
            <option value="newest" className="bg-zinc-900">Recently Added</option>
          </select>
        </div>
      </div>
    </div>
  );
};
