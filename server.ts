import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import Groq from "groq-sdk";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Groq Client Lazily
let groqClient: Groq | null = null;
function getGroq(): Groq {
  if (!groqClient) {
    if (!process.env.GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY is missing. Please set it in Settings > Secrets.");
    }
    groqClient = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
  }
  return groqClient;
}

const chatInstruction = `You are Sakshyam Paudel (Discord Handle: @Sakshyxm, ID: 841899954481004564). You are a passionate, highly skilled website designer, full-stack developer, and systems architect based in Gaindakot, Nepal.

YOUR PERSONALITY & TONE:
- You are super friendly, enthusiastic, and approachable. You chat like a real person on Discord.
- You are deeply passionate about technology, coding, and building impressive digital experiences.
- You love engaging with users! Instead of just answering questions, you actively keep the conversation going by asking friendly questions back (e.g., "What kind of project are you working on?", "Are you into web dev or gaming?", "How can I help you build something awesome today?").
- You are confident in your skills but always humble and eager to chat. Use emojis naturally, but don't overdo it. 

YOUR EXPERTISE & PORTFOLIO:
- Specializations: Modern, high-performance web applications (React, Next.js, TypeScript, Tailwind CSS), complex Minecraft multiplayer networks (MCNP, Velocity proxies, cross-play), and advanced Discord automation/bots.
- Live Portals you built and manage:
  • Gana Music Web: https://gana.mcnp.network
  • Minecraft Nepal Server: play.mcnp.network (Discord: https://discord.gg/minecraftnepal)
  • Nexus Security & Studio systems

CONTACT INFO & AVAILABILITY:
- Discord: @Sakshyxm (ID: 841899954481004564) - https://discord.com/users/841899954481004564
- Studio Discord: https://dsc.gg/nexusstdo
- Email: Sakshyxmpdl@gmail.com
- You are currently OPEN for commissions and freelance projects! (Websites, Discord Bots, Minecraft Servers).

CONVERSATION RULES:
- Keep responses relatively concise (like a natural Discord DM), but rich in personality.
- If someone asks for help or wants to hire you, enthusiastically share your contact info.
- CRITICAL RULE ABOUT OPEN SOURCE: The source code for GANA Music Bot, Nexus Security, and their respective web portals are STRICTLY NOT PUBLICLY AVAILABLE (They are closed-source and proprietary). If asked, explicitly and politely state that these projects are not open source. However, enthusiastically direct them to visit Sakshyam's GitHub (https://github.com/sakshyxmpdl) for other details and open-source projects!
- Never break character. You *are* Sakshyam. Never say "As an AI...".
- Always aim to be impressive, friendly, and welcoming.`;

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    const groq = getGroq();
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: chatInstruction },
        { role: "user", content: message }
      ],
      model: "openai/gpt-oss-120b",
      temperature: 0.7,
    });

    res.json({ reply: completion.choices[0]?.message?.content || "Sorry, I could not generate a response." });
  } catch (error: any) {
    console.error("Chat Error:", error.message);
    res.status(500).json({ 
      error: "Failed to generate response.", 
      details: "An internal server error occurred while contacting the AI service." 
    });
  }
});

// Ensure data directory exists for persistent database storage
const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const reviewsFilePath = path.join(dataDir, "reviews.json");

// Initialize reviews file with empty array if not exists
if (!fs.existsSync(reviewsFilePath)) {
  fs.writeFileSync(reviewsFilePath, JSON.stringify([], null, 2));
}

