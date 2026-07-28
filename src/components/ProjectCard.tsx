import React, { useState } from 'react';
import { Project } from '../types';
import { 
  Copy, 
  Check, 
  ExternalLink, 
  Eye, 
  Heart, 
  Sparkles, 
  Edit, 
  Trash2, 
  Flame,
  Code2,
  Instagram,
  Terminal
} from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onCopyPrompt: (project: Project) => void;
  onViewPromptModal: (project: Project) => void;
  onLike: (projectId: string) => void;
  isCreatorMode: boolean;
  onEditProject?: (project: Project) => void;
  onDeleteProject?: (projectId: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onCopyPrompt,
  onViewPromptModal,
  onLike,
  isCreatorMode,
  onEditProject,
  onDeleteProject,
}) => {
  const [copied, setCopied] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);

  const handleCopyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCopyPrompt(project);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasLiked) {
      onLike(project.id);
      setHasLiked(true);
    }
  };

  return (
    <div className="group relative bg-zinc-950 border border-zinc-800/90 hover:border-zinc-500/80 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-white/5 flex flex-col h-full">
      
      {/* Thumbnail Banner */}
      <div className="relative h-48 sm:h-52 overflow-hidden bg-black">
        <img
          src={project.thumbnailUrl}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="bg-black/90 backdrop-blur-md text-zinc-200 text-[11px] font-mono font-medium px-2.5 py-1 rounded-full border border-zinc-700/80">
              {project.category}
            </span>
          </div>

          {project.difficulty && (
            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full backdrop-blur-md border bg-zinc-900/90 text-zinc-300 border-zinc-700/80">
              {project.difficulty}
            </span>
          )}
        </div>

        {/* Quick Hover Overlay: View Details */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 p-4">
          <button
            onClick={() => onViewPromptModal(project)}
            className="bg-zinc-900/90 hover:bg-zinc-800 text-white font-medium text-xs px-4 py-2.5 rounded-xl border border-zinc-700 shadow-xl flex items-center gap-2 transition-all transform hover:scale-105"
          >
            <Terminal className="w-4 h-4 text-zinc-300" />
            <span>Inspect Prompt</span>
          </button>
          
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white hover:bg-zinc-200 text-black font-bold text-xs px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 transition-all transform hover:scale-105"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Live Demo</span>
          </a>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Header & Title */}
          <div className="flex items-start justify-between gap-2">
            <h3 
              onClick={() => onViewPromptModal(project)}
              className="text-lg font-bold text-white group-hover:text-zinc-300 transition-colors cursor-pointer line-clamp-1"
            >
              {project.title}
            </h3>

            {/* Creator Actions */}
            {isCreatorMode && (
              <div className="flex items-center gap-1 shrink-0">
                {onEditProject && (
                  <button
                    onClick={() => onEditProject(project)}
                    className="p-1 text-zinc-400 hover:text-white rounded transition-colors"
                    title="Edit project"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                )}
                {onDeleteProject && (
                  <button
                    onClick={() => onDeleteProject(project.id)}
                    className="p-1 text-zinc-400 hover:text-rose-400 rounded transition-colors"
                    title="Delete project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>

          <p className="text-xs text-zinc-400 mt-1.5 line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono bg-zinc-900 text-zinc-300 px-2 py-0.5 rounded-md border border-zinc-800"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Prompt Preview Snippet */}
        <div 
          onClick={() => onViewPromptModal(project)}
          className="bg-black rounded-xl p-2.5 border border-zinc-800 cursor-pointer hover:border-zinc-700 transition-colors group/code"
        >
          <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono mb-1">
            <span className="flex items-center gap-1 text-zinc-200 font-semibold">
              <Sparkles className="w-3 h-3 text-emerald-400" /> AI Prompt
            </span>
            <span className="text-zinc-500 group-hover/code:text-zinc-300 transition-colors">Expand</span>
          </div>
          <p className="text-[11px] font-mono text-zinc-300 line-clamp-2 italic leading-snug">
            "{project.prompt}"
          </p>
        </div>

        {/* Bottom Actions Row */}
        <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between gap-2">
          
          {/* Primary Action 1: COPY PROMPT BUTTON */}
          <button
            onClick={handleCopyClick}
            className={`flex-1 flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 ${
              copied
                ? 'bg-emerald-600 text-white ring-2 ring-emerald-400/50'
                : 'bg-white hover:bg-zinc-200 text-black shadow-white/5'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 animate-in zoom-in" />
                <span>Prompt Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Prompt</span>
              </>
            )}
          </button>

          {/* Primary Action 2: VISIT LIVE SITE */}
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 transition-all hover:text-white"
            title="Visit Live Website"
          >
            <ExternalLink className="w-4 h-4" />
          </a>

          {/* Like Upvote Button */}
          <button
            onClick={handleLikeClick}
            className={`flex items-center gap-1 px-2.5 py-2.5 rounded-xl border text-xs font-semibold transition-colors ${
              hasLiked
                ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-rose-400 hover:border-zinc-700'
            }`}
            title="Upvote prompt"
          >
            <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>{project.likes + (hasLiked ? 1 : 0)}</span>
          </button>

        </div>

      </div>
    </div>
  );
};
