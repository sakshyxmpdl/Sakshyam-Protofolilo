import { Project, SkillCategory, ExperienceItem, UserProfile, DiscordBot } from '../types';

export const initialProfile: UserProfile = {
  name: "Sakshyam Paudel",
  title: "Website Designer & Systems Architect | Minecraft, Web & Discord Ecosystems",
  location: "Gaindakot, Nepal (Open to Global Remote)",
  email: "Sakshyxmpdl@gmail.com",
  github: "https://github.com/sakshyxmpdl",
  discord: "https://discord.com/users/841899954481004564",
  bio: "Hey, I’m Sakshyam Paudel, a website designer, developer, and systems architect from Gaindakot, Nepal. I go by Sakshyxm on Discord, Minecraft, and other handles.\n\nI specialize in crafting modern, high-performance web experiences (such as gana.mcnp.network), architecting large-scale Minecraft multiplayer networks (MCNP), and building high-concurrency Discord automation systems. I love turning complex technical challenges into clean, responsive, and visually stunning digital products.\n\nI’m always learning, experimenting, and bringing new ideas to life with precision and creativity.",
  availability: "Available for Website Design, Server Architecture & Bot Development",
  yearsExperience: 5,
  completedProjects: 25,
  age: 23,
};

export const discordBotsData: DiscordBot[] = [
  {
    id: "bot-1",
    name: "Nexus Security",
    role: "All-in-One Multipurpose Security & Community Bot",
    description: "Enterprise-grade multipurpose Discord bot designed to protect communities with advanced anti-nuke, auto-moderation, ticket support, welcome cards, custom announcements, fun minigames, and comprehensive moderation tools.",
    features: [
      "Advanced Anti-Nuke & Anti-Raid Quarantine Shield",
      "Smart Auto-Moderation (Regex, Spam, Phishing Block)",
      "Full Ticket Support System with Transcript Logs",
      "Custom Welcome & Leave Cards with Auto-Roles",
      "Interactive Fun, Economy & Mini-Games Suite",
      "Dynamic Announcement Builder & Event Schedulers"
    ],
    status: "Active & Protecting 850+ Guilds",
    serversCount: "850+ Servers",
    image: "/nexus-security-logo.png",
    commands: ["/shield on", "/automod", "/ticket setup", "/welcome config", "/game trivia", "/announce"]
  },
  {
    id: "bot-2",
    name: "Gana",
    role: "High-Performance Music Bot (JavaScript, Discord.js & MongoDB)",
    description: "Gana is a high-performance Discord music bot built entirely in JavaScript, Discord.js, and MongoDB. Seamless high-fidelity streaming, 24/7 smart autoplay, and rich interactive button-driven ecosystem.",
    features: [
      "🎧 Multi-Platform Audio: Seamless, high-fidelity streaming from Spotify, YouTube, and Apple Music via Lavalink",
      "📻 24/7 Smart Autoplay: Continuous, algorithm-driven radio that auto-reconnects and intelligently queues similar tracks",
      "💎 Custom Ecosystem: Interactive button-driven UI, mass-messaging tools, and secure premium code economy",
      "Lossless 96kHz Low-Latency Audio Streaming with zero lag"
    ],
    status: "Online & Serving 1,250+ Servers",
    serversCount: "1,250+ Servers",
    image: "/gana-logo.jpg",
    commands: ["/play", "/queue", "/autoplay", "/247", "/premium"]
  }
];

