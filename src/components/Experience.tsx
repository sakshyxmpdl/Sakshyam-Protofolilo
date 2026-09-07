import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, GraduationCap, Calendar, MapPin, Sparkles, ExternalLink, CheckCircle2 } from 'lucide-react';
import { ExperienceItem } from '../types';

interface ExperienceProps {
  items: ExperienceItem[];
}

export const Experience: React.FC<ExperienceProps> = ({ items }) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Work' | 'Education'>('All');

  const filteredItems = items.filter((item) => {
    if (activeTab === 'All') return true;
    return item.type === activeTab;
  });

  return (
    <section id="experience" className="py-24 bg-zinc-50 dark:bg-zinc-900/50 border-y border-zinc-200/80 dark:border-zinc-800 relative overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-indigo-200 dark:border-indigo-800/40">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Career Path & Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight mb-4">
            Experience & Education
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
            A timeline of my engineering journey across Discord ecosystem development, high-concurrency architecture, network management, and academic background.
          </p>
        </motion.div>

        {/* Tab Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 mb-16"
        >
          {(['All', 'Work', 'Education'] as const).map((tab) => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 scale-105'
                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-300 dark:hover:border-indigo-800'
              }`}
            >
              {tab}
            </motion.button>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-indigo-200 dark:border-indigo-900/60 space-y-12">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="relative group"
              >
                
                {/* Timeline Dot with Pulse Beacon Effect */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border-2 border-indigo-600 dark:border-indigo-500 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-md group-hover:scale-110 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/50 transition-all">
                  <div className="absolute inset-0 rounded-full bg-indigo-500/20 animate-ping opacity-75 pointer-events-none" />
                  {item.type === 'Work' ? <Briefcase className="w-4 h-4" /> : <GraduationCap className="w-4 h-4" />}
                </div>

                {/* Content Card with 3D Hover elevation */}
                <motion.div 
                  whileHover={{ y: -4 }}
                  className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-2xl hover:border-indigo-500/50 transition-all shimmer-container"
                >
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-2">
                        {item.type}
                      </span>
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                        {item.role}
                      </h3>
                      <p className="text-base font-medium text-indigo-600 dark:text-indigo-400 mt-0.5">
                        {item.url ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 hover:underline"
                          >
                            <span>{item.company}</span>
                            <span className="text-xs opacity-80">
                              {item.url.includes('discord') || item.url.includes('dsc.gg') ? '(Join Discord Server)' : '(Visit Website)'}
                            </span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : item.company === "Tribhuvan University" ? (
                          <a
                            href="https://tu.edu.np/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 hover:underline"
                          >
                            <span>{item.company}</span>
                            <span className="text-xs opacity-80">(Visit Website)</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          item.company
                        )}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.period}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bulleted / Narrative Descriptions */}
                  <div className="space-y-2 mb-6">
                    {Array.isArray(item.description) ? (
                      item.description.map((desc, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2.5 text-sm sm:text-base text-zinc-600 dark:text-zinc-300">
                          <CheckCircle2 className="w-4 h-4 text-indigo-500 mt-1 shrink-0" />
                          <span>{desc}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-800/70">
                    {item.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-3 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 text-xs font-medium hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                </motion.div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
