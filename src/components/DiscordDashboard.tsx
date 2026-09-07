import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  Sparkles,
  Shield,
  Copy,
  Check,
  Headphones,
  Music2,
  Code2,
  Gamepad2,
  Radio,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Send,
  ExternalLink,
  Maximize2,
  X,
  Flame,
  Hash,
  Users,
  Layers,
  Settings,
  Bell,
  Pin,
  Smile,
  Gift,
  PlusCircle,
  FolderCode,
  Laptop,
  Smartphone,
  Globe,
  Wifi,
  RefreshCw,
  Activity,
  Tv,
  PhoneCall,
  Volume1,
  HelpCircle,
  Clock,
  Sparkle
} from 'lucide-react';
import { GanaLogo } from './GanaLogo';
import { NexusLogo } from './NexusLogo';
import { McnpLogo } from './McnpLogo';

export interface LanyardActivity {
  id: string;
  name: string;
  type: number; // 0 = Game/App, 1 = Streaming, 2 = Listening, 3 = Watching, 4 = Custom, 5 = Competing
  state?: string;
  details?: string;
  timestamps?: {
    start?: number;
    end?: number;
  };
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
  emoji?: {
    name: string;
    id: string | null;
    animated?: boolean;
  };
}

export interface LanyardSpotify {
  track_id: string;
  timestamps: {
    start: number;
    end: number;
  };
  song: string;
  artist: string;
  album: string;
  album_art_url: string;
}

export interface LanyardData {
  discord_user: {
    id: string;
    username: string;
    discriminator: string;
    avatar: string;
    global_name?: string;
    display_name?: string;
    avatar_decoration?: string | null;
    public_flags?: number;
  };
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  active_on_discord_web: boolean;
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
  listening_to_spotify: boolean;
  spotify: LanyardSpotify | null;
  activities: LanyardActivity[];
  voice_state?: {
    channel_name?: string;
    guild_name?: string;
    self_mute?: boolean;
    self_deaf?: boolean;
    self_video?: boolean;
    self_stream?: boolean;
    connected?: boolean;
  };
}


const playChatSound = (type: 'send' | 'receive') => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    if (type === 'send') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(650, ctx.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.1);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(350, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(250, ctx.currentTime + 0.15);
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.15);
    }
  } catch (e) {
    // Ignore error
  }
};

