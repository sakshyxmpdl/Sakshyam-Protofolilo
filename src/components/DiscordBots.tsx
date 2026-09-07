import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Music, ShieldAlert, CheckCircle2, Terminal, Sparkles, ExternalLink, Play, Disc, Shield, Radio, Volume2 } from 'lucide-react';
import { DiscordBot } from '../types';
import { NexusLogo } from './NexusLogo';
import { GanaLogo } from './GanaLogo';

interface DiscordBotsProps {
  bots: DiscordBot[];
}

export const DiscordBots: React.FC<DiscordBotsProps> = ({ bots }) => {
  const [activeCommand, setActiveCommand] = useState<{ botName: string; cmd: string; response: string } | null>(null);

  // Command simulations
  const getCommandResponse = (botName: string, cmd: string) => {
    if (botName === 'Gana') {
      switch (cmd) {
        case '/play': return '🎵 Now Playing: "Starboy" by The Weeknd via Spotify HD (Lavalink Node #01 - 0ms latency)';
        case '/autoplay': return '📻 24/7 Smart Autoplay enabled! Continuous radio queuing similar genre tracks automatically.';
        case '/filter': return '🎛️ Audio FX: Bassboost High & 8D Surround Audio Filter applied successfully.';
        case '/queue': return '📑 Queue: 12 tracks | Total Duration: 44m 18s | Volume: 100%';
        default: return `⚡ Executed ${cmd} successfully in 12ms.`;
      }
    } else {
      switch (cmd) {
        case '/antiraid': return '🛡️ Anti-Raid Mode: MAXIMUM SHIELD ENABLED. Incoming join rate restricted to 1 user / 5s with verification captcha.';
        case '/lockdown': return '🔒 Channel Quarantine: 34 text channels locked down. All permissions revoked for unverified roles.';
        case '/scan': return '📡 Deep Threat Scanner: Scanned 1,420 members. 0 compromised tokens, 0 malicious links detected.';
        case '/audit': return '📑 Security Audit Report: Guild health 99.8%. 2FA enforcement active on all moderators.';
        default: return `🛡️ Security Action: ${cmd} completed with cryptographic audit logging.`;
      }
    }
  };

  const handleCommandClick = (botName: string, cmd: string) => {
    setActiveCommand({
      botName,
      cmd,
      response: getCommandResponse(botName, cmd),
    });
  };

  return (
    <section id="discord-bots" className="py-24 bg-white dark:bg-zinc-950 relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[350px] bg-indigo-500/10 dark:bg-indigo-600/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[350px] bg-violet-500/10 dark:bg-violet-600/15 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs border border-indigo-200 dark:border-indigo-800/40">
            <Bot className="w-4 h-4 animate-bounce" />
            <span>Discord Ecosystem & Automation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight mb-4">
            Custom Discord Bots & High-Scale Automation
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
            Engineered for massive concurrency, millisecond audio streaming, and algorithmic community defense. Click any slash command to test interactive simulation.
          </p>
        </motion.div>

        {/* Bots Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {bots.map((bot, idx) => {
            const isGana = bot.name === 'Gana';
            const botUrl = isGana ? 'https://gana.mcnpnetwork.com/' : 'https://security.mcnp.network/';

            return (
              <motion.div
                key={bot.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                whileHover={{ y: -6 }}
                className="group relative bg-zinc-50 dark:bg-zinc-900/80 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-2xl hover:border-indigo-500/60 transition-all duration-300 flex flex-col justify-between shimmer-container"
              >
                {/* Decorative Visual FX Header Background */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-indigo-500/10 to-violet-500/5 rounded-bl-full pointer-events-none" />

                <div>
                  {/* Bot Header */}
                  <div className="flex items-start justify-between gap-4 mb-6 relative">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        {bot.name === 'Nexus Security' ? (
                          <div className="relative">
                            <NexusLogo className="w-16 h-16 shadow-md group-hover:scale-105 transition-transform" />
                            {/* Radar Scan Laser Line VFX */}
                            <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                              <div className="w-full h-full border border-indigo-400/40 rounded-2xl animate-pulse" />
                            </div>
                          </div>
                        ) : (
                          <div className="relative">
                            <GanaLogo className="w-16 h-16 shadow-md group-hover:scale-105 transition-transform" />
                            {/* Rotating Vinyl Glow Effect */}
                            <div className="absolute -inset-1 rounded-2xl bg-indigo-500/20 blur-[6px] -z-10 animate-pulse-ring" />
                          </div>
                        )}
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-900 flex items-center justify-center text-white text-[10px] animate-pulse">
                          ✓
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                            {bot.name}
                          </h3>
                          {isGana ? (
                            <div className="flex items-center gap-1">
                              <Music className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                              {/* Audio Equalizer Animated VFX */}
                              <div className="flex items-end gap-0.5 h-4 ml-1 px-1.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800/40">
                                <span className="w-1 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-eq-1" />
                                <span className="w-1 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-eq-2" />
                                <span className="w-1 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-eq-3" />
                                <span className="w-1 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-eq-4" />
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5">
                              <ShieldAlert className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                                Sentinel AI
                              </span>
                            </div>
                          )}
                        </div>
                        <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">
                          {bot.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800 animate-flash-badge shadow-xs">
                        {bot.serversCount}
                      </span>
                      <a
                        href={botUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        <span>Live Portal</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  <p className="text-zinc-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed mb-6">
                    {bot.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2.5 mb-8">
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block mb-2 flex items-center justify-between">
                      <span>Key Features</span>
                      <span className="text-[10px] text-indigo-500 font-medium">99.9% Uptime SLA</span>
                    </span>
                    {bot.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2.5 text-sm text-zinc-700 dark:text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bot Interactive Commands Simulator */}
                <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Interactive Slash Commands</span>
                    </span>
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500 italic">Click to simulate</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {bot.commands.map((cmd, cIdx) => (
                      <motion.button
                        key={cIdx}
                        type="button"
                        whileHover={{ scale: 1.05, y: -1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleCommandClick(bot.name, cmd)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium border transition-all cursor-pointer flex items-center gap-1.5 ${
                          activeCommand?.botName === bot.name && activeCommand?.cmd === cmd
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/30'
                            : 'bg-white dark:bg-zinc-950 text-indigo-700 dark:text-indigo-300 border-zinc-200 dark:border-zinc-800 hover:border-indigo-400 shadow-xs'
                        }`}
                      >
                        <span>{cmd}</span>
                        <Play className="w-2.5 h-2.5 opacity-60" />
                      </motion.button>
                    ))}
                  </div>

                  {/* Terminal Simulation Output Box */}
                  <AnimatePresence>
                    {activeCommand && activeCommand.botName === bot.name && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-3.5 rounded-xl bg-zinc-900 text-zinc-100 border border-zinc-700/80 font-mono text-xs shadow-inner relative">
                          <div className="flex items-center justify-between text-[10px] text-zinc-400 mb-1.5 border-b border-zinc-800 pb-1">
                            <span className="flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                              <span>Console Execution Simulator</span>
                            </span>
                            <span className="text-indigo-400 font-bold">{activeCommand.cmd}</span>
                          </div>
                          <p className="text-zinc-200 text-xs leading-relaxed">
                            {activeCommand.response}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Quick Action Buttons */}
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-zinc-200/60 dark:border-zinc-800/80">
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href="https://dsc.gg/nexusstdo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs text-center shadow-sm shadow-indigo-600/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Bot className="w-3.5 h-3.5" />
                      <span>Join Discord Server</span>
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href={botUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-4 rounded-xl bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 font-semibold text-xs text-center shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Visit Site</span>
                    </motion.a>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
