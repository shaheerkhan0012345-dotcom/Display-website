import React, { useState } from 'react';
import { Project } from '../types';
import { 
  Copy, 
  Check, 
  ExternalLink, 
  Terminal, 
  Heart, 
  Sparkles,
  Edit,
  Trash2
} from 'lucide-react';

interface CompactListItemProps {
  project: Project;
  onCopyPrompt: (project: Project) => void;
  onViewPromptModal: (project: Project) => void;
  onLike: (projectId: string) => void;
  isCreatorMode: boolean;
  onEditProject?: (project: Project) => void;
  onDeleteProject?: (projectId: string) => void;
}

export const CompactListItem: React.FC<CompactListItemProps> = ({
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
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasLiked) {
      onLike(project.id);
      setHasLiked(true);
    }
  };

  return (
    <div className="group bg-zinc-950 border border-zinc-800 hover:border-zinc-600 rounded-2xl p-4 transition-all duration-200 hover:shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      
      {/* Thumbnail + Title + Info */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <img
          src={project.thumbnailUrl}
          alt={project.title}
          className="w-14 h-14 rounded-xl object-cover shrink-0 border border-zinc-800"
        />
        
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 
              onClick={() => onViewPromptModal(project)}
              className="text-sm font-bold text-white hover:text-zinc-300 transition-colors cursor-pointer truncate"
            >
              {project.title}
            </h3>
            <span className="text-[10px] font-mono bg-zinc-900 text-zinc-300 border border-zinc-800 px-2 py-0.5 rounded-full shrink-0">
              {project.category}
            </span>
          </div>

          <p className="text-xs text-zinc-400 truncate mt-0.5">
            {project.description}
          </p>

          <div className="flex items-center gap-2 mt-1.5 text-[10px] text-zinc-400">
            <span className="flex items-center gap-1 font-mono text-zinc-300">
              <Sparkles className="w-3 h-3 text-emerald-400" /> Prompt Available
            </span>
            <span>•</span>
            <span>❤️ {project.likes + (hasLiked ? 1 : 0)} upvotes</span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-2 shrink-0">
        
        {/* Copy Prompt Button */}
        <button
          onClick={handleCopyClick}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            copied
              ? 'bg-emerald-600 text-white'
              : 'bg-white hover:bg-zinc-200 text-black'
          }`}
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy Prompt'}</span>
        </button>

        {/* Inspect Prompt Modal */}
        <button
          onClick={() => onViewPromptModal(project)}
          className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition-colors"
          title="Inspect prompt text"
        >
          <Terminal className="w-4 h-4 text-zinc-300" />
        </button>

        {/* Visit Live Website */}
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition-colors"
          title="Visit Live Site"
        >
          <ExternalLink className="w-4 h-4" />
        </a>

        {/* Like */}
        <button
          onClick={handleLikeClick}
          className={`p-2 rounded-xl border transition-colors ${
            hasLiked ? 'bg-rose-500/20 border-rose-500/40 text-rose-400' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-rose-400'
          }`}
          title="Upvote"
        >
          <Heart className={`w-4 h-4 ${hasLiked ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Creator Edit/Delete */}
        {isCreatorMode && (
          <div className="flex items-center gap-1 pl-2 border-l border-zinc-800">
            {onEditProject && (
              <button
                onClick={() => onEditProject(project)}
                className="p-1.5 text-zinc-400 hover:text-white"
                title="Edit"
              >
                <Edit className="w-3.5 h-3.5" />
              </button>
            )}
            {onDeleteProject && (
              <button
                onClick={() => onDeleteProject(project.id)}
                className="p-1.5 text-zinc-400 hover:text-rose-400"
                title="Delete"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
