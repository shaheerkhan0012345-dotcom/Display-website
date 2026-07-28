import React, { useState } from 'react';
import { Project } from '../types';
import { 
  X, 
  Copy, 
  Check, 
  ExternalLink, 
  Sparkles, 
  Terminal, 
  Share2, 
  Instagram, 
  Github, 
  Flame,
  ArrowRight
} from 'lucide-react';

interface PromptModalProps {
  project: Project | null;
  onClose: () => void;
  onCopyPrompt: (project: Project) => void;
  onCopyDirectLink: (project: Project) => void;
}

export const PromptModal: React.FC<PromptModalProps> = ({
  project,
  onClose,
  onCopyPrompt,
  onCopyDirectLink,
}) => {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!project) return null;

  const handleCopyPrompt = () => {
    onCopyPrompt(project);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2200);
  };

  const handleCopyLink = () => {
    onCopyDirectLink(project);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Modal Header Banner */}
        <div className="relative h-44 sm:h-52 bg-black shrink-0">
          <img
            src={project.thumbnailUrl}
            alt={project.title}
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Info */}
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-white text-black font-bold text-xs px-2.5 py-0.5 rounded-full">
                {project.category}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Description & Links */}
          <div>
            <p className="text-zinc-300 text-sm leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-4">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white hover:bg-zinc-200 text-black font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Visit Live Site</span>
              </a>

              {project.instagramPostUrl && (
                <a
                  href={project.instagramPostUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all"
                >
                  <Instagram className="w-4 h-4 text-pink-400" />
                  <span>Instagram Post</span>
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all"
                >
                  <Github className="w-4 h-4" />
                  <span>Source Code</span>
                </a>
              )}

              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 text-xs font-medium px-3 py-2.5 rounded-xl transition-all ml-auto"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Link Copied!' : 'Share Link'}</span>
              </button>
            </div>
          </div>

          {/* Prompt Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Terminal className="w-4 h-4 text-zinc-400" />
                <span>Full AI Build Prompt</span>
              </h3>

              <button
                onClick={handleCopyPrompt}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 ${
                  copiedPrompt
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white hover:bg-zinc-200 text-black'
                }`}
              >
                {copiedPrompt ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Prompt Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Full Prompt</span>
                  </>
                )}
              </button>
            </div>

            {/* Formatted Code Block */}
            <div className="relative bg-black rounded-2xl border border-zinc-800 p-4 font-mono text-xs text-zinc-200 leading-relaxed overflow-x-auto selection:bg-white selection:text-black">
              <pre className="whitespace-pre-wrap break-words">{project.prompt}</pre>
            </div>
          </div>

          {/* Instructions Box: How to use */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4 text-xs text-zinc-300 space-y-2">
            <h4 className="font-bold text-white flex items-center gap-1.5 text-sm">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>How to build this yourself in seconds</span>
            </h4>
            <ol className="list-decimal list-inside space-y-1 text-zinc-300 leading-relaxed pl-1">
              <li>Click the <strong className="text-white">Copy Full Prompt</strong> button above.</li>
              <li>Go to <a href="https://ai.studio/build" target="_blank" rel="noopener noreferrer" className="text-white underline font-semibold hover:text-zinc-200">Google AI Studio Build</a> (or ChatGPT / Claude).</li>
              <li>Paste the prompt directly into the prompt box and press enter!</li>
              <li>Watch the AI automatically generate and preview this exact app live in your browser.</li>
            </ol>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-800">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono bg-zinc-900 text-zinc-300 px-3 py-1 rounded-lg border border-zinc-800"
              >
                #{tag}
              </span>
            ))}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-black/90 border-t border-zinc-800 flex items-center justify-between shrink-0">
          <span className="text-xs text-zinc-500">
            Created on {project.createdAt}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-xl text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
