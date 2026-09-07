import React, { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, Award, Cpu, Sparkles, Layers, Activity, Radio, ShieldCheck, Headphones, Rocket, Globe, Lock } from 'lucide-react';
import { Project } from '../types';
import { McnpLogo } from './McnpLogo';
import { IndMcLogo } from './IndMcLogo';
import { DiscordBotLogo } from './DiscordBotLogo';
import { GanaLogo } from './GanaLogo';
import { McnpStatusWidget } from './McnpStatusWidget';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  // Helper to render decorated description with structured cards
  const renderDecoratedContent = (text: string) => {
    const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
    const introParagraphs: string[] = [];
    const featureCards: { emoji?: string; title: string; detail: string }[] = [];
    let parsingFeatures = false;

    lines.forEach((line) => {
      if (line.includes('Key Features') || line.includes('✨') || line.includes('Highlights')) {
        parsingFeatures = true;
        return;
      }

      // Regex matching common emojis or bullet prefixes
      const emojiMatch = line.match(/^([\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u27BF]|\p{Emoji_Presentation}|\p{Extended_Pictographic}|[-•*])\s*(.*)$/u);
      
      if (emojiMatch) {
        const emoji = emojiMatch[1];
        const content = emojiMatch[2];
        const colonIdx = content.indexOf(':');
        if (colonIdx !== -1) {
          featureCards.push({
            emoji,
            title: content.substring(0, colonIdx).trim(),
            detail: content.substring(colonIdx + 1).trim()
          });
        } else {
          featureCards.push({
            emoji,
            title: 'Feature',
            detail: content.trim()
          });
        }
      } else if (parsingFeatures) {
        const colonIdx = line.indexOf(':');
        if (colonIdx !== -1) {
          featureCards.push({
            title: line.substring(0, colonIdx).trim(),
            detail: line.substring(colonIdx + 1).trim()
          });
        } else {
          featureCards.push({
            title: 'Feature',
            detail: line
          });
        }
      } else {
        introParagraphs.push(line);
      }
    });

    return (
      <div className="space-y-4">
        {introParagraphs.length > 0 && (
          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/60">
            <p className="text-zinc-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed font-normal">
              {introParagraphs.join(' ')}
            </p>
          </div>
        )}

        {featureCards.length > 0 && (
          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Key Features & Architecture</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {featureCards.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-800/80 dark:to-zinc-900/80 border border-zinc-200/80 dark:border-zinc-700/70 shadow-sm flex items-start gap-3 transition-all hover:border-indigo-500/50 dark:hover:border-indigo-500/50"
                >
                  {feat.emoji && (
                    <div className="w-8 h-8 rounded-xl bg-indigo-100/80 dark:bg-indigo-950/80 text-lg flex items-center justify-center shrink-0 shadow-inner">
                      {feat.emoji}
                    </div>
                  )}
                  <div className="space-y-0.5 flex-1 min-w-0">
                    <h5 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">
                      {feat.title}
                    </h5>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {feat.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'Web Design':
        return 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-indigo-600/20';
      case 'Minecraft':
        return 'bg-red-600 text-white shadow-red-600/20';
      case 'Discord Server':
        return 'bg-indigo-600 text-white shadow-indigo-600/20';
      case 'Discord Bots':
        return 'bg-violet-600 text-white shadow-violet-600/20';
      default:
        return 'bg-indigo-600 text-white shadow-indigo-600/20';
    }
  };

  const getSectionHeaderTitle = (category: string) => {
    switch (category) {
      case 'Web Design':
        return 'Website UI/UX & Responsive Web Architecture';
      case 'Minecraft':
        return 'Minecraft Network & Systems Architecture';
      case 'Discord Server':
        return 'Developer Community & Service Hub';
      case 'Discord Bots':
        return 'Bot Architecture & System Capabilities';
      default:
        return 'Project Architecture & Overview';
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-zinc-950/75 backdrop-blur-md animate-fadeIn cursor-pointer"
    >
      <div
        className="bg-white dark:bg-zinc-900 w-full max-w-3xl rounded-3xl shadow-2xl border border-zinc-200/80 dark:border-zinc-800 overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[88vh] cursor-default transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Banner */}
        <div className="relative h-56 sm:h-64 md:h-72 w-full overflow-hidden bg-zinc-950 flex items-center justify-center shrink-0">
          {project.id === 'proj-gana-web' ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-violet-950 via-zinc-900 to-indigo-950 p-6 overflow-hidden">
              <div className="absolute -inset-10 bg-radial from-violet-600/20 via-transparent to-transparent blur-2xl animate-pulse" />
              <div className="w-24 h-24 rounded-3xl bg-violet-600/30 border border-violet-400/40 flex items-center justify-center mb-3 shadow-2xl relative z-10">
                <GanaLogo className="w-16 h-16" />
              </div>
              <span className="font-mono text-base font-bold text-violet-200 relative z-10">gana.mcnp.network</span>
            </div>
          ) : project.id === 'proj-1' ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-red-950/60 p-6 overflow-hidden">
              <div className="absolute -inset-10 bg-radial from-red-600/20 via-transparent to-transparent blur-2xl animate-pulse" />
              <McnpLogo className="w-40 sm:w-48 h-40 sm:h-48 shadow-2xl relative z-10 hover:scale-105 transition-transform duration-500" />
            </div>
          ) : project.id === 'proj-ind-mc' ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-emerald-950/60 p-6 overflow-hidden">
              <div className="absolute -inset-10 bg-radial from-emerald-600/20 via-transparent to-transparent blur-2xl animate-pulse" />
              <IndMcLogo className="w-40 sm:w-48 h-40 sm:h-48 shadow-2xl relative z-10 hover:scale-105 transition-transform duration-500" />
            </div>
          ) : (project.category === 'Discord Bots' || project.category === 'Discord Server') ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-indigo-950/60 p-6 overflow-hidden">
              <div className="absolute -inset-10 bg-radial from-indigo-600/20 via-transparent to-transparent blur-2xl animate-pulse" />
              <DiscordBotLogo botName={project.title} className="w-40 sm:w-48 h-40 sm:h-48 shadow-2xl relative z-10 hover:scale-105 transition-transform duration-500" />
            </div>
          ) : (
            <>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/30 to-transparent" />
            </>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-zinc-950/80 hover:bg-zinc-800 text-white flex items-center justify-center transition-all shadow-xl z-20 cursor-pointer border border-zinc-700/60 hover:scale-110 active:scale-95 backdrop-blur-sm"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title & Tagline overlay */}
          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 z-10 pointer-events-none">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 shadow-md ${getCategoryBadgeClass(project.category)}`}>
              {project.category}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight drop-shadow-md">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 font-medium mt-1 drop-shadow line-clamp-2">
              {project.tagline}
            </p>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto space-y-6">
          
          {/* MCNP Live Status Widget */}
          {project.id === 'proj-1' ? (
            <div>
              <McnpStatusWidget />
            </div>
          ) : (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-indigo-500" />
                <span>{getSectionHeaderTitle(project.category)}</span>
              </h4>
              {renderDecoratedContent(project.longDescription)}
            </div>
          )}

          {/* Metrics & Parameters Grid */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-emerald-500" />
                <span>Live Metrics & Network Parameters</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                {project.metrics.map((m, idx) => (
                  <div 
                    key={idx}
                    className="p-3 sm:p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/60 shadow-sm flex flex-col justify-between"
                  >
                    <span className="text-[10px] sm:text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider truncate">
                      {m.label}
                    </span>
                    <span className="text-xs sm:text-sm md:text-base font-extrabold text-zinc-900 dark:text-zinc-100 mt-1 truncate">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Tags */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-indigo-500" />
              <span>Technologies & Stack</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-semibold border border-indigo-200/60 dark:border-indigo-800/40 shadow-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer with sleek actions */}
        <div className="px-4 sm:px-6 py-4 bg-zinc-50/90 dark:bg-zinc-950/90 border-t border-zinc-200/80 dark:border-zinc-800 flex items-center justify-center gap-2 sm:gap-3 flex-wrap shrink-0">
          {project.id === 'proj-1' && (
            <a
              href="minecraft://?addExternalServer=MCNP%20Network|bedrock.mcnp.network:19132"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/30 transition-all hover:scale-105 active:scale-95"
              title="Launch Minecraft & Auto-Add Server"
            >
              <Rocket className="w-4 h-4" />
              <span>Launch & Add Server (1.20 - 1.26.x)</span>
            </a>
          )}
          {(!project.discordUrl && !project.websiteUrl && !project.demoUrl && !project.githubUrl && !project.tiktokUrl && !project.youtubeUrl) && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 text-xs font-semibold border border-zinc-200 dark:border-zinc-700/60">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              <span>Project Archived & Offline (2022–2023)</span>
            </div>
          )}
          {project.discordUrl && (
            <a
              href={project.discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold text-xs sm:text-sm shadow-md shadow-indigo-600/20 transition-all hover:scale-105 active:scale-95"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.011c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              <span>{project.category === 'Discord Server' ? 'Join Community Discord' : 'Bot Support Discord'}</span>
            </a>
          )}
          {project.websiteUrl && (
            <a
              href={project.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all hover:scale-105 active:scale-95"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Official Website</span>
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs sm:text-sm shadow-md transition-all hover:scale-105 active:scale-95"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demo</span>
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs sm:text-sm shadow-md transition-all hover:scale-105 active:scale-95"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          )}
          {project.tags?.includes('Closed Source') && (
            <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 font-semibold text-xs sm:text-sm border border-red-200 dark:border-red-900/50 shadow-sm cursor-default">
              <Lock className="w-4 h-4" />
              <span>Closed Source / Proprietary</span>
            </div>
          )}
          {project.tiktokUrl && (
            <a
              href={project.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-zinc-900 dark:bg-zinc-800 hover:bg-black text-white font-semibold text-xs sm:text-sm shadow-md transition-all hover:scale-105 active:scale-95"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
              <span>TikTok</span>
            </a>
          )}
          {project.youtubeUrl && (
            <a
              href={project.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-red-600/20 transition-all hover:scale-105 active:scale-95"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span>YouTube</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