export const projectsData: Project[] = [
  {
    id: "proj-gana-web",
    title: "Gana Music Web Portal",
    tagline: "Lead Web Designer | Official Gana Music Portal (gana.mcnp.network)",
    description: "Futuristic web interface and dashboard designed for Gana Music Bot featuring interactive audio frequency visualizers, command documentation, real-time node latency monitors, and 1-click guild invites.",
    longDescription: "Designed and built the official web portal for Gana Music Bot (gana.mcnp.network).\n\n✨ Design & Feature Highlights:\n- High-fidelity dark neon aesthetic with audio equalizer animations and live audio streaming status.\n- Comprehensive interactive slash-command documentation and feature showcase.\n- Sharded server telemetry, Lavalink node health monitoring, and instant Discord bot invite integration.\n- Live URL: https://gana.mcnp.network",
    category: "Web Design",
    tags: ["Closed Source", "Website Designer", "Interactive UI", "Audio Equalizer", "gana.mcnp.network", "Dashboard", "Live"],
    image: "/gana-logo.jpg",
    demoUrl: "https://gana.mcnp.network",
    githubUrl: "",
    discordUrl: "https://dsc.gg/nexusstdo",
    websiteUrl: "https://gana.mcnp.network",
    featured: true,
    metrics: [
      { label: "Live Domain", value: "gana.mcnp.network" },
      { label: "Role", value: "Lead Web Designer" },
      { label: "Ecosystem", value: "Discord Bot Portal" },
      { label: "Audio UI", value: "Interactive Equalizer" }
    ]
  },
  {
    id: "proj-1",
    title: "MCNP Network (Minecraft Nepal)",
    tagline: "Head Management Team | Nepal's Premier Multiplayer Network (play.mcnp.network)",
    description: "MCNP is a Minecraft network built for players who love survival and PvP. Enjoy Classic Survival with a vanilla feel, Lifesteal for intense battles, RPG Survival for adventure and progression, and Practice PvP to sharpen your skills. Join MCNP today, meet new players, build your journey, and become part of our growing community!",
    longDescription: "MCNP is a Minecraft network built for players who love survival and PvP. Enjoy Classic Survival with a vanilla feel, Lifesteal for intense battles, RPG Survival for adventure and progression, and Practice PvP to sharpen your skills. Join MCNP today, meet new players, build your journey, and become part of our growing community!\n\nAs part of the Head Management Team and lead systems architect, I oversee network operations, plugin development, crossplay infrastructure via GeyserMC & Velocity proxy, Redis/MySQL data synchronization, and community security. Connect via Java: play.mcnp.network or Bedrock: bedrock.mcnp.network (Port: 19132). Community: https://dsc.gg/mcnp",
    category: "Minecraft",
    tags: ["Head Management Team", "v1.20.x — 1.26.x", "Classic Survival", "Lifesteal SMP", "RPG Survival", "Practice PvP", "play.mcnp.network", "bedrock.mcnp.network:19132"],
    image: "/mcnp-logo.png",
    demoUrl: "https://dsc.gg/mcnp",
    githubUrl: "",
    tiktokUrl: "https://www.tiktok.com/@mcnpnetwork?is_from_webapp=1&sender_device=pc",
    youtubeUrl: "https://www.youtube.com/@mcnpnetworkofficial",
    discordUrl: "https://dsc.gg/mcnp",
    websiteUrl: "https://mcnp.network",
    featured: true,
    metrics: [
      { label: "Role", value: "Head Management Team" },
      { label: "Version Support", value: "v1.20.x — 1.26.x" },
      { label: "Java IP", value: "play.mcnp.network" },
      { label: "Bedrock IP & Port", value: "bedrock.mcnp.network:19132" },
      { label: "Community Discord", value: "dsc.gg/mcnp" }
    ]
  },
  {
    id: "proj-nexus-studio",
    title: "Nexus Studio",
    tagline: "Head Developer | Official Developer Community & Ecosystem",
    description: "The official developer community area where users and creators visit, collaborate, and leverage Nexus Studio services and bots like Gana, Nexus Security, and custom tools.",
    longDescription: "Nexus Studio is the premier developer community hub where creators, developers, and server owners come to visit, collaborate, and access cutting-edge development services and bot ecosystems including Gana (high-fidelity audio streaming) and Nexus Security (anti-nuke and community moderation sentinel).",
    category: "Discord Server",
    tags: ["Closed Source", "Head Developer", "Discord Server", "Developer Community", "Collaboration", "Gana", "Nexus Security"],
    image: "/nexus-studio-logo.png",
    demoUrl: "",
    githubUrl: "",
    discordUrl: "https://dsc.gg/nexusstdo",
    websiteUrl: "",
    featured: true,
    metrics: [
      { label: "Role", value: "Head Developer" },
      { label: "Platform", value: "Discord Server" },
      { label: "Ecosystem Services", value: "Gana, Nexus Security & More" }
    ]
  },
  {
    id: "proj-2",
    title: "Nexus Security",
    tagline: "All-in-One Community Threat Detection & Moderation",
    description: "Automated security sentinel preventing raids, mass spam, and token grabbers across Discord gaming communities with advanced automod and ticket systems.",
    longDescription: "Features machine learning text analysis for toxic content detection, quarantine lockdown triggers, and instant webhook alert dispatching to staff channels.",
    category: "Discord Bots",
    tags: ["Closed Source", "TypeScript", "Discord.js", "PostgreSQL", "Redis", "Security"],
    image: "/nexus-security-logo.png",
    demoUrl: "",
    githubUrl: "",
    discordUrl: "https://dsc.gg/nexusstdo",
    websiteUrl: "https://security.mcnp.network/",
    featured: false,
    metrics: [
      { label: "Spam Blocked", value: "150k/mo" },
      { label: "Protected Guilds", value: "850+" },
      { label: "Dashboard", value: "security.mcnp.network" }
    ]
  },
  {
    id: "proj-3",
    title: "Gana",
    tagline: "High-Performance Discord Music Bot | JavaScript, Discord.js & MongoDB",
    description: "Gana is a high-performance Discord music bot built entirely in JavaScript, Discord.js, and MongoDB featuring multi-platform audio streaming, 24/7 smart autoplay, and an interactive custom ecosystem.",
    longDescription: "Gana is a high-performance Discord music bot built entirely in JavaScript, Discord.js, and MongoDB.\n\n✨ Key Features:\n🎧 Multi-Platform Audio: Seamless, high-fidelity streaming from Spotify, YouTube, and Apple Music via Lavalink.\n📻 24/7 Smart Autoplay: Continuous, algorithm-driven radio that auto-reconnects and intelligently queues similar tracks.\n💎 Custom Ecosystem: Features interactive button-driven UI, mass-messaging tools, and a secure premium code economy.",
    category: "Discord Bots",
    tags: ["Closed Source", "JavaScript", "Discord.js", "MongoDB", "Lavalink", "Spotify", "YouTube", "Apple Music"],
    image: "/gana-logo.jpg",
    demoUrl: "",
    githubUrl: "",
    discordUrl: "https://dsc.gg/nexusstdo",
    websiteUrl: "https://gana.mcnp.network",
    featured: false,
    metrics: [
      { label: "Platforms", value: "Spotify, YT, Apple" },
      { label: "Architecture", value: "JavaScript & MongoDB" },
      { label: "Website", value: "gana.mcnp.network" }
    ]
  },
  {
    id: "proj-ind-mc",
    title: "Ind MC",
    tagline: "Founder | Minecraft Lifesteal SMP Server (2022–2023)",
    description: "Founder and lead developer of Ind MC, a dedicated custom Minecraft Lifesteal SMP server that operated from 2022 to 2023, now currently offline.",
    longDescription: "Ind MC was a dedicated multiplayer Minecraft Lifesteal SMP server founded and operated by Sakshyam Paudel between 2022 and 2023.\n\nCrafted with custom PvP mechanics, heart-stealing combat systems, player economies, and custom server performance optimizations. The server is currently offline and archived.",
    category: "Minecraft",
    tags: ["Founder", "Minecraft Server", "Lifesteal SMP", "PvP Systems", "2022–2023", "Offline / Archived"],
    image: "/ind-mc-logo.png",
    demoUrl: "",
    githubUrl: "",
    websiteUrl: "",
    discordUrl: "",
    featured: false,
    metrics: [
      { label: "Role", value: "Founder & Lead Dev" },
      { label: "Timeline", value: "2022 — 2023" },
      { label: "Status", value: "Offline / Archived" }
    ]
  }
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Website Design & Frontend UI/UX",
    description: "Designing sleek, responsive, modern web experiences with fluid motion animations, intuitive UI, and high-performance frontend architecture.",
    skills: [
      { name: "React / Next.js & TypeScript", level: 96, iconName: "Code", years: "4+ yrs" },
      { name: "Tailwind CSS & Design Systems", level: 98, iconName: "Palette", years: "4+ yrs" },
      { name: "Motion Animations & VFX", level: 94, iconName: "Sparkles", years: "3+ yrs" },
      { name: "Responsive UI & Mobile Design", level: 96, iconName: "Layers", years: "4+ yrs" },
      { name: "Interactive Web Portals", level: 92, iconName: "Globe", years: "4+ yrs" }
    ]
  },
  {
    title: "Minecraft Server Engineering",
    description: "5+ years crafting high-performance multiplayer backends, custom plugins, and proxy networks.",
    skills: [
      { name: "Java / Spigot & Paper API", level: 98, iconName: "Code", years: "5+ yrs" },
      { name: "Velocity / BungeeCord Proxies", level: 95, iconName: "Network", years: "4+ yrs" },
      { name: "JVM Tuning & Lag Optimization", level: 92, iconName: "Zap", years: "4+ yrs" },
      { name: "Custom Mobs & Mechanics", level: 90, iconName: "Cpu", years: "3+ yrs" },
      { name: "Bedrock Cross-Play (GeyserMC)", level: 88, iconName: "Cloud", years: "3+ yrs" }
    ]
  },
  {
    title: "Discord Bot Development",
    description: "Building reliable, feature-rich bots for music streaming, moderation, and automated server security.",
    skills: [
      { name: "TypeScript / JavaScript", level: 94, iconName: "FileCode", years: "4+ yrs" },
      { name: "Discord.js / API", level: 96, iconName: "Layers", years: "4+ yrs" },
      { name: "Lavalink Audio Streaming", level: 82, iconName: "Sparkles", years: "1 yrs" },
      { name: "Automod & Threat Security", level: 92, iconName: "CheckCircle", years: "3+ yrs" },
      { name: "Redis & Database Caching", level: 86, iconName: "Database", years: "3+ yrs" }
    ]
  },
  {
    title: "Infrastructure & Tools",
    description: "Deploying scalable server nodes, automated backups, and containerized dev environments.",
    skills: [
      { name: "Linux / Ubuntu Server Admin", level: 92, iconName: "Server", years: "5+ yrs" },
      { name: "Docker & Containerization", level: 85, iconName: "Box", years: "3+ yrs" },
      { name: "MySQL / MongoDB", level: 88, iconName: "Database", years: "4+ yrs" },
      { name: "Git / CI/CD Workflows", level: 75, iconName: "GitBranch", years: "3 yrs" },
      { name: "Pterodactyl Panel / Wings", level: 95, iconName: "Compass", years: "5+ yrs" }
    ]
  }
];

