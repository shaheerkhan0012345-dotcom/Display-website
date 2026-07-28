import React from 'react';
import { ViewMode } from '../types';
import { 
  Sparkles, 
  Search, 
  LayoutGrid, 
  List, 
  Plus, 
  Share2, 
  ShieldCheck, 
  User,
  SlidersHorizontal
} from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  isCreatorMode: boolean;
  setIsCreatorMode: (val: boolean) => void;
  onOpenAddModal: () => void;
  onCopyShowcaseLink: () => void;
  totalProjects: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  isCreatorMode,
  setIsCreatorMode,
  onOpenAddModal,
  onCopyShowcaseLink,
  totalProjects
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 text-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <h1 className="font-bold text-base sm:text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent flex items-center gap-2">
              PromptShowcase
              <span className="text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase">
                Hub
              </span>
            </h1>
            <p className="text-xs text-slate-400 hidden sm:block">
              {totalProjects} Projects & Copyable AI Prompts
            </p>
          </div>
        </div>

        {/* Quick Search Input */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search websites, technologies, or prompt keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white bg-slate-800 px-1.5 py-0.5 rounded"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* View Mode Toggle */}
          <div className="bg-slate-900 border border-slate-800 p-1 rounded-xl flex items-center text-slate-400">
            <button
              onClick={() => setViewMode('grid')}
              title="Grid View"
              className={`p-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${
                viewMode === 'grid'
                  ? 'bg-slate-800 text-indigo-400 shadow-sm'
                  : 'hover:text-slate-200'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              title="Bio Link List View"
              className={`p-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${
                viewMode === 'list'
                  ? 'bg-slate-800 text-indigo-400 shadow-sm'
                  : 'hover:text-slate-200'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Share Showcase button */}
          <button
            onClick={onCopyShowcaseLink}
            className="hidden sm:flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 px-3 py-2 rounded-xl text-xs font-medium transition-all hover:border-slate-700"
          >
            <Share2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Share Hub</span>
          </button>

          {/* Creator Mode Switcher */}
          <button
            onClick={() => setIsCreatorMode(!isCreatorMode)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
              isCreatorMode
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
            }`}
          >
            {isCreatorMode ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Creator Mode</span>
              </>
            ) : (
              <>
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Follower View</span>
              </>
            )}
          </button>

          {/* Add Project Button (If Creator Mode) */}
          {isCreatorMode && (
            <button
              onClick={onOpenAddModal}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium text-xs px-3.5 py-2 rounded-xl shadow-lg shadow-indigo-600/20 transition-all transform active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add Project</span>
            </button>
          )}

        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="px-4 pb-3 md:hidden">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search projects or copy prompts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>
    </header>
  );
};
