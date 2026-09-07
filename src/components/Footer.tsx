import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { UserProfile } from '../types';
import { TypewriterText } from './TypewriterText';

interface FooterProps {
  profile: UserProfile;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const footerTypewriterQuotes = [
    "Crafting immersive web experiences & Minecraft server networks with passion.",
    "Specialized in React, TypeScript, Velocity Proxy & High-Performance UI.",
    "Creator of Gana Music Portal (gana.mcnp.network) & MCNP Network.",
    "Building scalable Discord bots and low-latency multiplayer architectures.",
    "Available for frontend engineering, website design & server management."
  ];

  return (
    <footer className="bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Animated Typewriter Dynamic Banner */}
        <div className="mb-8 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            <Sparkles className="w-4 h-4 animate-spin-slow shrink-0" />
            <span className="uppercase tracking-wider">Live Status:</span>
          </div>
          <div className="text-xs sm:text-sm font-mono text-zinc-700 dark:text-zinc-300 min-h-[1.5rem] flex items-center justify-center sm:justify-start">
            <TypewriterText
              words={footerTypewriterQuotes}
              typingSpeed={50}
              deletingSpeed={30}
              pauseDuration={2400}
              className="text-zinc-800 dark:text-zinc-200"
              cursorClassName="text-indigo-600 dark:text-indigo-400"
            />
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Operational 100%</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo / Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold shadow-sm overflow-hidden ring-1 ring-zinc-200 dark:ring-zinc-800">
              <img src="/sakshyam-profile.jpg" alt={profile.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-zinc-900 dark:text-zinc-100 text-base leading-tight">
                {profile.name}
              </span>
              <span className="text-[11px] text-zinc-500 font-mono">
                Website Designer & Systems Architect
              </span>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-600 dark:text-zinc-400">
            <a href="#about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About</a>
            <a href="#projects" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Projects</a>
            <a href="#skills" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Skills</a>
            <a href="#experience" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Experience</a>
            <a href="#contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact</a>
          </div>

          {/* Copyright */}
          <div className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 flex-wrap justify-center">
            <span>© {new Date().getFullYear()} {profile.name}.</span>
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline animate-pulse" /> in Gaindakot, Nepal
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
};