// Helper to read reviews
function getStoredReviews() {
  try {
    if (fs.existsSync(reviewsFilePath)) {
      const data = fs.readFileSync(reviewsFilePath, "utf8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading reviews database:", err);
  }
  return [];
}

// Helper to save reviews with rotation (deleting older ones if more than 20)
function saveStoredReviews(reviews: any[]) {
  const trimmed = reviews.slice(0, 20);
  fs.writeFileSync(reviewsFilePath, JSON.stringify(trimmed, null, 2));
}

// Live Discord User & Gateway Status API for @Sakshyxm (ID: 841899954481004564)
const DISCORD_USER_ID = "841899954481004564";

// Helper to compute Discord account creation from Snowflake ID
function getDiscordAccountCreation(id: string): { timestamp: number; formatted: string } {
  try {
    const epoch = 1420070400000n;
    const snowflake = BigInt(id);
    const timeMs = Number((snowflake >> 22n) + epoch);
    const date = new Date(timeMs);
    return {
      timestamp: timeMs,
      formatted: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
  } catch {
    return { timestamp: 1620795023725, formatted: "May 12, 2021" };
  }
}

app.get("/api/discord/user", async (req, res) => {
  const accountCreation = getDiscordAccountCreation(DISCORD_USER_ID);
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'SakshyamPortfolio-DiscordAPI/2.0'
      }
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data && data.success && data.data) {
        const liveUser = data.data;
        return res.json({
          success: true,
          source: 'discord_live_gateway',
          user: {
            ...liveUser.discord_user,
            avatar_url: liveUser.discord_user.avatar
              ? `https://cdn.discordapp.com/avatars/${liveUser.discord_user.id}/${liveUser.discord_user.avatar}.png?size=512`
              : `https://cdn.discordapp.com/embed/avatars/0.png`,
            created_at: accountCreation.formatted,
            created_timestamp: accountCreation.timestamp
          },
          status: liveUser.discord_status,
          active_platforms: {
            desktop: liveUser.active_on_discord_desktop,
            web: liveUser.active_on_discord_web,
            mobile: liveUser.active_on_discord_mobile
          },
          activities: liveUser.activities,
          spotify: liveUser.spotify,
          listening_to_spotify: liveUser.listening_to_spotify,
          data: liveUser,
          timestamp: Date.now()
        });
      }
    }
  } catch (err) {
    // Graceful fallback
  }

  return res.json({
    success: true,
    source: 'discord_api_fallback',
    user: {
      id: DISCORD_USER_ID,
      username: "sakshyxm",
      discriminator: "0",
      avatar: "sakshyam-profile.jpg",
      avatar_url: "/sakshyam-profile.jpg",
      global_name: "Sakshyam Paudel",
      display_name: "Sakshyam Paudel",
      public_flags: 4194304,
      created_at: accountCreation.formatted,
      created_timestamp: accountCreation.timestamp
    },
    status: "online",
    active_platforms: {
      desktop: true,
      web: true,
      mobile: false
    },
    activities: [
      {
        id: "custom",
        name: "Custom Status",
        type: 4,
        state: "Architecting MCNP Network & Gana Music Portal ✦",
        emoji: { name: "⚡", id: null, animated: false }
      },
      {
        id: "vscode",
        name: "Visual Studio Code",
        type: 0,
        state: "Editing gana.mcnp.network (React / TypeScript)",
        details: "Workspace: mcnp-ecosystem",
        timestamps: { start: Date.now() - 1420000 },
        assets: {
          large_image: "vscode",
          large_text: "Visual Studio Code",
          small_image: "typescript",
          small_text: "TypeScript"
        }
      },
      {
        id: "minecraft",
        name: "Minecraft Nepal",
        type: 0,
        state: "Managing play.mcnp.network (20.0 TPS)",
        details: "Velocity Proxy • Multi-Node",
        timestamps: { start: Date.now() - 3600000 }
      }
    ],
    spotify: {
      track_id: "spotify-starboy-1",
      timestamps: {
        start: Date.now() - 74000,
        end: Date.now() + 156000
      },
      song: "Starboy",
      artist: "The Weeknd, Daft Punk",
      album: "Starboy",
      album_art_url: "https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452"
    },
    listening_to_spotify: true,
    data: {
      discord_user: {
        id: DISCORD_USER_ID,
        username: "sakshyxm",
        discriminator: "0",
        avatar: "sakshyam-profile.jpg",
        global_name: "Sakshyam Paudel",
        display_name: "Sakshyam Paudel",
        public_flags: 4194304
      },
      discord_status: "online",
      active_on_discord_web: true,
      active_on_discord_desktop: true,
      active_on_discord_mobile: false,
      listening_to_spotify: true,
      spotify: {
        track_id: "spotify-starboy-1",
        timestamps: {
          start: Date.now() - 74000,
          end: Date.now() + 156000
        },
        song: "Starboy",
        artist: "The Weeknd, Daft Punk",
        album: "Starboy",
        album_art_url: "https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452"
      },
      activities: [
        {
          id: "custom",
          name: "Custom Status",
          type: 4,
          state: "Architecting MCNP Network & Gana Music Portal ✦",
          emoji: { name: "⚡", id: null, animated: false }
        },
        {
          id: "vscode",
          name: "Visual Studio Code",
          type: 0,
          state: "Editing gana.mcnp.network (React / TypeScript)",
          details: "Workspace: mcnp-ecosystem",
          timestamps: { start: Date.now() - 1420000 }
        }
      ]
    },
    timestamp: Date.now()
  });
});

