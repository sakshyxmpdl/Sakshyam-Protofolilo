import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, ArrowUpRight, Search, Sparkles, Rocket, Globe } from 'lucide-react';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';
import { McnpLogo } from './McnpLogo';
import { IndMcLogo } from './IndMcLogo';
import { DiscordBotLogo } from './DiscordBotLogo';
import { GanaLogo } from './GanaLogo';

interface ProjectsProps {
  projects: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['All', 'Web Design', 'Minecraft', 'Discord Server', 'Discord Bots'];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-24 bg-zinc-50 dark:bg-zinc-900/50 border-y border-zinc-200/80 dark:border-zinc-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-indigo-200 dark:border-indigo-800/40">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Website Design & Multi-Platform Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight mb-4">
            Featured Projects & Live Web Portals
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
            Explore live responsive web applications (sakshyxm.mcnp.network, gana.mcnp.network), multiplayer server networks, and Discord automation tools.
          </p>
        </motion.div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 bg-white dark:bg-zinc-900 p-1.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm w-full md:w-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeCategory === category
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search tech, title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

        </div>

        {/* Project Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800">
            <p className="text-zinc-500 dark:text-zinc-400 font-medium">
              No projects found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ 
                  y: -8, 
                  transition: { duration: 0.28, ease: [0.25, 1, 0.5, 1] } 
                }}
                onClick={() => setSelectedProject(project)}
                className="group bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/15 dark:hover:shadow-indigo-500/10 hover:border-indigo-200/60 dark:hover:border-indigo-900/60 transition-all duration-300 flex flex-col cursor-pointer"
              >
                {/* Project Image / Visual Header */}
                <div className="relative h-52 w-full overflow-hidden bg-zinc-900 flex items-center justify-center">
                  {project.id === 'proj-gana-web' ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-violet-950 via-zinc-900 to-indigo-950 p-6 text-center">
                      <div className="w-16 h-16 rounded-2xl bg-violet-600/30 border border-violet-400/40 flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform">
                        <GanaLogo className="w-14 h-14" />
                      </div>
                      <span className="font-mono text-sm font-bold text-violet-300">gana.mcnp.network</span>
                      <span className="text-[11px] text-zinc-400 mt-1">Gana Music Bot Web Portal</span>
                    </div>
                  ) : project.id === 'proj-1' ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-red-950/40 p-4">
                      <McnpLogo className="w-36 h-36 shadow-2xl group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  ) : project.id === 'proj-ind-mc' ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-emerald-950/40 p-4">
                      <IndMcLogo className="w-36 h-36 shadow-2xl group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  ) : (project.category === 'Discord Bots' || project.category === 'Discord Server') ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-indigo-950/40 p-4">
                      <DiscordBotLogo botName={project.title} className="w-36 h-36 shadow-2xl group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  ) : (
                    <>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    </>
                  )}
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-zinc-900/95 backdrop-blur-md text-zinc-900 dark:text-zinc-100 text-xs font-bold shadow-sm">
                      {project.category}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 dark:bg-zinc-900/95 backdrop-blur-md flex items-center justify-center text-zinc-900 dark:text-zinc-100 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shadow-sm">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-1">
                      {project.tagline}
                    </p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2.5 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Tags */}
                  <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-2 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-400 text-xs font-medium">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:underline flex items-center gap-1">
                        View Details &rarr;
                      </span>
                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        {project.id === 'proj-1' && (
                          <a
                            href="minecraft://?addExternalServer=MCNP%20Network|bedrock.mcnp.network:19132"
                            className="p-2 rounded-xl text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-colors flex items-center gap-1 font-bold text-xs"
                            aria-label="Launch Game & Auto-Add Server"
                            title="Launch Minecraft & Auto-Add Server (1.20 - 1.26.x)"
                          >
                            <Rocket className="w-4 h-4" />
                            <span className="hidden sm:inline">Launch</span>
                          </a>
                        )}
                        {project.discordUrl && (
                          <a
                            href={project.discordUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl text-zinc-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors"
                            aria-label="Discord Community"
                            title={`Discord: ${project.discordUrl}`}
                          >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.011c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                            </svg>
                          </a>
                        )}
                        {project.websiteUrl && (
                          <a
                            href={project.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl text-zinc-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors"
                            aria-label="Official Website"
                            title={`Website: ${project.websiteUrl}`}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        {project.tiktokUrl && (
                          <a
                            href={project.tiktokUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                            aria-label="TikTok"
                            title="TikTok @mcnpnetwork"
                          >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                            </svg>
                          </a>
                        )}
                        {project.youtubeUrl && (
                          <a
                            href={project.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                            aria-label="YouTube"
                            title="YouTube @mcnpnetworkofficial"
                          >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                          </a>
                        )}
                        {!project.tiktokUrl && !project.youtubeUrl && project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                            aria-label="GitHub Repository"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {!project.tiktokUrl && !project.youtubeUrl && project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                            aria-label="Live Demo"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>

      {/* Project Detail Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};
