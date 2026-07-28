import React, { useState, useEffect } from 'react';
import { CreatorProfile } from '../types';
import { X, User, Instagram, Sparkles, Globe, Github, Youtube } from 'lucide-react';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: CreatorProfile;
  onSave: (updated: CreatorProfile) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
}) => {
  const [name, setName] = useState(profile.name);
  const [handle, setHandle] = useState(profile.handle);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl);
  const [bio, setBio] = useState(profile.bio);
  const [instagramUrl, setInstagramUrl] = useState(profile.instagramUrl);
  const [youtubeUrl, setYoutubeUrl] = useState(profile.youtubeUrl || '');
  const [githubUrl, setGithubUrl] = useState(profile.githubUrl || '');
  const [websiteUrl, setWebsiteUrl] = useState(profile.websiteUrl || '');
  const [customNotice, setCustomNotice] = useState(profile.customNotice || '');

  useEffect(() => {
    setName(profile.name);
    setHandle(profile.handle);
    setAvatarUrl(profile.avatarUrl);
    setBio(profile.bio);
    setInstagramUrl(profile.instagramUrl);
    setYoutubeUrl(profile.youtubeUrl || '');
    setGithubUrl(profile.githubUrl || '');
    setWebsiteUrl(profile.websiteUrl || '');
    setCustomNotice(profile.customNotice || '');
  }, [profile, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      handle,
      avatarUrl,
      bio,
      instagramUrl,
      youtubeUrl: youtubeUrl.trim() || undefined,
      githubUrl: githubUrl.trim() || undefined,
      websiteUrl: websiteUrl.trim() || undefined,
      customNotice: customNotice.trim() || undefined
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-pink-600/20 text-pink-400">
              <Instagram className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Edit Instagram Profile Header</h2>
              <p className="text-xs text-slate-400">Customize how followers see your bio & links</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Creator Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Instagram Handle</label>
              <input
                type="text"
                required
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Avatar Image URL</label>
            <input
              type="url"
              required
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Bio Text</label>
            <textarea
              rows={3}
              required
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 leading-relaxed"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Instagram Profile Link</label>
            <input
              type="url"
              required
              value={instagramUrl}
              onChange={(e) => setInstagramUrl(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Custom Tip / Banner Notice</label>
            <input
              type="text"
              placeholder="e.g. 💡 Tip: Click 'Copy Prompt' to rebuild my apps in Google AI Studio!"
              value={customNotice}
              onChange={(e) => setCustomNotice(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-pink-600/30"
            >
              Save Profile
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