export const DiscordDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'dm' | 'voice' | 'servers'>('profile');
  const [userStatus, setUserStatus] = useState<'online' | 'idle' | 'dnd' | 'streaming'>('online');
  const [copiedId, setCopiedId] = useState(false);
  const [isGuiModalOpen, setIsGuiModalOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Local Voice State for Interactive Simulator
  const [isUserMuted, setIsUserMuted] = useState(false);
  const [isUserDeafened, setIsUserDeafened] = useState(false);
  const [isUserConnectedToVC, setIsUserConnectedToVC] = useState(true);
  const [userActiveVCChannel, setUserActiveVCChannel] = useState<'dev' | 'mcnp_stage' | 'chill'>('dev');
  const [activeVoiceRoom, setActiveVoiceRoom] = useState<'dev' | 'mcnp_stage' | 'chill'>('dev');
  const [voiceBitrate, setVoiceBitrate] = useState('384kbps HD');

  // Real-time Gateway State from Discord / Lanyard
  const [liveLanyard, setLiveLanyard] = useState<LanyardData | null>(null);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Live (Connecting)');
  const [wsConnected, setWsConnected] = useState(false);
  const [lastLiveEventText, setLastLiveEventText] = useState<string | null>(null);

  // Live Timer for elapsed session
  const [sessionSeconds, setSessionSeconds] = useState(1420);
  const [spotifySeconds, setSpotifySeconds] = useState(74);
  const [isPlayingSpotify, setIsPlayingSpotify] = useState(true);

  // DM Chat Simulator State
  const [chatInput, setChatInput] = useState('');



  const [isSakshyamTyping, setIsSakshyamTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Array<{
    id: string;
    sender: 'user' | 'sakshyam' | 'system';
    text: string;
    time: string;
    tag?: string;
  }>>([
    {
      id: 'msg-1',
      sender: 'system',
      text: 'Direct message terminal connected to @Sakshyxm (Sakshyam Paudel). Inquiring about Minecraft server setups, Gana bot, or custom web architecture? Ask away!',
      time: 'Today at 10:00 AM'
    },
    {
      id: 'msg-2',
      sender: 'sakshyam',
      text: 'Hey there! 👋 Welcome to my official Discord terminal. I specialize in Minecraft network engineering (MCNP), web design (gana.mcnp.network), and high-concurrency Discord bots. How can I help you today?',
      time: 'Today at 10:01 AM',
      tag: 'Sakshyam Paudel'
    }
  ]);

  // Dynamic Status Text Transition Index
  const [statusIndex, setStatusIndex] = useState(0);

  // Auto-scroll chat to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (activeTab === 'dm') {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, isSakshyamTyping, activeTab]);

  // Determine current live voice state from activities or streaming
  const liveStreamingActivity = liveLanyard?.activities?.find(
    (a) => a.type === 1 || (a.name && (a.name.toLowerCase().includes('stream') || a.name.toLowerCase().includes('live')))
  );

  const liveVSCodeActivity = liveLanyard?.activities?.find(
    (a) => a.name.toLowerCase().includes('visual studio code') || a.name.toLowerCase().includes('code')
  );

  const liveMinecraftActivity = liveLanyard?.activities?.find(
    (a) => a.name.toLowerCase().includes('minecraft') || a.name.toLowerCase().includes('mcnp')
  );

  const liveCustomStatus = liveLanyard?.activities?.find((a) => a.type === 4);
  const liveSpotifyData = liveLanyard?.spotify;

  // Dynamic Statuses array updated with real-time activities
  const dynamicStatuses = [
    {
      type: liveLanyard?.activities?.find(a => a.name.includes('Code')) ? 'Live Coding' : 'Code',
      icon: 'Code2',
      text: liveLanyard?.activities?.find(a => a.name.includes('Code'))?.details || 'Developing MCNP Velocity Proxy & Custom Plugins in VS Code',
      detail: liveLanyard?.activities?.find(a => a.name.includes('Code'))?.state || 'Workspace: mcnp-ecosystem • gana.mcnp.network'
    },
    {
      type: liveSpotifyData ? 'Live Spotify' : 'Spotify HD',
      icon: 'Music2',
      text: liveSpotifyData ? `Listening to "${liveSpotifyData.song}" by ${liveSpotifyData.artist}` : 'Listening to "Starboy" by The Weeknd on Spotify HD',
      detail: liveSpotifyData?.album ? `Album: ${liveSpotifyData.album}` : 'Routed through Gana Music Node #01 • 0ms latency'
    },
    {
      type: liveMinecraftActivity ? 'Live Game' : 'Minecraft',
      icon: 'Gamepad2',
      text: liveMinecraftActivity?.details || 'Playing Minecraft on play.mcnp.network',
      detail: liveMinecraftActivity?.state || 'Velocity Proxy Routing • TPS: 20.0 • Survival SMP'
    },
    {
      type: 'Security',
      icon: 'Shield',
      text: 'Nexus Sentinel Active — Monitoring 15,000+ Discord Guilds',
      detail: '0 threats detected • Anti-Raid Shield 100%'
    },
    {
      type: 'Web Dev',
      icon: 'Layers',
      text: 'Designing Web Portals @ gana.mcnp.network',
      detail: 'High performance UI/UX • 99+ Lighthouse Score'
    }
  ];

  // Fetch live Discord status from backend API proxy
  const fetchLiveStatus = async () => {
    try {
      const res = await fetch('/api/discord/status');
      if (res.ok) {
        const json = await res.json();
        if (json && json.data) {
          const lData: LanyardData = json.data;
          setLiveLanyard(lData);
          setWsConnected(true);
          const now = new Date();
          setLastSyncTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));

          // Map Discord status
          if (lData.discord_status === 'dnd') {
            setUserStatus('dnd');
          } else if (lData.discord_status === 'idle') {
            setUserStatus('idle');
          } else if (lData.discord_status === 'online') {
            setUserStatus('online');
          }

          // If Spotify is active in real Discord
          if (lData.spotify) {
            setIsPlayingSpotify(true);
            const totalDuration = (lData.spotify.timestamps.end - lData.spotify.timestamps.start) / 1000;
            const currentSec = Math.max(0, Math.floor((Date.now() - lData.spotify.timestamps.start) / 1000));
            setSpotifySeconds(Math.min(currentSec, Math.floor(totalDuration)));
          }
        }
      }
    } catch {
      setWsConnected(true);
    }
  };

  useEffect(() => {
    fetchLiveStatus();
    const livePoll = setInterval(fetchLiveStatus, 4000);

    // Direct Lanyard WebSocket connection for instant push updates
    let ws: WebSocket | null = null;
    let heartbeatInterval: any = null;

    try {
      ws = new WebSocket('wss://api.lanyard.rest/socket');

      ws.onopen = () => {
        setWsConnected(true);
      };

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          const { op, d, t } = message;

          if (op === 1) {
            const heartbeat_interval = d.heartbeat_interval;
            heartbeatInterval = setInterval(() => {
              if (ws && ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ op: 3 }));
              }
            }, heartbeat_interval);

            ws.send(
              JSON.stringify({
                op: 2,
                d: {
                  subscribe_to_id: '841899954481004564'
                }
              })
            );
          } else if (t === 'INIT_STATE' || t === 'PRESENCE_UPDATE') {
            if (d) {
              setLiveLanyard(d);
              setWsConnected(true);
              if (d.discord_status) {
                if (d.discord_status === 'dnd') setUserStatus('dnd');
                else if (d.discord_status === 'idle') setUserStatus('idle');
                else if (d.discord_status === 'online') setUserStatus('online');
              }
              const now = new Date();
              setLastSyncTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));

              if (t === 'PRESENCE_UPDATE') {
                setLastLiveEventText(`Updated live presence (${d.discord_status})`);
                setTimeout(() => setLastLiveEventText(null), 4000);
              }
            }
          }
        } catch {
          // ignore ws parse error
        }
      };

      ws.onerror = () => {
        setWsConnected(false);
      };

      ws.onclose = () => {
        setWsConnected(false);
      };
    } catch {
      // Fallback
    }

    const statusInterval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % dynamicStatuses.length);
    }, 4500);

    const timerInterval = setInterval(() => {
      setSessionSeconds((prev) => prev + 1);
      setSpotifySeconds((prev) => (prev >= 230 ? 0 : prev + 1));
    }, 1000);

    return () => {
      clearInterval(livePoll);
      clearInterval(statusInterval);
      clearInterval(timerInterval);
      if (heartbeatInterval) clearInterval(heartbeatInterval);
      if (ws) ws.close();
    };
  }, []);

  // Web Audio API sound synthesizer for authentic Discord feel
  const playDiscordChime = (type: 'ping' | 'join' | 'leave' | 'click' | 'mute' | 'unmute') => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'ping') {
        osc.frequency.setValueAtTime(880, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1760, audioCtx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.25);
      } else if (type === 'join') {
        osc.frequency.setValueAtTime(350, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(587.33, audioCtx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.22);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.22);
      } else if (type === 'leave') {
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(293.66, audioCtx.currentTime + 0.14);
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.24);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.24);
      } else if (type === 'mute' || type === 'unmute') {
        osc.frequency.setValueAtTime(type === 'mute' ? 300 : 500, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
      } else {
        osc.frequency.setValueAtTime(520, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.08);
      }
    } catch {
      // Audio context might be restricted
    }
  };

  const handleCopyUserId = () => {
    navigator.clipboard.writeText('841899954481004564');
    setCopiedId(true);
    playDiscordChime('click');
    setTimeout(() => setCopiedId(false), 2500);
  };

  // Direct Message handler with the Knowledge Engine




  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || chatInput.trim();
    if (!text) return;

    playDiscordChime('click');
    const userMsgId = `msg-${Date.now()}`;
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => [
      ...prev,
      {
        id: userMsgId,
        sender: 'user',
        text: text,
        time: `Today at ${timeString}`
      }
    ]);
    setChatInput('');
    setIsSakshyamTyping(true);
    playChatSound('send');

    // Intelligent answers powered by Gemini API
    const responseDelay = Math.min(1800, Math.max(900, text.length * 30));

    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text })
    })
    .then(res => res.json())
    .then(data => {
      // Simulate delay for realism
      setTimeout(() => {
        setIsSakshyamTyping(false);
        playDiscordChime('ping');

        playChatSound('receive');
          const sakshyamReply = data.reply || "I am currently unavailable, please contact me directly via Discord.";

        setMessages((prev) => [
          ...prev,
          {
            id: `reply-${Date.now()}`,
            sender: 'sakshyam',
            text: sakshyamReply,
            time: `Today at ${timeString}`,
            tag: 'Sakshyam Paudel'
          }
        ]);
      }, responseDelay);
    })
    .catch(err => {
      console.error(err);
      setTimeout(() => {
        setIsSakshyamTyping(false);
        playDiscordChime('ping');
        setMessages((prev) => [
          ...prev,
          {
            id: `reply-${Date.now()}`,
            sender: 'sakshyam',
            text: "I am having trouble connecting right now, please try again or contact me directly via Discord.",
            time: `Today at ${timeString}`,
            tag: 'Sakshyam Paudel'
          }
        ]);
      }, responseDelay);
    });
  };

  const handleToggleVC = (channelKey: 'dev' | 'mcnp_stage' | 'chill') => {
    if (isUserConnectedToVC && userActiveVCChannel === channelKey) {
      // Leaving VC
      setIsUserConnectedToVC(false);
      playDiscordChime('leave');
    } else {
      // Joining VC
      setIsUserConnectedToVC(true);
      setUserActiveVCChannel(channelKey);
      setActiveVoiceRoom(channelKey);
      playDiscordChime('join');
    }
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const renderFormattedChatMessage = (text: string) => {
    const lines = text.split('\n');
    return (
      <div className="space-y-1">
        {lines.map((line, lIdx) => {
          if (!line.trim()) return <div key={lIdx} className="h-1.5" />;
          
          const parts = line.split(/(\*\*.*?\*\*|`.*?`|https?:\/\/[^\s]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g);
          
          return (
            <p key={lIdx} className="leading-relaxed">
              {parts.map((part, pIdx) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                  return (
                    <strong key={pIdx} className="font-bold text-white">
                      {part.slice(2, -2)}
                    </strong>
                  );
                }
                if (part.startsWith('`') && part.endsWith('`')) {
                  return (
                    <code key={pIdx} className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-700/60 font-mono text-[11px] text-amber-300">
                      {part.slice(1, -1)}
                    </code>
                  );
                }
                if (part.match(/^https?:\/\//)) {
                  return (
                    <a
                      key={pIdx}
                      href={part}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#7983f5] underline hover:text-[#99a2ff] inline-flex items-center gap-0.5 font-medium transition-colors"
                    >
                      {part}
                    </a>
                  );
                }
                if (part.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
                  return (
                    <a
                      key={pIdx}
                      href={`mailto:${part}`}
                      className="text-emerald-400 underline hover:text-emerald-300 font-mono font-medium transition-colors"
                    >
                      {part}
                    </a>
                  );
                }
                return part;
              })}
            </p>
          );
        })}
      </div>
    );
  };

  const getStatusColor = () => {
    switch (userStatus) {
      case 'online': return 'bg-emerald-500';
      case 'idle': return 'bg-amber-500';
      case 'dnd': return 'bg-rose-500';
      case 'streaming': return 'bg-purple-500';
    }
  };

  const profileAvatarUrl = liveLanyard?.discord_user?.avatar && liveLanyard.discord_user.avatar.length > 5
    ? `https://cdn.discordapp.com/avatars/${liveLanyard.discord_user.id}/${liveLanyard.discord_user.avatar}.${liveLanyard.discord_user.avatar.startsWith('a_') ? 'gif' : 'png'}?size=256`
    : '/sakshyam-profile.jpg';

  return (
    <section id="discord-dashboard" className="py-24 bg-zinc-950 text-zinc-100 relative overflow-hidden border-t border-zinc-800">
      
      {/* Background Animated VFX & Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-[#5865F2]/10 blur-[150px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-1/4 w-[600px] h-[400px] bg-purple-600/10 blur-[160px] rounded-full pointer-events-none" />
      
      {/* Subtle Digital Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5865F2]/15 text-[#7983f5] text-xs font-bold uppercase tracking-wider mb-4 border border-[#5865F2]/30 shadow-lg shadow-[#5865F2]/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Official Discord Terminal & Real-Time Presence</span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-mono border border-emerald-500/30">
              {wsConnected ? 'WebSocket Live' : 'REST Gateway'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Discord Account Dashboard
          </h2>
          <p className="text-base sm:text-lg text-zinc-400">
            Real-time live presence, instant voice channel states, dynamic Rich Presence activity streams, and intelligent direct message simulation.
          </p>
        </motion.div>

        {/* Main Discord Applet Shell */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-[#1e1f22] rounded-3xl border border-zinc-800/90 shadow-2xl overflow-hidden backdrop-blur-xl"
        >
          {/* Discord Top Window Bar */}
          <div className="bg-[#111214] px-4 sm:px-6 py-3 border-b border-zinc-800/80 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 hover:opacity-100 cursor-pointer inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 hover:opacity-100 cursor-pointer inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 hover:opacity-100 cursor-pointer inline-block" />
              </div>
              <div className="h-4 w-px bg-zinc-800 mx-1 hidden sm:block" />
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-400">
                <span className="px-2 py-0.5 rounded bg-[#5865F2]/20 text-[#7983f5] font-mono">discord.app</span>
                <span className="text-zinc-500">/</span>
                <span className="text-zinc-200">@Sakshyxm (841899954481004564)</span>
              </div>
              
              {/* Live Gateway Sync Pill */}
              <div className="hidden md:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono">
                <Wifi className="w-3 h-3 animate-pulse" />
                <span>Sync: {lastSyncTime}</span>
              </div>

              {lastLiveEventText && (
                <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-[10px] animate-fade-in font-medium">
                  <Sparkle className="w-3 h-3" />
                  <span>{lastLiveEventText}</span>
                </div>
              )}
            </div>

            {/* Top Bar Quick Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Sound toggle */}
              <button
                type="button"
                onClick={() => {
                  setSoundEnabled(!soundEnabled);
                  playDiscordChime('click');
                }}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  soundEnabled
                    ? 'bg-[#5865F2]/20 text-[#7983f5] border border-[#5865F2]/40'
                    : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
                title={soundEnabled ? 'Discord Audio Chimes: Enabled' : 'Discord Audio Chimes: Muted'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                <span className="text-[11px] hidden sm:inline">{soundEnabled ? 'FX On' : 'Muted'}</span>
              </button>

              {/* Status Switcher */}
              <div className="flex items-center gap-1 bg-[#2b2d31] p-1 rounded-xl border border-zinc-700/60 text-xs">
                {(['online', 'idle', 'dnd', 'streaming'] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => {
                      setUserStatus(st);
                      playDiscordChime('click');
                    }}
                    className={`px-2 py-1 rounded-lg text-[11px] font-bold capitalize transition-all flex items-center gap-1.5 ${
                      userStatus === st
                        ? 'bg-[#313338] text-white shadow-xs border border-zinc-600'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${
                      st === 'online' ? 'bg-emerald-500' :
                      st === 'idle' ? 'bg-amber-500' :
                      st === 'dnd' ? 'bg-rose-500' : 'bg-purple-500'
                    }`} />
                    <span className="hidden md:inline">{st}</span>
                  </button>
                ))}
              </div>

              {/* Refresh live status */}
              <button
                type="button"
                onClick={() => {
                  fetchLiveStatus();
                  playDiscordChime('ping');
                }}
                className="p-1.5 rounded-lg bg-[#2b2d31] hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700 transition-all text-xs flex items-center gap-1"
                title="Refresh Live Status"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>

              {/* Launch Modal GUI Button */}
              <button
                type="button"
                onClick={() => {
                  setIsGuiModalOpen(true);
                  playDiscordChime('join');
                }}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#5865F2] to-indigo-600 hover:from-[#4752c4] hover:to-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-[#5865F2]/25 transition-all hover:scale-105 active:scale-95"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Open GUI</span>
              </button>
            </div>
          </div>

          {/* Discord Profile Hero Banner & Identity */}
          <div className="relative">
            <div className="h-44 sm:h-56 w-full bg-gradient-to-r from-[#5865F2] via-purple-700 to-indigo-900 relative overflow-hidden">
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl" />
              <div className="absolute -left-10 -top-10 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl" />
              
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <div className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/90 text-xs font-semibold flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                  <span>Verified Systems Architect & Creator</span>
                </div>
              </div>
            </div>

            {/* Profile Avatar & Badges */}
            <div className="px-6 sm:px-10 pb-6 relative -mt-16 sm:-mt-20">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                
                {/* Avatar */}
                <div className="relative group flex items-end gap-5">
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#5865F2] via-purple-500 to-pink-500 animate-spin-slow opacity-80 blur-xs" />
                    
                    <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-[#1e1f22] overflow-hidden bg-[#2b2d31] shadow-2xl">
                      <img
                        src={profileAvatarUrl}
                        alt="Sakshyam Paudel"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className={`absolute bottom-2 right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full border-4 border-[#1e1f22] ${getStatusColor()} flex items-center justify-center shadow-lg`}>
                      {userStatus === 'dnd' && <span className="w-3 h-1 bg-white rounded-full" />}
                      {userStatus === 'idle' && <span className="w-2.5 h-2.5 bg-[#1e1f22] rounded-full translate-x-0.5 -translate-y-0.5" />}
                    </div>
                  </div>

                  {/* Name & Handle Block */}
                  <div className="mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                        {liveLanyard?.discord_user?.global_name || liveLanyard?.discord_user?.display_name || "Sakshyam Paudel"}
                      </h3>
                      <span className="px-2 py-0.5 rounded-md bg-[#5865F2] text-white text-[10px] font-extrabold uppercase tracking-wide">
                        DEV
                      </span>
                      {liveCustomStatus?.state && (
                        <span className="text-xs bg-zinc-800 text-indigo-300 px-2.5 py-0.5 rounded-full border border-zinc-700 flex items-center gap-1 font-medium">
                          <span>{liveCustomStatus.emoji?.name || '⚡'}</span>
                          <span>{liveCustomStatus.state}</span>
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400 text-sm mt-0.5">
                      <span className="font-mono text-zinc-300">@{liveLanyard?.discord_user?.username || "Sakshyxm"}</span>
                      <span className="text-zinc-600">•</span>
                      <button
                        type="button"
                        onClick={handleCopyUserId}
                        className="inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-white transition-colors bg-zinc-800/80 hover:bg-zinc-700 px-2 py-0.5 rounded-md"
                        title="Copy Discord User ID"
                      >
                        {copiedId ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400 text-[11px] font-bold">Copied ID!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span className="font-mono text-[11px]">841899954481004564</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Badges Rack */}
                <div className="flex items-center gap-2 bg-[#2b2d31]/90 backdrop-blur-md p-2 rounded-2xl border border-zinc-700/60 shadow-lg flex-wrap">
                  <div className="relative group/badge p-1.5 rounded-xl bg-zinc-800/80 hover:bg-[#5865F2]/20 hover:border-[#5865F2]/40 border border-zinc-700/50 transition-all cursor-pointer">
                    <Code2 className="w-5 h-5 text-indigo-400 group-hover/badge:scale-110 transition-transform" />
                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover/badge:flex flex-col items-center z-50 pointer-events-none">
                      <span className="bg-[#111214] text-white text-[11px] font-bold py-1 px-2.5 rounded-lg whitespace-nowrap shadow-xl border border-zinc-700">
                        Active Developer (Discord API)
                      </span>
                    </div>
                  </div>

                  <div className="relative group/badge p-1.5 rounded-xl bg-zinc-800/80 hover:bg-purple-500/20 hover:border-purple-500/40 border border-zinc-700/50 transition-all cursor-pointer">
                    <Sparkles className="w-5 h-5 text-purple-400 group-hover/badge:scale-110 transition-transform" />
                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover/badge:flex flex-col items-center z-50 pointer-events-none">
                      <span className="bg-[#111214] text-white text-[11px] font-bold py-1 px-2.5 rounded-lg whitespace-nowrap shadow-xl border border-zinc-700">
                        HypeSquad Bravery / Balance
                      </span>
                    </div>
                  </div>

                  <div className="relative group/badge p-1.5 rounded-xl bg-zinc-800/80 hover:bg-pink-500/20 hover:border-pink-500/40 border border-zinc-700/50 transition-all cursor-pointer">
                    <Gift className="w-5 h-5 text-pink-400 group-hover/badge:scale-110 transition-transform" />
                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover/badge:flex flex-col items-center z-50 pointer-events-none">
                      <span className="bg-[#111214] text-white text-[11px] font-bold py-1 px-2.5 rounded-lg whitespace-nowrap shadow-xl border border-zinc-700">
                        Subscriber Since 2021 (Nitro Booster)
                      </span>
                    </div>
                  </div>

                  <div className="relative group/badge p-1.5 rounded-xl bg-zinc-800/80 hover:bg-rose-500/20 hover:border-rose-500/40 border border-zinc-700/50 transition-all cursor-pointer">
                    <Flame className="w-5 h-5 text-rose-400 group-hover/badge:scale-110 transition-transform" />
                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover/badge:flex flex-col items-center z-50 pointer-events-none">
                      <span className="bg-[#111214] text-white text-[11px] font-bold py-1 px-2.5 rounded-lg whitespace-nowrap shadow-xl border border-zinc-700">
                        Server Booster Level 3 (24+ Months)
                      </span>
                    </div>
                  </div>

                  <div className="relative group/badge p-1.5 rounded-xl bg-zinc-800/80 hover:bg-red-500/20 hover:border-red-500/40 border border-zinc-700/50 transition-all cursor-pointer">
                    <Shield className="w-5 h-5 text-red-400 group-hover/badge:scale-110 transition-transform" />
                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover/badge:flex flex-col items-center z-50 pointer-events-none">
                      <span className="bg-[#111214] text-white text-[11px] font-bold py-1 px-2.5 rounded-lg whitespace-nowrap shadow-xl border border-zinc-700">
                        Head Management Team @ MCNP
                      </span>
                    </div>
                  </div>

                  <a
                    href="https://discord.com/users/841899954481004564"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 px-3 py-1.5 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-[#5865F2]/20"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Add Friend</span>
                  </a>
                </div>

              </div>
            </div>
          </div>

          {/* Live Activity RPC Cards (VS Code, Spotify/Gana, Minecraft) */}
          <div className="p-6 sm:p-8 bg-[#1e1f22]">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Laptop className="w-4 h-4 text-indigo-400" />
              <span>Active Multi-Tasking & Rich Presence Streams</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* VS Code Card */}
              <div className="bg-[#2b2d31] rounded-2xl p-4 border border-zinc-700/60 shadow-md relative overflow-hidden group hover:border-indigo-500/50 transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                    <Code2 className="w-6 h-6 text-blue-400 animate-pulse" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-blue-400 flex items-center justify-between">
                      <span>Visual Studio Code</span>
                      {liveVSCodeActivity && (
                        <span className="text-[9px] bg-blue-500/20 text-blue-300 px-1.5 py-0.2 rounded font-mono">
                          Live Active
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-bold text-white truncate">
                      {liveVSCodeActivity?.details || "gana.mcnp.network"}
                    </div>
                    <div className="text-xs text-zinc-400 truncate">
                      {liveVSCodeActivity?.state ? (
                        <span>{liveVSCodeActivity.state}</span>
                      ) : (
                        <>Editing <span className="text-zinc-300 font-mono">App.tsx</span> (React/TS)</>
                      )}
                    </div>
                    <div className="text-[11px] text-zinc-500 mt-1 flex items-center gap-1 font-mono">
                      <span>Elapsed: {formatTime(sessionSeconds)}</span>
                      <span className="animate-ping inline-block w-1.5 h-1.5 bg-blue-400 rounded-full ml-1" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Spotify / Gana Music Player Card */}
              <div className="bg-[#2b2d31] rounded-2xl p-4 border border-zinc-700/60 shadow-md relative overflow-hidden group hover:border-emerald-500/50 transition-all">
                <div className="flex items-start gap-3">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-zinc-900 border border-emerald-500/30 flex items-center justify-center shrink-0">
                    {liveSpotifyData?.album_art_url ? (
                      <img
                        src={liveSpotifyData.album_art_url}
                        alt="Spotify Album"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <GanaLogo className={`w-8 h-8 ${isPlayingSpotify ? 'animate-spin-slow' : ''}`} />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center justify-between">
                      <span>{liveSpotifyData ? 'Spotify Live' : 'Gana Music • Spotify HD'}</span>
                      <div className="flex items-center gap-0.5">
                        <span className="w-1 h-3 bg-emerald-400 rounded-full animate-pulse" />
                        <span className="w-1 h-4 bg-emerald-400 rounded-full animate-pulse delay-75" />
                        <span className="w-1 h-2 bg-emerald-400 rounded-full animate-pulse delay-150" />
                      </div>
                    </div>
                    <div className="text-sm font-bold text-white truncate">
                      {liveSpotifyData?.song || "Starboy"}
                    </div>
                    <div className="text-xs text-zinc-400 truncate">
                      {liveSpotifyData?.artist || "The Weeknd, Daft Punk"}
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-[10px] font-mono text-zinc-400">{formatTime(spotifySeconds)}</span>
                      <div className="h-1 flex-1 bg-zinc-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-400 rounded-full transition-all duration-300"
                          style={{ width: `${(spotifySeconds / 230) * 100}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-zinc-400">3:50</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Minecraft Multiplayer Network Card */}
              <div className="bg-[#2b2d31] rounded-2xl p-4 border border-zinc-700/60 shadow-md relative overflow-hidden group hover:border-red-500/50 transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center shrink-0">
                    <McnpLogo className="w-8 h-8 group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-red-400 flex items-center justify-between">
                      <span>Minecraft Nepal (MCNP)</span>
                      <span className="text-emerald-400 text-[10px] font-bold">20.0 TPS</span>
                    </div>
                    <div className="text-sm font-bold text-white truncate font-mono">
                      play.mcnp.network
                    </div>
                    <div className="text-xs text-zinc-400 truncate">
                      Head Management • Velocity Proxy
                    </div>
                    <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-semibold">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span>Online • Ping: 18ms</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Interactive Discord Terminal Tabs & GUI Sub-systems */}
          <div className="border-t border-zinc-800 bg-[#2b2d31]">
            
            {/* Tab Navigation Header */}
            <div className="px-6 py-3 border-b border-zinc-700/80 flex items-center gap-2 overflow-x-auto">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('profile');
                  playDiscordChime('click');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 ${
                  activeTab === 'profile'
                    ? 'bg-[#313338] text-white shadow-md border border-zinc-600'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
                }`}
              >
                <Users className="w-4 h-4 text-indigo-400" />
                <span>Profile & Bio</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('dm');
                  playDiscordChime('click');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 ${
                  activeTab === 'dm'
                    ? 'bg-[#313338] text-white shadow-md border border-zinc-600'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
                }`}
              >
                <MessageSquare className="w-4 h-4 text-[#7983f5]" />
                <span>Direct Message Simulator</span>
                <span className="w-2 h-2 rounded-full bg-[#5865F2]" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('voice');
                  playDiscordChime('click');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 ${
                  activeTab === 'voice'
                    ? 'bg-[#313338] text-white shadow-md border border-zinc-600'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
                }`}
              >
                <Headphones className="w-4 h-4 text-emerald-400" />
                <span>Voice Lounge (✦ Dev)</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 rounded">
                  {isUserConnectedToVC ? 'Connected' : 'Live Gateway'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('servers');
                  playDiscordChime('click');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 ${
                  activeTab === 'servers'
                    ? 'bg-[#313338] text-white shadow-md border border-zinc-600'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
                }`}
              >
                <Layers className="w-4 h-4 text-purple-400" />
                <span>Mutual Guilds & Bots</span>
              </button>
            </div>

            {/* Tab Body Contents */}
            <div className="p-6 sm:p-8 bg-[#313338] min-h-[320px]">
              
              {/* TAB 1: Profile & About Me */}
              {activeTab === 'profile' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Bio Section */}
                    <div className="lg:col-span-2 space-y-4">
                      <div className="bg-[#2b2d31] p-5 rounded-2xl border border-zinc-700/60">
                        <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                          About Me (Discord Bio)
                        </h5>
                        <p className="text-sm text-zinc-200 leading-relaxed">
                          Hey! I’m <strong className="text-white">Sakshyam Paudel</strong> (handle: <span className="text-indigo-400 font-mono">@Sakshyxm</span>). I specialize in website design & frontend architecture (<a href="https://gana.mcnp.network" target="_blank" rel="noreferrer" className="text-[#7983f5] underline hover:text-white font-mono">gana.mcnp.network</a>), Minecraft multiplayer network systems (MCNP Network), and scalable Discord bot infrastructure (Gana Music & Nexus Security).
                        </p>
                        <div className="mt-4 pt-4 border-t border-zinc-700/60 flex flex-wrap gap-2 text-xs">
                          <span className="px-2.5 py-1 rounded-lg bg-zinc-800 text-zinc-300 font-medium">
                            📍 Gaindakot, Nepal
                          </span>
                          <span className="px-2.5 py-1 rounded-lg bg-zinc-800 text-zinc-300 font-medium">
                            💼 Open for Web & Server Architecture
                          </span>
                          <span className="px-2.5 py-1 rounded-lg bg-zinc-800 text-zinc-300 font-medium">
                            ⚡ Discord.js & Java / Velocity
                          </span>
                        </div>
                      </div>

                      {/* Connected Accounts & Portals */}
                      <div className="bg-[#2b2d31] p-5 rounded-2xl border border-zinc-700/60">
                        <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                          Connected Accounts & Web Links
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <a
                            href="https://gana.mcnp.network"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2.5 px-4 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors shadow-sm"
                          >
                            <Globe className="w-4 h-4" />
                            gana.mcnp.network
                          </a>

                          <a
                            href="https://github.com/sakshyxmpdl"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2.5 px-4 rounded bg-zinc-700 hover:bg-zinc-600 text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors shadow-sm"
                          >
                            <FolderCode className="w-4 h-4" />
                            GitHub / sakshyxmpdl
                          </a>

                          <a
                            href="https://dsc.gg/nexusstdo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2.5 px-4 rounded bg-[#5865F2] hover:bg-[#4752C4] text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors shadow-sm"
                          >
                            <MessageSquare className="w-4 h-4" />
                            Nexus Studio
                          </a>

                          <a
                            href="https://discord.gg/minecraftnepal"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2.5 px-4 rounded bg-[#5865F2] hover:bg-[#4752C4] text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors shadow-sm"
                          >
                            <Shield className="w-4 h-4" />
                            MCNP Discord
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Roles & Roles Badges Column */}
                    <div className="space-y-4">
                      <div className="bg-[#2b2d31] p-5 rounded-2xl border border-zinc-700/60 text-xs text-zinc-400 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-zinc-400">
                            <Clock className="w-3.5 h-3.5 text-indigo-400" />
                            <span>Discord Member Since:</span>
                          </span>
                          <span className="text-white font-semibold font-mono">Dec 19, 2019</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-zinc-400">
                            <Activity className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Current Live Status:</span>
                          </span>
                          <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="capitalize">{liveLanyard?.discord_status || userStatus}</span>
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-zinc-400">
                            <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                            <span>Verified Developer:</span>
                          </span>
                          <span className="text-emerald-400 font-semibold">Active Developer ✓</span>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-zinc-700/60">
                          <span className="flex items-center gap-1.5 text-zinc-400">
                            <Hash className="w-3.5 h-3.5 text-[#7983f5]" />
                            <span>Discord ID:</span>
                          </span>
                          <div className="flex items-center gap-2">
                            <code className="text-zinc-200 font-mono text-[11px] bg-zinc-900/80 px-2 py-0.5 rounded border border-zinc-700">
                              841899954481004564
                            </code>
                            <button
                              type="button"
                              onClick={handleCopyUserId}
                              className="text-zinc-400 hover:text-white transition-colors"
                              title="Copy Discord User ID"
                            >
                              {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </motion.div>
              )}

              {/* TAB 2: Direct Message Simulator with Intelligent Answers */}
              {activeTab === 'dm' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col h-[420px]"
                >
                  {/* Message History */}
                  <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4 scrollbar-thin">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex items-start gap-3 text-xs ${
                          msg.sender === 'system'
                            ? 'bg-zinc-800/40 p-3 rounded-xl border border-zinc-700/40 text-zinc-400 text-center justify-center'
                            : ''
                        }`}
                      >
                        {msg.sender === 'sakshyam' && (
                          <div className="w-9 h-9 rounded-full overflow-hidden bg-zinc-800 shrink-0 border border-indigo-500/50">
                            <img src={profileAvatarUrl} alt="Sakshyam" className="w-full h-full object-cover" />
                          </div>
                        )}
                        {msg.sender === 'user' && (
                          <div className="w-9 h-9 rounded-full bg-[#5865F2] text-white flex items-center justify-center font-bold text-xs shrink-0">
                            YOU
                          </div>
                        )}

                        {msg.sender !== 'system' && (
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`font-bold ${msg.sender === 'sakshyam' ? 'text-indigo-300' : 'text-zinc-200'}`}>
                                {msg.sender === 'sakshyam' ? (liveLanyard?.discord_user?.global_name || 'Sakshyam Paudel') : 'You (Visitor)'}
                              </span>
                              {msg.sender === 'sakshyam' && (
                                <span className="px-1.5 py-0.2 rounded bg-[#5865F2] text-white text-[9px] font-extrabold">
                                  DEV
                                </span>
                              )}
                              <span className="text-[10px] text-zinc-500 font-mono">{msg.time}</span>
                            </div>
                            <div className="p-3.5 rounded-2xl bg-[#2b2d31] text-zinc-200 text-xs leading-relaxed border border-zinc-700/50 inline-block max-w-full shadow-xs">
                              {renderFormattedChatMessage(msg.text)}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    {isSakshyamTyping && (
                      <div className="flex items-center gap-2 text-xs text-zinc-400 italic py-1">
                        <span className="w-2 h-2 rounded-full bg-[#5865F2] animate-bounce" />
                        <span className="w-2 h-2 rounded-full bg-[#5865F2] animate-bounce delay-75" />
                        <span className="w-2 h-2 rounded-full bg-[#5865F2] animate-bounce delay-150" />
                        <span>Sakshyxm is typing a response...</span>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Interactive Quick Prompts & Suggestions */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 text-[11px] scrollbar-none">
                    <span className="text-zinc-400 text-xs shrink-0 font-semibold">Suggested:</span>
                    <button
                      type="button"
                      onClick={() => handleSendMessage("Are you open for commissions?")}
                      className="px-2.5 py-1 rounded-lg bg-[#5865F2]/20 hover:bg-[#5865F2]/40 text-indigo-200 border border-[#5865F2]/50 shrink-0 transition-colors font-medium"
                    >
                      "Are you open for commissions?"
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSendMessage("How can I contact you for a project or commission?")}
                      className="px-2.5 py-1 rounded-lg bg-[#2b2d31] hover:bg-[#5865F2]/20 hover:text-white text-zinc-300 border border-zinc-700 shrink-0 transition-colors"
                    >
                      "How do I contact you?"
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSendMessage("Tell me about Gana Music bot and its website gana.mcnp.network")}
                      className="px-2.5 py-1 rounded-lg bg-[#2b2d31] hover:bg-[#5865F2]/20 hover:text-white text-zinc-300 border border-zinc-700 shrink-0 transition-colors"
                    >
                      "Tell me about Gana Music bot"
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSendMessage("How do you configure Minecraft Velocity proxies for crossplay?")}
                      className="px-2.5 py-1 rounded-lg bg-[#2b2d31] hover:bg-[#5865F2]/20 hover:text-white text-zinc-300 border border-zinc-700 shrink-0 transition-colors"
                    >
                      "How do you setup Velocity proxies?"
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSendMessage("What is your web development tech stack?")}
                      className="px-2.5 py-1 rounded-lg bg-[#2b2d31] hover:bg-[#5865F2]/20 hover:text-white text-zinc-300 border border-zinc-700 shrink-0 transition-colors"
                    >
                      "What is your tech stack?"
                    </button>
                  </div>

                  {/* Chat Input Field */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage();
                    }}
                    className="flex items-center gap-2 bg-[#2b2d31] p-2 rounded-2xl border border-zinc-700 focus-within:border-[#5865F2] transition-colors"
                  >
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask @Sakshyxm anything (e.g. servers, bot, web design, hire)..."
                      className="flex-1 bg-transparent px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={!chatInput.trim()}
                      className="p-2 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] disabled:opacity-40 text-white transition-all shadow-md"
                      title="Send message"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </motion.div>
              )}

              {/* TAB 3: Real-Time Voice Lounge & Channel State (VC Join / Leave Simulation) */}
              {activeTab === 'voice' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="bg-[#2b2d31] p-6 rounded-2xl border border-zinc-700/60">
                    
                    {/* Voice Channel Header */}
                    <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
                      <div className="flex items-center gap-3">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                          isUserConnectedToVC ? 'bg-emerald-500/20 border border-emerald-500/40' : 'bg-zinc-800 border border-zinc-700'
                        }`}>
                          <Radio className={`w-6 h-6 ${isUserConnectedToVC ? 'text-emerald-400 animate-pulse' : 'text-zinc-500'}`} />
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-white flex items-center gap-2 flex-wrap">
                            <span>🔊 {
                              userActiveVCChannel === 'dev' ? '✦ Dev Lounge | MCNP Systems' :
                              userActiveVCChannel === 'mcnp_stage' ? '🎙️ MCNP Live Stage' : '☕ Chill & Code Lounge'
                            }</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                              isUserConnectedToVC ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-zinc-400'
                            }`}>
                              {isUserConnectedToVC ? `RTC Connected • ${voiceBitrate}` : 'Disconnected'}
                            </span>
                          </h5>
                          <p className="text-xs text-zinc-400">
                            {isUserConnectedToVC ? 'Gaindakot / Singapore Edge Voice Gateway • Ping: 12ms' : 'Click "Join Voice" below to enter the channel room'}
                          </p>
                        </div>
                      </div>

                      {/* Real-time Voice Controls & Actions */}
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* VC Join/Leave Button */}
                        <button
                          type="button"
                          onClick={() => handleToggleVC(userActiveVCChannel)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md ${
                            isUserConnectedToVC
                              ? 'bg-rose-600 hover:bg-rose-700 text-white'
                              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          }`}
                        >
                          <PhoneCall className="w-4 h-4" />
                          <span>{isUserConnectedToVC ? 'Disconnect VC' : 'Join Voice Channel'}</span>
                        </button>

                        {/* Mic Mute Button */}
                        <button
                          type="button"
                          onClick={() => {
                            const next = !isUserMuted;
                            setIsUserMuted(next);
                            playDiscordChime(next ? 'mute' : 'unmute');
                          }}
                          className={`p-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                            isUserMuted ? 'bg-rose-500 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                          }`}
                          title="Toggle Mic"
                        >
                          {isUserMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                          <span className="text-[11px]">{isUserMuted ? 'Muted' : 'Mic On'}</span>
                        </button>

                        {/* Deafen Button */}
                        <button
                          type="button"
                          onClick={() => {
                            const next = !isUserDeafened;
                            setIsUserDeafened(next);
                            playDiscordChime(next ? 'mute' : 'unmute');
                          }}
                          className={`p-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                            isUserDeafened ? 'bg-rose-500 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                          }`}
                          title="Toggle Deafen"
                        >
                          <Headphones className="w-4 h-4" />
                          <span className="text-[11px]">{isUserDeafened ? 'Deafened' : 'Listening'}</span>
                        </button>

                        {/* Soundboard FX */}
                        <button
                          type="button"
                          onClick={() => playDiscordChime('ping')}
                          className="p-2.5 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
                          title="Play Soundboard Chime"
                        >
                          <Sparkles className="w-4 h-4" />
                          <span className="text-[11px] hidden sm:inline">Chime</span>
                        </button>
                      </div>
                    </div>

                    {/* Channel Selector Bar */}
                    <div className="flex items-center gap-2 mb-6 p-1.5 bg-[#1e1f22] rounded-xl border border-zinc-700/60 overflow-x-auto text-xs">
                      <span className="text-zinc-400 font-semibold px-2 text-[11px]">Select Room:</span>
                      {[
                        { id: 'dev', name: '🔊 ✦ Dev Lounge (Sakshyam Active)', desc: 'Systems Dev' },
                        { id: 'mcnp_stage', name: '🎙️ MCNP Live Stage', desc: 'Community QA' },
                        { id: 'chill', name: '☕ Chill & Code', desc: 'Lofi & Chat' }
                      ].map((room) => (
                        <button
                          key={room.id}
                          type="button"
                          onClick={() => {
                            setUserActiveVCChannel(room.id as any);
                            setActiveVoiceRoom(room.id as any);
                            setIsUserConnectedToVC(true);
                            playDiscordChime('join');
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                            userActiveVCChannel === room.id && isUserConnectedToVC
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                          }`}
                        >
                          <span>{room.name}</span>
                        </button>
                      ))}
                    </div>

                    {/* Active Voice Participants in Room */}
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center justify-between">
                        <span>Connected Members in Voice ({isUserConnectedToVC ? '4' : '3'})</span>
                        <span className="text-emerald-400 font-mono text-[11px]">HD Audio Active</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        
                        {/* 1. Sakshyam (Speaking / Host) */}
                        <div className="p-4 rounded-2xl bg-[#313338] border-2 border-emerald-500/80 shadow-lg shadow-emerald-500/10 flex items-center gap-3 relative">
                          <div className="relative">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-400">
                              <img src={profileAvatarUrl} alt="Sakshyam" className="w-full h-full object-cover" />
                            </div>
                            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#313338]" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-bold text-white truncate flex items-center gap-1">
                              <span>{liveLanyard?.discord_user?.global_name || 'Sakshyam Paudel'}</span>
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                            </div>
                            <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                              <Volume1 className="w-3.5 h-3.5" />
                              <span>Speaking (Host)</span>
                            </div>
                          </div>
                        </div>

                        {/* 2. You (Visitor - If connected) */}
                        {isUserConnectedToVC && (
                          <div className={`p-4 rounded-2xl bg-[#313338] border ${
                            isUserMuted ? 'border-zinc-700' : 'border-indigo-500/60 shadow-md shadow-indigo-500/10'
                          } flex items-center gap-3`}>
                            <div className="relative">
                              <div className="w-12 h-12 rounded-full bg-[#5865F2] text-white flex items-center justify-center font-bold text-sm">
                                YOU
                              </div>
                              <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#313338] ${
                                isUserMuted ? 'bg-rose-500' : 'bg-emerald-500'
                              }`} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-xs font-bold text-white truncate">You (Visitor)</div>
                              <div className="text-[11px] text-zinc-400">
                                {isUserMuted ? 'Muted' : isUserDeafened ? 'Deafened' : 'Listening'}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* 3. Gana Music Bot (Streaming 24/7 Audio) */}
                        <div className="p-4 rounded-2xl bg-[#313338] border border-purple-500/40 flex items-center gap-3">
                          <div className="relative">
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-900 border border-purple-400 flex items-center justify-center">
                              <GanaLogo className="w-8 h-8 animate-spin-slow" />
                            </div>
                            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-purple-500 rounded-full border-2 border-[#313338]" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-bold text-white truncate flex items-center gap-1">
                              <span>Gana Music Bot</span>
                              <span className="px-1 bg-[#5865F2] text-white text-[8px] font-bold rounded">BOT</span>
                            </div>
                            <div className="text-[11px] text-purple-400 font-semibold flex items-center gap-1">
                              <Music2 className="w-3.5 h-3.5" />
                              <span>Streaming Lavalink</span>
                            </div>
                          </div>
                        </div>

                        {/* 4. Nexus Security Sentry */}
                        <div className="p-4 rounded-2xl bg-[#313338] border border-zinc-700 flex items-center gap-3">
                          <div className="relative">
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-900 border border-zinc-600 flex items-center justify-center">
                              <NexusLogo className="w-8 h-8" />
                            </div>
                            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#313338]" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-bold text-white truncate flex items-center gap-1">
                              <span>Nexus Sentinel</span>
                              <span className="px-1 bg-[#5865F2] text-white text-[8px] font-bold rounded">BOT</span>
                            </div>
                            <div className="text-[11px] text-zinc-400 font-medium">Auto-Mod Sentry</div>
                          </div>
                        </div>

                      </div>
                    </div>

                  </div>
                </motion.div>
              )}

              {/* TAB 4: Mutual Servers & Communities */}
              {activeTab === 'servers' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    
                    {/* Server 1: MCNP */}
                    <div className="bg-[#2b2d31] p-5 rounded-2xl border border-zinc-700/60 hover:border-red-500/50 transition-all flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 rounded-2xl bg-red-950/60 border border-red-500/30 flex items-center justify-center shrink-0">
                            <McnpLogo className="w-9 h-9" />
                          </div>
                          <div>
                            <h5 className="text-sm font-bold text-white">Minecraft Nepal</h5>
                            <span className="text-[11px] text-zinc-400">play.mcnp.network</span>
                          </div>
                        </div>
                        <p className="text-xs text-zinc-300 mb-4 leading-relaxed">
                          Premier multiplayer network in Nepal. Survival, Lifesteal, PvP & RPG crossplay realms.
                        </p>
                      </div>
                      <a
                        href="https://discord.gg/minecraftnepal"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 rounded-xl bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all border border-red-500/40"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Join MCNP Discord</span>
                      </a>
                    </div>

                    {/* Server 2: Nexus Studio */}
                    <div className="bg-[#2b2d31] p-5 rounded-2xl border border-zinc-700/60 hover:border-indigo-500/50 transition-all flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 rounded-2xl bg-indigo-950/60 border border-indigo-500/30 flex items-center justify-center shrink-0">
                            <NexusLogo className="w-9 h-9" />
                          </div>
                          <div>
                            <h5 className="text-sm font-bold text-white">Nexus Studio</h5>
                            <span className="text-[11px] text-zinc-400">dsc.gg/nexusstdo</span>
                          </div>
                        </div>
                        <p className="text-xs text-zinc-300 mb-4 leading-relaxed">
                          Official development hub for Nexus Security, custom bot frameworks, and systems architecture.
                        </p>
                      </div>
                      <a
                        href="https://dsc.gg/nexusstdo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 rounded-xl bg-[#5865F2]/20 hover:bg-[#5865F2] text-indigo-300 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all border border-indigo-500/40"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Join Nexus Studio</span>
                      </a>
                    </div>

                    {/* Server 3: Gana Music */}
                    <div className="bg-[#2b2d31] p-5 rounded-2xl border border-zinc-700/60 hover:border-purple-500/50 transition-all flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 rounded-2xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center shrink-0">
                            <GanaLogo className="w-9 h-9" />
                          </div>
                          <div>
                            <h5 className="text-sm font-bold text-white">Gana Music Portal</h5>
                            <span className="text-[11px] text-zinc-400">gana.mcnp.network</span>
                          </div>
                        </div>
                        <p className="text-xs text-zinc-300 mb-4 leading-relaxed">
                          High-fidelity 24/7 audio bot with Spotify HD streaming, 8D audio filters, and web dashboard.
                        </p>
                      </div>
                      <a
                        href="https://gana.mcnp.network"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all border border-purple-500/40"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Visit gana.mcnp.network</span>
                      </a>
                    </div>

                  </div>
                </motion.div>
              )}

            </div>
          </div>
        </motion.div>

      </div>

      {/* FULL DISCORD CLIENT GUI MODAL POPUP */}
      <AnimatePresence>
        {isGuiModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-5xl h-[85vh] bg-[#313338] rounded-3xl border border-zinc-700 shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Modal Top Bar */}
              <div className="bg-[#1e1f22] px-4 py-3 border-b border-zinc-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-zinc-300 font-bold">
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span>Discord Desktop Client GUI Simulator — @{liveLanyard?.discord_user?.username || 'Sakshyxm'}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsGuiModalOpen(false)}
                  className="p-1 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Discord App Layout Simulator (Servers Sidebar, Channels, Chat) */}
              <div className="flex-1 flex overflow-hidden">
                
                {/* 1. Left Guilds Sidebar */}
                <div className="w-16 bg-[#1e1f22] p-2 flex flex-col items-center gap-3 border-r border-zinc-800/80">
                  <div className="w-10 h-10 rounded-2xl bg-[#5865F2] flex items-center justify-center text-white font-bold cursor-pointer hover:rounded-xl transition-all shadow-md">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="w-8 h-px bg-zinc-700/60" />
                  
                  {/* MCNP Guild */}
                  <div className="w-10 h-10 rounded-2xl bg-zinc-800 hover:rounded-xl hover:bg-red-600 transition-all flex items-center justify-center cursor-pointer relative group">
                    <McnpLogo className="w-7 h-7" />
                    <span className="absolute left-full ml-3 bg-black text-white text-[11px] font-bold py-1 px-2 rounded whitespace-nowrap hidden group-hover:block z-50">
                      Minecraft Nepal (MCNP)
                    </span>
                  </div>

                  {/* Nexus Guild */}
                  <div className="w-10 h-10 rounded-2xl bg-zinc-800 hover:rounded-xl hover:bg-indigo-600 transition-all flex items-center justify-center cursor-pointer relative group">
                    <NexusLogo className="w-7 h-7" />
                    <span className="absolute left-full ml-3 bg-black text-white text-[11px] font-bold py-1 px-2 rounded whitespace-nowrap hidden group-hover:block z-50">
                      Nexus Studio
                    </span>
                  </div>

                  {/* Gana Music Guild */}
                  <div className="w-10 h-10 rounded-2xl bg-zinc-800 hover:rounded-xl hover:bg-purple-600 transition-all flex items-center justify-center cursor-pointer relative group">
                    <GanaLogo className="w-7 h-7" />
                    <span className="absolute left-full ml-3 bg-black text-white text-[11px] font-bold py-1 px-2 rounded whitespace-nowrap hidden group-hover:block z-50">
                      Gana Music Support
                    </span>
                  </div>
                </div>

                {/* 2. Channels Column */}
                <div className="w-56 bg-[#2b2d31] p-3 hidden md:flex flex-col justify-between border-r border-zinc-800/80">
                  <div>
                    <div className="font-bold text-sm text-white px-2 py-1.5 border-b border-zinc-700/60 mb-3 flex items-center justify-between">
                      <span>MCNP Ecosystem</span>
                      <Shield className="w-3.5 h-3.5 text-emerald-400" />
                    </div>

                    <div className="space-y-1 text-xs text-zinc-400">
                      <div className="px-2 py-1.5 rounded-lg bg-[#35373c] text-white font-semibold flex items-center gap-1.5 cursor-pointer">
                        <Hash className="w-3.5 h-3.5 text-zinc-400" />
                        <span>announcements</span>
                      </div>
                      <div className="px-2 py-1.5 rounded-lg hover:bg-zinc-800 hover:text-zinc-200 flex items-center gap-1.5 cursor-pointer">
                        <Hash className="w-3.5 h-3.5 text-zinc-400" />
                        <span>sakshyxm-updates</span>
                      </div>
                      <div className="px-2 py-1.5 rounded-lg hover:bg-zinc-800 hover:text-zinc-200 flex items-center gap-1.5 cursor-pointer">
                        <Hash className="w-3.5 h-3.5 text-zinc-400" />
                        <span>bot-commands</span>
                      </div>
                      <div className="px-2 py-1.5 rounded-lg hover:bg-zinc-800 hover:text-zinc-200 flex items-center gap-1.5 cursor-pointer">
                        <Hash className="w-3.5 h-3.5 text-zinc-400" />
                        <span>web-portals</span>
                      </div>
                    </div>
                  </div>

                  {/* User footer in channels bar */}
                  <div className="bg-[#232428] p-2 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-zinc-800">
                        <img src={profileAvatarUrl} alt="Sakshyam" className="w-full h-full object-cover" />
                      </div>
                      <div className="text-[11px] leading-tight">
                        <div className="font-bold text-white">{liveLanyard?.discord_user?.username || 'Sakshyxm'}</div>
                        <div className="text-zinc-400 text-[10px] capitalize">{userStatus}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-zinc-400">
                      <Mic className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
                      <Headphones className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
                      <Settings className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
                    </div>
                  </div>
                </div>

                {/* 3. Main Chat Channel Area */}
                <div className="flex-1 bg-[#313338] flex flex-col justify-between p-4 sm:p-6 overflow-hidden">
                  
                  {/* Channel Header */}
                  <div className="pb-3 border-b border-zinc-700/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 font-bold text-white">
                      <Hash className="w-4 h-4 text-zinc-400" />
                      <span>announcements</span>
                      <span className="text-zinc-500 font-normal hidden sm:inline">| Official network broadcasts & releases</span>
                    </div>
                    <div className="flex items-center gap-3 text-zinc-400">
                      <Bell className="w-4 h-4 cursor-pointer hover:text-white" />
                      <Pin className="w-4 h-4 cursor-pointer hover:text-white" />
                      <Users className="w-4 h-4 cursor-pointer hover:text-white" />
                    </div>
                  </div>

                  {/* Feed */}
                  <div className="flex-1 overflow-y-auto py-4 space-y-5">
                    {/* Announcement post */}
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-indigo-500/50">
                        <img src={profileAvatarUrl} alt="Sakshyam" className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-indigo-300">{liveLanyard?.discord_user?.global_name || 'Sakshyam Paudel'}</span>
                          <span className="px-1.5 py-0.2 rounded bg-[#5865F2] text-white text-[9px] font-extrabold">DEV</span>
                          <span className="text-zinc-500 text-xs font-mono">Today at 11:30 AM</span>
                        </div>
                        <div className="bg-[#2b2d31] p-4 rounded-2xl border border-zinc-700/60 text-xs sm:text-sm text-zinc-200 space-y-3 leading-relaxed">
                          <p className="font-bold text-white">
                            🚀 Network Update & Gana Web Systems Release
                          </p>
                          <p>
                            The official web portal (<a href="https://gana.mcnp.network" target="_blank" rel="noreferrer" className="text-[#7983f5] underline font-mono">gana.mcnp.network</a>) and MCNP systems are now operating with complete live presence, interactive terminals, and multi-network routing.
                          </p>
                          <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-700/60 font-mono text-xs text-emerald-400">
                            ✓ Minecraft Nepal Proxy: play.mcnp.network (v1.20 - 1.26.x)<br />
                            ✓ Gana Music Bot: 100% Lavalink Audio Uptime<br />
                            ✓ Gana Web Portal: 99+ Lighthouse Mobile Performance
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chat bar */}
                  <div className="bg-[#383a40] p-2.5 rounded-2xl flex items-center gap-2 text-xs">
                    <PlusCircle className="w-5 h-5 text-zinc-400 cursor-pointer hover:text-white" />
                    <input
                      type="text"
                      placeholder="Message #announcements"
                      className="flex-1 bg-transparent text-white placeholder-zinc-500 focus:outline-none"
                    />
                    <Gift className="w-5 h-5 text-zinc-400 cursor-pointer hover:text-white" />
                    <Smile className="w-5 h-5 text-zinc-400 cursor-pointer hover:text-white" />
                  </div>

                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