app.get("/api/discord/status", async (req, res) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'SakshyamPortfolio-DiscordAPI/2.0'
      }
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data && data.success && data.data) {
        return res.json({
          source: 'discord_api_live',
          data: data.data,
          timestamp: Date.now()
        });
      }
    }
  } catch (err) {
    // Network or timeout failure - fallback smoothly
  }

  // Graceful fallback payload matching Discord API schema
  return res.json({
    source: 'discord_api_fallback',
    data: {
      discord_user: {
        id: DISCORD_USER_ID,
        username: "sakshyxm",
        discriminator: "0",
        avatar: "sakshyam-profile.jpg",
        global_name: "Sakshyam Paudel",
        display_name: "Sakshyam Paudel",
        public_flags: 4194304
      },
      discord_status: "online",
      active_on_discord_web: true,
      active_on_discord_desktop: true,
      active_on_discord_mobile: false,
      listening_to_spotify: true,
      spotify: {
        track_id: "spotify-starboy-1",
        timestamps: {
          start: Date.now() - 74000,
          end: Date.now() + 156000
        },
        song: "Starboy",
        artist: "The Weeknd, Daft Punk",
        album: "Starboy",
        album_art_url: "https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452"
      },
      activities: [
        {
          id: "custom",
          name: "Custom Status",
          type: 4,
          state: "Architecting MCNP Network & Gana Music Portal ✦",
          emoji: { name: "⚡", id: null, animated: false }
        },
        {
          id: "vscode",
          name: "Visual Studio Code",
          type: 0,
          state: "Editing gana.mcnp.network (React / TypeScript)",
          details: "Workspace: mcnp-ecosystem",
          timestamps: { start: Date.now() - 1420000 },
          assets: {
            large_image: "vscode",
            large_text: "Visual Studio Code",
            small_image: "typescript",
            small_text: "TypeScript"
          }
        },
        {
          id: "minecraft",
          name: "Minecraft Nepal",
          type: 0,
          state: "Managing play.mcnp.network (20.0 TPS)",
          details: "Velocity Proxy • Multi-Node",
          timestamps: { start: Date.now() - 3600000 }
        }
      ]
    },
    timestamp: Date.now()
  });
});

// API Routes for community reviews
app.get("/api/reviews", (req, res) => {
  const reviews = getStoredReviews();
  res.json(reviews);
});

app.post("/api/reviews", (req, res) => {
  const { author, role, content, rating } = req.body;
  if (!author || !content) {
    return res.status(400).json({ error: "Author and content are required." });
  }

  const reviews = getStoredReviews();
  const newReview = {
    id: Date.now().toString(),
    author: author.trim(),
    role: role ? role.trim() : "Community Member",
    content: content.trim(),
    rating: Number(rating) || 5,
    date: new Date().toISOString()
  };

  // Add new review to the beginning (real-time updating)
  reviews.unshift(newReview);
  
  // Save and trim older reviews
  saveStoredReviews(reviews);

  res.status(201).json(newReview);
});

app.delete("/api/reviews", (req, res) => {
  fs.writeFileSync(reviewsFilePath, JSON.stringify([], null, 2));
  res.json({ success: true, message: "All reviews deleted" });
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
