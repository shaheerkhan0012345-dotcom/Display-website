import React, { useState, useEffect } from 'react';
import { Category, Project } from '../types';
import { 
  X, 
  Sparkles, 
  Plus, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Terminal, 
  Tag, 
  Flame,
  Wand2,
  Loader2
} from 'lucide-react';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Omit<Project, 'id' | 'views' | 'likes' | 'createdAt'>, existingId?: string) => void;
  editingProject?: Project | null;
  categories: Category[];
}

const DEFAULT_PRESET_IMAGES = [
  "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800"
];

export const AddProjectModal: React.FC<AddProjectModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingProject,
  categories
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Category>('AI Apps');
  const [prompt, setPrompt] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [instagramPostUrl, setInstagramPostUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState(DEFAULT_PRESET_IMAGES[0]);
  const [tagsInput, setTagsInput] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [isEnhancing, setIsEnhancing] = useState(false);

  useEffect(() => {
    if (editingProject) {
      setTitle(editingProject.title);
      setDescription(editingProject.description);
      setCategory(editingProject.category);
      setPrompt(editingProject.prompt);
      setLiveUrl(editingProject.liveUrl);
      setGithubUrl(editingProject.githubUrl || '');
      setInstagramPostUrl(editingProject.instagramPostUrl || '');
      setThumbnailUrl(editingProject.thumbnailUrl);
      setTagsInput(editingProject.tags.join(', '));
      setIsFeatured(editingProject.isFeatured);
      setDifficulty(editingProject.difficulty || 'Beginner');
    } else {
      setTitle('');
      setDescription('');
      setCategory('AI Apps');
      setPrompt('');
      setLiveUrl('');
      setGithubUrl('');
      setInstagramPostUrl('');
      setThumbnailUrl(DEFAULT_PRESET_IMAGES[0]);
      setTagsInput('React, AI, Tailwind');
      setIsFeatured(false);
      setDifficulty('Beginner');
    }
  }, [editingProject, isOpen]);

  if (!isOpen) return null;

  const handleEnhancePrompt = async () => {
    if (!prompt.trim()) return;
    setIsEnhancing(true);
    try {
      const res = await fetch('/api/enhance-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ draftPrompt: prompt, projectTitle: title, category })
      });
      const data = await res.json();
      if (data.enhancedPrompt) {
        setPrompt(data.enhancedPrompt);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !prompt.trim() || !liveUrl.trim()) return;

    const tagsArr = tagsInput
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    onSave(
      {
        title,
        description: description || 'No description provided.',
        category,
        prompt,
        liveUrl,
        githubUrl: githubUrl.trim() || undefined,
        instagramPostUrl: instagramPostUrl.trim() || undefined,
        thumbnailUrl: thumbnailUrl || DEFAULT_PRESET_IMAGES[0],
        tags: tagsArr.length > 0 ? tagsArr : ['React'],
        isFeatured,
        difficulty
      },
      editingProject?.id
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="p-6 bg-black border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-zinc-900 text-zinc-100">
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                {editingProject ? 'Edit Web App' : 'Add Web App'}
              </h2>
              <p className="text-xs text-zinc-400">
                Share your web application link & prompt with followers
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          
          {/* Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-semibold text-zinc-300">Project Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. AI Recipe Generator"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-300">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-zinc-500 cursor-pointer"
              >
                {categories.filter((c) => c !== 'All').map((cat) => (
                  <option key={cat} value={cat} className="bg-black">
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-300">Tagline / Short Description</label>
            <input
              type="text"
              placeholder="What does this website do? (e.g. Generates custom meal plans from fridge leftovers)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-black border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
            />
          </div>

          {/* Live URL & Instagram Link */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1">
                <LinkIcon className="w-3.5 h-3.5 text-zinc-400" /> Live Website URL *
              </label>
              <input
                type="url"
                required
                placeholder="https://myproject.com"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-300">Instagram Post URL (Optional)</label>
              <input
                type="url"
                placeholder="https://instagram.com/p/..."
                value={instagramPostUrl}
                onChange={(e) => setInstagramPostUrl(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
              />
            </div>
          </div>

          {/* Prompt input with AI Enhancer */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5 text-zinc-400" /> AI Build Prompt *
              </label>

              <button
                type="button"
                onClick={handleEnhancePrompt}
                disabled={isEnhancing || !prompt.trim()}
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-lg transition-all disabled:opacity-50"
              >
                {isEnhancing ? (
                  <>
                    <Loader2 className="w-3 h-3 animate-spin text-zinc-400" />
                    <span>Enhancing...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-3 h-3 text-emerald-400" />
                    <span>Improve Prompt with AI</span>
                  </>
                )}
              </button>
            </div>

            <textarea
              required
              rows={4}
              placeholder="Paste the prompt you used in AI Studio or ChatGPT to build this website..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-xs font-mono text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 leading-relaxed"
            />
          </div>

          {/* Thumbnail URL & Presets */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1">
              <ImageIcon className="w-3.5 h-3.5 text-zinc-400" /> Thumbnail Image URL
            </label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              className="w-full bg-black border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
            />

            {/* Presets */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[10px] text-zinc-500">Pick preset:</span>
              <div className="flex gap-1.5 overflow-x-auto">
                {DEFAULT_PRESET_IMAGES.map((imgUrl, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setThumbnailUrl(imgUrl)}
                    className={`w-8 h-8 rounded-lg overflow-hidden border-2 transition-all ${
                      thumbnailUrl === imgUrl ? 'border-white scale-105' : 'border-zinc-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt="preset" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tags & Difficulty */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-zinc-400" /> Tech Tags (comma separated)
              </label>
              <input
                type="text"
                placeholder="React, AI, Tailwind"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-300">Difficulty Level</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as any)}
                className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-zinc-500 cursor-pointer"
              >
                <option value="Beginner" className="bg-black">Beginner</option>
                <option value="Intermediate" className="bg-black">Intermediate</option>
                <option value="Advanced" className="bg-black">Advanced</option>
              </select>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-xl text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-white hover:bg-zinc-200 text-black rounded-xl text-xs font-bold transition-all shadow-md"
            >
              {editingProject ? 'Save Changes' : 'Publish Project'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
