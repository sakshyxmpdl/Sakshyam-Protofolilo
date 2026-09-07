import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Github, Mail, MapPin, Sparkles, Code2, Gamepad2, Shield, ChevronDown, Rocket, CheckCircle2 } from 'lucide-react';
import { UserProfile } from '../types';
import { ParticleVfx } from './ParticleVfx';
import { TypewriterText } from './TypewriterText';

interface HeroProps {
  profile: UserProfile;
}

export const Hero: React.FC<HeroProps> = ({ profile }) => {
  const [showBioDetails, setShowBioDetails] = useState(false);

  const typewriterRoles = [
    "Website Designer & Systems Architect",
    "Head Management Team @ MCNP Network",
    "Creator of Gana Portal (gana.mcnp.network)",
    "Head Developer @ Nexus Studio",
    "Multiplayer Infrastructure Engineer (v1.20 - 1.26.x)",
    "Discord Bot & Systems Architect"
  ];

  return (
    <section id="about" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-indigo-50/50 via-white to-white dark:from-zinc-900/50 dark:via-zinc-950 dark:to-zinc-950">
      {/* Background glow effects & VFX particles */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-indigo-400/10 dark:bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none animate-pulse-ring" />
      <ParticleVfx />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            
            {/* Status Pill Badge with Flash Pulse */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-5 animate-flash-badge shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Available for Architecture & Management</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight leading-[1.1] mb-4"
            >
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-500">{profile.name}</span>
            </motion.h1>

            {/* Subtitle / Dynamic Typewriter Role */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="min-h-[3.5rem] sm:min-h-[2.8rem] text-xl sm:text-2xl font-bold text-zinc-800 dark:text-zinc-200 mb-4 flex items-center"
            >
              <TypewriterText
                words={typewriterRoles}
                typingSpeed={65}
                deletingSpeed={35}
                pauseDuration={2000}
                className="text-indigo-600 dark:text-indigo-400"
                cursorClassName="text-indigo-600 dark:text-indigo-400"
              />
            </motion.div>

            {/* Location */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 mb-8"
            >
              <MapPin className="w-4 h-4 text-indigo-600 dark:text-indigo-400 animate-bounce" />
              <span>{profile.location}</span>
            </motion.div>

            {/* Know More about me button with checkmark */}
            <div className="w-full mb-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowBioDetails(!showBioDetails)}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-semibold text-sm border border-indigo-200 dark:border-indigo-800/60 shadow-sm transition-all group cursor-pointer"
              >
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">✓</span>
                <span>Know More about me</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showBioDetails ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {showBioDetails && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, scale: 0.98 }}
                    animate={{ opacity: 1, height: 'auto', scale: 1 }}
                    exit={{ opacity: 0, height: 0, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-200 text-base leading-relaxed space-y-4 whitespace-pre-line shadow-inner">
                      {profile.bio}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#projects"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 transition-all shimmer-container cursor-pointer"
              >
                <span>Explore Works</span>
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold text-sm border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Contact Me</span>
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-4"
            >
              <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Connect me</span>
              <div className="flex items-center gap-3">
                <motion.a
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center justify-center transition-colors border border-zinc-200 dark:border-zinc-800 shadow-xs"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.15, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  href={profile.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center justify-center transition-colors border border-zinc-200 dark:border-zinc-800 shadow-xs"
                  aria-label="Discord Profile: Sakshyxm"
                  title="Discord: Sakshyxm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.011c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Visual Card / Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center w-full"
          >
            <div className="relative w-full max-w-md px-2 sm:px-0">
              
              {/* Decorative background blur card with pulse */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-indigo-600 via-purple-600 to-violet-500 rounded-3xl opacity-20 blur-xl animate-pulse-ring" />

              {/* Main Profile Card */}
              <div className="relative bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200/80 dark:border-zinc-800 shadow-2xl overflow-hidden shimmer-container">
                
                {/* Header inside card */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative shrink-0">
                    <img
                      src="/sakshyam-profile.jpg"
                      alt={profile.name}
                      className="w-20 h-20 rounded-2xl object-cover ring-4 ring-indigo-500/30 shadow-md transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-900 flex items-center justify-center text-white text-[10px] font-bold shadow-sm pointer-events-none animate-bounce">
                      ✓
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 truncate flex items-center gap-1.5">
                      <span>{profile.name}</span>
                      <Sparkles className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '8s' }} />
                    </h3>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mt-0.5 line-clamp-1">
                      {profile.title}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 truncate">
                      {profile.location}
                    </p>
                  </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-zinc-100 dark:border-zinc-800 mb-6">
                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-xs"
                  >
                    <div className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-1">
                      {profile.yearsExperience}+
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                      Years Minecraft Dev
                    </div>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-xs"
                  >
                    <div className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-1">
                      5+
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                      Major Networks
                    </div>
                  </motion.div>
                </div>

                {/* Live Websites & Portals */}
                <div className="space-y-2.5 mb-5 pb-5 border-b border-zinc-100 dark:border-zinc-800">
                  <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider flex items-center justify-between">
                    <span>Live Web Portal</span>
                    <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      Live 100%
                    </span>
                  </span>
                  <div>
                    <a
                      href="https://gana.mcnp.network"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 hover:border-indigo-500 flex items-center justify-between text-xs font-semibold text-indigo-700 dark:text-indigo-300 transition-all group shadow-xs"
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span>gana.mcnp.network (Gana Music Portal)</span>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </a>
                  </div>
                </div>

                {/* Core Expertise Tags */}
                <div className="space-y-3">
                  <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                    Specializations & Networks
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {['Website Design', 'gana.mcnp.network', 'Minecraft Nepal', 'Nexus Studio', 'IND MC', 'Java / Spigot', 'Discord.js', 'Velocity Proxy'].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-medium hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
