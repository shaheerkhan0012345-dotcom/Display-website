import React, { useState, useEffect, useMemo } from 'react';
import { Category, CreatorProfile, Project, ToastMessage, ViewMode } from './types';
import { initialCreatorProfile, initialProjects } from './data/initialData';
import { CategoryFilter } from './components/CategoryFilter';
import { ProjectCard } from './components/ProjectCard';
import { CompactListItem } from './components/CompactListItem';
import { PromptModal } from './components/PromptModal';
import { AddProjectModal } from './components/AddProjectModal';
import { Toast } from './components/Toast';
import { 
  Sparkles, 
  Terminal, 
  Download, 
  RotateCcw, 
  SearchX, 
  Search,
  LayoutGrid,
  List,
  Plus,
  ShieldCheck
} from 'lucide-react';

const CATEGORIES: Category[] = [
  'All',
  'AI Apps',
  'Web Tools',
  'E-Commerce',
  'Games',
  'Dashboards',
  'Landing Pages'
];

export default function App() {
  // Persistence State
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('showcase_projects_v10');
      return saved ? JSON.parse(saved) : initialProjects;
    } catch (e) {
      return initialProjects;
    }
  });

  const [profile, setProfile] = useState<CreatorProfile>(() => {
    try {
      const saved = localStorage.getItem('showcase_profile_v1');
      return saved ? JSON.parse(saved) : initialCreatorProfile;
    } catch (e) {
      return initialCreatorProfile;
    }
  });

  const [promptCopyCount, setPromptCopyCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('showcase_copies_v1');
      return saved ? parseInt(saved, 10) : 148;
    } catch (e) {
      return 148;
    }
  });

  // UI State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'likes'>('popular');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [isCreatorMode, setIsCreatorMode] = useState(false);

  // Modals & Notifications
  const [inspectProject, setInspectProject] = useState<Project | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem('showcase_projects_v10', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('showcase_profile_v1', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('showcase_copies_v1', promptCopyCount.toString());
  }, [promptCopyCount]);

  // Handle permalink anchor selection if present in URL
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const found = projects.find((p) => p.id === hash);
      if (found) {
        setInspectProject(found);
      }
    }
  }, [projects]);

  // Add Toast Notification
  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // COPY PROMPT TO CLIPBOARD
  const handleCopyPrompt = (project: Project) => {
    try {
      navigator.clipboard.writeText(project.prompt);
      setPromptCopyCount((prev) => prev + 1);
      addToast(`Prompt for "${project.title}" copied to clipboard! Paste into AI Studio or ChatGPT.`);
    } catch (err) {
      addToast('Failed to copy prompt to clipboard', 'error');
    }
  };

  // COPY DIRECT PROJECT / SHOWCASE LINK
  const handleCopyDirectLink = (project: Project) => {
    try {
      const url = `${window.location.origin}${window.location.pathname}#${project.id}`;
      navigator.clipboard.writeText(url);
      addToast(`Link to "${project.title}" copied to clipboard!`);
    } catch (err) {
      addToast('Failed to copy direct link', 'error');
    }
  };

  const handleCopyShowcaseLink = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      addToast('Showcase Bio Link copied to clipboard! Share on Instagram or Twitter.');
    } catch (err) {
      addToast('Failed to copy showcase link', 'error');
    }
  };

  // LIKE / UPVOTE
  const handleLikeProject = (projectId: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, likes: p.likes + 1 } : p))
    );
    addToast('Thanks for upvoting this prompt! ❤️', 'info');
  };

  // SAVE NEW OR EDITED PROJECT
  const handleSaveProject = (
    projectData: Omit<Project, 'id' | 'views' | 'likes' | 'createdAt'>,
    existingId?: string
  ) => {
    if (existingId) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === existingId
            ? { ...p, ...projectData }
            : p
        )
      );
      addToast(`Updated "${projectData.title}"!`);
    } else {
      const newProj: Project = {
        ...projectData,
        id: `proj-${Date.now()}`,
        views: 10,
        likes: 1,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setProjects((prev) => [newProj, ...prev]);
      addToast(`Published "${projectData.title}" to your showcase!`);
    }
    setEditingProject(null);
  };

  // DELETE PROJECT
  const handleDeleteProject = (projectId: string) => {
    const p = projects.find((x) => x.id === projectId);
    if (confirm(`Are you sure you want to delete "${p?.title || 'this project'}"?`)) {
      setProjects((prev) => prev.filter((x) => x.id !== projectId));
      addToast('Project removed from showcase.');
    }
  };

  // RESET DEFAULT DEMO DATA
  const handleResetData = () => {
    if (confirm('Reset showcase projects to initial demo dataset?')) {
      setProjects(initialProjects);
      setProfile(initialCreatorProfile);
      setPromptCopyCount(148);
      addToast('Showcase reset to initial demo projects.');
    }
  };

  // EXPORT JSON DATA
  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ projects, profile }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `showcase_portfolio_backup.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    addToast('Exported showcase portfolio JSON backup!');
  };

  // FILTER & SORT LOGIC
  const filteredProjects = useMemo(() => {
    return projects
      .filter((project) => {
        // Category Filter
        if (selectedCategory !== 'All' && project.category !== selectedCategory) {
          return false;
        }

        // Featured Filter
        if (showFeaturedOnly && !project.isFeatured) {
          return false;
        }

        // Difficulty Filter
        if (selectedDifficulty !== 'All' && project.difficulty !== selectedDifficulty) {
          return false;
        }

        // Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = project.title.toLowerCase().includes(q);
          const matchDesc = project.description.toLowerCase().includes(q);
          const matchPrompt = project.prompt.toLowerCase().includes(q);
          const matchCategory = project.category.toLowerCase().includes(q);
          const matchTags = project.tags.some((t) => t.toLowerCase().includes(q));

          return matchTitle || matchDesc || matchPrompt || matchCategory || matchTags;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'popular') return b.views - a.views;
        if (sortBy === 'likes') return b.likes - a.likes;
        if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        return 0;
      });
  }, [projects, selectedCategory, showFeaturedOnly, selectedDifficulty, searchQuery, sortBy]);

  const totalLikesCount = useMemo(() => {
    return projects.reduce((acc, curr) => acc + curr.likes, 0);
  }, [projects]);

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-white selection:text-black flex flex-col">
      
      {/* Toast Overlay */}
      <Toast toasts={toasts} onDismiss={handleDismissToast} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Top Control Header Toolbar (Sleek Black & White AI Aesthetic) */}
        <div className="bg-zinc-950/80 border border-zinc-800/90 backdrop-blur-xl rounded-2xl p-4 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Brand & Search */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto flex-1">
            <div className="flex items-center gap-2 shrink-0">
              <div className="p-2 bg-white rounded-xl text-black shadow-lg shadow-white/10">
                <Sparkles className="w-5 h-5 text-black" />
              </div>
              <h1 className="text-lg font-bold tracking-tight text-white">
                AI Build Hub
              </h1>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search web apps, prompts, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400/20 transition-all"
              />
            </div>
          </div>

          {/* Controls: View Mode & Add Button */}
          <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto shrink-0 border-t md:border-t-0 border-zinc-800 pt-3 md:pt-0">
            
            {/* View Mode Toggle */}
            <div className="flex items-center bg-zinc-900 border border-zinc-800 p-1 rounded-xl">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white text-black shadow-md'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'list'
                    ? 'bg-white text-black shadow-md'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Add Project Button */}
            <button
              onClick={() => {
                setEditingProject(null);
                setIsAddModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-zinc-200 text-black rounded-xl text-xs font-bold transition-all shadow-md shadow-white/10 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add Web App</span>
            </button>
          </div>

        </div>

        {/* Bold Typography Title */}
        <div className="py-2 flex items-center justify-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Follow <span className="text-zinc-400 hover:text-zinc-200 transition-colors duration-200">shaheer_build</span> if you like these templates
          </h2>
        </div>

        {/* Projects Display Grid / List */}
        {filteredProjects.length === 0 ? (
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-12 text-center my-8 max-w-xl mx-auto space-y-4">
            <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center mx-auto text-zinc-300">
              <SearchX className="w-8 h-8 text-zinc-400" />
            </div>
            <h3 className="text-xl font-bold text-white">No web apps found</h3>
            <p className="text-sm text-zinc-400">
              Try adjusting your search query or category filters to see available projects.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedDifficulty('All');
              }}
              className="px-4 py-2 bg-white text-black hover:bg-zinc-200 rounded-xl text-xs font-bold transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.slice(0, 3).map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onCopyPrompt={handleCopyPrompt}
                onViewPromptModal={setInspectProject}
                onLike={handleLikeProject}
                isCreatorMode={isCreatorMode}
                onEditProject={(p) => {
                  setEditingProject(p);
                  setIsAddModalOpen(true);
                }}
                onDeleteProject={handleDeleteProject}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3 max-w-4xl mx-auto">
            {filteredProjects.slice(0, 3).map((project) => (
              <CompactListItem
                key={project.id}
                project={project}
                onCopyPrompt={handleCopyPrompt}
                onViewPromptModal={setInspectProject}
                onLike={handleLikeProject}
                isCreatorMode={isCreatorMode}
                onEditProject={(p) => {
                  setEditingProject(p);
                  setIsAddModalOpen(true);
                }}
                onDeleteProject={handleDeleteProject}
              />
            ))}
          </div>
        )}

      </main>

      {/* Modals */}
      <PromptModal
        project={inspectProject}
        onClose={() => setInspectProject(null)}
        onCopyPrompt={handleCopyPrompt}
        onCopyDirectLink={handleCopyDirectLink}
      />

      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingProject(null);
        }}
        onSave={handleSaveProject}
        editingProject={editingProject}
        categories={CATEGORIES}
      />

    </div>
  );
}