export const experienceData: ExperienceItem[] = [
  {
    id: "exp-web-design",
    role: "Lead Website Designer & Frontend Architect",
    company: "MCNP & Nexus Web Ecosystem",
    location: "Gaindakot, Nepal / Remote",
    period: "2023 — Present",
    type: "Work",
    url: "https://gana.mcnp.network",
    description: [
      "Designed and developed high-impact web portals including gana.mcnp.network with rich interactive motion animations.",
      "Engineered responsive UI design systems, real-time audio visualizers, shard status dashboards, and Discord bot invite flows.",
      "Optimized frontend performance, asset loading, and typography to achieve 99+ lighthouse scores and seamless cross-device mobile responsiveness."
    ],
    skills: ["Website Design", "React", "TypeScript", "Tailwind CSS", "Motion VFX", "UI/UX", "Responsive Design"]
  },
  {
    id: "exp-nexus-studio",
    role: "Head Developer",
    company: "Nexus Studio",
    location: "Gaindakot, Nepal / Remote",
    period: "2023 — Present",
    type: "Work",
    url: "https://dsc.gg/nexusstdo",
    description: [
      "Head developer leading the developer community, bot infrastructure, and service ecosystem for Nexus Studio.",
      "Building and maintaining flagship Discord systems including Gana (audio streaming) and Nexus Security (threat detection sentinel).",
      "Managing the collaborative developer community where users visit, collaborate on projects, and utilize Nexus Studio services."
    ],
    skills: ["TypeScript", "Discord.js", "Lavalink", "Docker", "Security", "Community Leadership"]
  },
  {
    id: "exp-1",
    role: "Head Management Team & Lead Developer",
    company: "Minecraft Nepal (MCNP)",
    location: "Nepal / Remote",
    period: "2022 — Present",
    type: "Work",
    url: "https://dsc.gg/mcnp",
    description: [
      "Head Management Team member and lead developer orchestrating network management, server infrastructure, and community systems.",
      "MCNP is a Minecraft network built for players who love survival and PvP: Classic Survival with a vanilla feel, Lifesteal for intense battles, RPG Survival for adventure and progression, and Practice PvP.",
      "Engineered custom Velocity proxy routing, cross-server economy synchronization with Redis/MySQL, and GeyserMC crossplay for hundreds of active players."
    ],
    skills: ["Network Management", "Java", "PaperMC", "Velocity", "MySQL", "Redis", "GeyserMC"]
  },
  {
    id: "exp-2",
    role: "Discord Infrastructure & Bot Architect",
    company: "Nexus Bot Ecosystem",
    location: "Gaindakot, Nepal / Remote",
    period: "2021 — 2023",
    type: "Work",
    url: "https://dsc.gg/nexusstdo",
    description: [
      "Architected high-concurrency Discord bot backends handling over 100,000+ monthly interactions and audio sessions.",
      "Engineered real-time Lavalink node clustering, WebSocket heartbeat failovers, and sharded rate-limit mitigations.",
      "Designed automated anti-raid algorithms, token verification gateways, and community moderation pipelines for gaming guilds."
    ],
    skills: ["Discord.js", "Node.js", "Lavalink", "WebSockets", "MongoDB", "Redis", "REST APIs"]
  },
  {
    id: "exp-3",
    role: "11-12th Higher Secondary Education",
    company: "United Takshashila",
    location: "Nepal",
    period: "2019 — 2021",
    type: "Education",
    description: [
      "Completed 11-12th higher secondary education with distinction in science and mathematics.",
      "Built foundational expertise in algorithms, programming principles, and advanced mathematics."
    ],
    skills: ["Mathematics", "Physics", "Computer Science", "Programming"]
  },
  {
    id: "exp-4",
    role: "Bachelor in Computer Science & Security",
    company: "Tribhuvan University",
    location: "Kathmandu, Nepal",
    period: "2021 — 2026",
    type: "Education",
    description: [
      "Pursuing Bachelor's degree in Computer Science & Security with rigorous focus on network security, cryptography, distributed systems, and secure software architecture.",
      "Advanced coursework in operating systems, database management, and enterprise cybersecurity."
    ],
    skills: ["Cybersecurity", "Computer Science", "Networks", "Cryptography", "Java"]
  }
];

export const testimonialsData = [
  {
    quote: "Sakshyam is a wizard when it comes to Minecraft server optimization and Java plugin architecture. MCNP's stability and performance skyrocketed under his leadership.",
    author: "Prabin Thapa",
    title: "Founder & Lead Admin at Minecraft Nepal",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop"
  },
  {
    quote: "Sakshyam's Discord bot architecture and automated security frameworks transformed our servers. From crystal-clear Lavalink music streaming to seamless raid defense, his code is flawless.",
    author: "Nabin Sharma",
    title: "Community Director at Nexus Guilds",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&auto=format&fit=crop"
  },
  {
    quote: "GANA music bot and Nexus Security are staples in our Discord community. Incomparable reliability, zero lag, and top-tier security engineering.",
    author: "Aayush Adhikari",
    title: "Community Director at IND MC",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=200&auto=format&fit=crop"
  }
];
