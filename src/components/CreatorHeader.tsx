import React from 'react';
import { CreatorProfile } from '../types';
import { 
  Instagram, 
  Copy, 
  ExternalLink, 
  Edit3, 
  Code2, 
  Heart, 
  Sparkles,
  Github,
  Youtube,
  Globe,
  Share2
} from 'lucide-react';

interface CreatorHeaderProps {
  profile: CreatorProfile;
  totalProjects: number;
  totalPromptCopies: number;
  totalLikes: number;
  isCreatorMode: boolean;
  onEditProfile: () => void;
  onCopyShowcaseLink: () => void;
}

export const CreatorHeader: React.FC<CreatorHeaderProps> = ({
  profile,
  totalProjects,
  totalPromptCopies,
  totalLikes,
  isCreatorMode,
  onEditProfile,
  onCopyShowcaseLink
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl mb-8">
      {/* Background Glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative p-6 sm:p-8 flex flex-col md:flex-row items-center md:items-start gap-6">
        
        {/* Profile Avatar */}
        <div className="relative shrink-0 group">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden ring-4 ring-indigo-500/30 p-1 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-xl">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-full h-full object-cover rounded-[12px] group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-slate-950 border border-slate-700 p-1.5 rounded-full text-indigo-400 shadow-md">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        {/* Info & Bio */}
        <div className="flex-1 text-center md:text-left space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {profile.name}
                </h2>
                {isCreatorMode && (
                  <button
                    onClick={onEditProfile}
                    className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                    title="Edit Creator Bio"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <a
                href={profile.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-pink-400 hover:text-pink-300 transition-colors mt-0.5"
              >
                <Instagram className="w-4 h-4" />
                <span>{profile.handle}</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={onCopyShowcaseLink}
                className="flex items-center gap-2 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-sm"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Bio Link</span>
              </button>
              
              <a
                href={profile.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-md shadow-pink-600/20"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Follow on IG</span>
              </a>
            </div>
          </div>

          <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
            {profile.bio}
          </p>

          {/* Social Links Row */}
          <div className="flex items-center justify-center md:justify-start gap-3 pt-1">
            {profile.instagramUrl && (
              <a
                href={profile.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-pink-400 transition-colors p-1"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            )}
            {profile.githubUrl && (
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors p-1"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {profile.youtubeUrl && (
              <a
                href={profile.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-red-400 transition-colors p-1"
                title="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            )}
            {profile.websiteUrl && (
              <a
                href={profile.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-indigo-400 transition-colors p-1"
                title="Google AI Studio"
              >
                <Globe className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-3 border-t border-slate-800/80 max-w-lg">
            <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 text-center md:text-left">
              <div className="text-xs text-slate-400 font-medium flex items-center justify-center md:justify-start gap-1">
                <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Projects</span>
              </div>
              <div className="text-lg font-bold text-white mt-0.5">{totalProjects}</div>
            </div>

            <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 text-center md:text-left">
              <div className="text-xs text-slate-400 font-medium flex items-center justify-center md:justify-start gap-1">
                <Copy className="w-3.5 h-3.5 text-purple-400" />
                <span>Prompts Copied</span>
              </div>
              <div className="text-lg font-bold text-white mt-0.5">{totalPromptCopies}</div>
            </div>

            <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 text-center md:text-left">
              <div className="text-xs text-slate-400 font-medium flex items-center justify-center md:justify-start gap-1">
                <Heart className="w-3.5 h-3.5 text-rose-400" />
                <span>Upvotes</span>
              </div>
              <div className="text-lg font-bold text-white mt-0.5">{totalLikes}</div>
            </div>
          </div>

          {/* Custom Notice Banner */}
          {profile.customNotice && (
            <div className="mt-3 p-3 rounded-xl bg-indigo-950/50 border border-indigo-800/50 text-indigo-200 text-xs flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>{profile.customNotice}</span>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
