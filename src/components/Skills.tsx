import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Code, FileCode, Palette, Layers, Zap, Server, Database, Network, Box, Cloud, Sparkles, Cpu, GitBranch, CheckCircle, Compass, Flame, Globe } from 'lucide-react';
import { SkillCategory } from '../types';

interface SkillsProps {
  categories: SkillCategory[];
}

export const Skills: React.FC<SkillsProps> = ({ categories }) => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Helper to render icon based on string name
  const renderIcon = (name: string) => {
    switch (name) {
      case 'Globe': return <Globe className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'Code': return <Code className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'FileCode': return <FileCode className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'Palette': return <Palette className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'Layers': return <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'Server': return <Server className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'Database': return <Database className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'Network': return <Network className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'Box': return <Box className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'Cloud': return <Cloud className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'GitBranch': return <GitBranch className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'CheckCircle': return <CheckCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      default: return <Compass className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
    }
  };

  return (
    <section id="skills" className="py-24 bg-white dark:bg-zinc-950 overflow-hidden relative">
      {/* Ambient background blur */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-indigo-500/5 dark:bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-indigo-200 dark:border-indigo-800/40 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight mb-4">
            Skills & Technical Proficiency
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
            A comprehensive overview of website design frameworks, Minecraft multiplayer network architectures, Discord bot systems, and Linux server DevOps.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className="bg-zinc-50 dark:bg-zinc-900/60 rounded-3xl p-8 border border-zinc-200/80 dark:border-zinc-800 shadow-sm flex flex-col justify-between transition-[box-shadow,border-color] duration-300 hover:shadow-2xl hover:border-indigo-500/50 relative overflow-hidden group"
            >
              {/* Subtle hover gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-transparent to-violet-500/0 group-hover:from-indigo-500/5 group-hover:to-violet-500/5 transition-colors duration-500 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                    {category.title}
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                  {category.description}
                </p>

                {/* Skills List */}
                <div className="space-y-6">
                  {category.skills.map((skill, sIdx) => {
                    const isHovered = hoveredSkill === skill.name;

                    return (
                      <div
                        key={sIdx}
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        className="space-y-2 group cursor-pointer"
                      >
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2.5">
                            <motion.div
                              whileHover={{ scale: 1.15, rotate: 5 }}
                              className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs transition-colors group-hover:border-indigo-500 group-hover:bg-indigo-50/50 dark:group-hover:bg-indigo-950/40"
                            >
                              {renderIcon(skill.iconName)}
                            </motion.div>
                            <span className="font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                              {skill.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-zinc-400">
                              {skill.years}
                            </span>
                            <span className={`text-xs font-bold transition-transform ${isHovered ? 'text-indigo-600 dark:text-indigo-400 scale-110' : 'text-zinc-600 dark:text-zinc-400'}`}>
                              {skill.level}%
                            </span>
                          </div>
                        </div>

                        {/* Progress Bar with InView animation and glowing head */}
                        <div className="w-full h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden relative">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: 0.2 + sIdx * 0.1, ease: "easeOut" }}
                            className="h-full rounded-full bg-gradient-to-r from-indigo-600 via-violet-500 to-indigo-400 relative"
                          >
                            <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/70 blur-[1px] rounded-full" />
                          </motion.div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
