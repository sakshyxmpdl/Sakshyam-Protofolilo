# Sakshyam Paudel - Official Developer Portfolio & Interactive Terminal

A high-performance modern developer portfolio and interactive terminal crafted with React 18, TypeScript, Tailwind CSS, Express, and Vite. Features a live Discord status dashboard with real-time Lanyard API synchronization, interactive project showcase with modal previews, custom audio synthesizers, and Sakshyam Support AI.

## 🚀 Key Features

- **⚡ Live Discord Lanyard Integration**: Real-time status, Spotify listening activity, and live presence indicator.
- **🤖 Sakshyam Support AI**: Interactive conversational AI powered by Google Gemini API with smart suggestions and custom audio pops.
- **💼 Interactive Project Showcase**: Detailed cards & modal previews for MCNP Network, Gana Music Bot, Nexus Security, IndMC, and more with live server ping metrics.
- **🎵 Subtle Audio Feedback**: Built-in procedural Web Audio synthesizer for smooth user interaction pops.
- **🌙 Dark/Light Theme**: Seamless aesthetic mode toggling.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Motion (framer-motion), Lucide Icons
- **Backend / API**: Node.js, Express, Google Gen AI SDK (`@google/genai`)
- **APIs**: Discord Lanyard WebSocket/REST API, McStatus API

---

## 📦 Getting Started

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** or **bun** / **pnpm** / **yarn**

### 2. Installation
Clone or extract the project files and install dependencies:
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory (based on `.env.example`):
```env
# Optional: Google Gemini API Key for Sakshyam Support AI
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Running in Development
Start the full-stack development server:
```bash
npm run dev
```
The application will run at `http://localhost:3000`.

### 5. Production Build
Build the client and server bundles:
```bash
npm run build
```
Run the production server:
```bash
npm run start
```

---

## 📁 Project Structure

```
├── public/                 # Static assets, logos, and icons
├── src/
│   ├── components/         # React UI components (Hero, Navbar, Projects, DiscordDashboard, Contact, etc.)
│   ├── data/               # Portfolio data, projects, experience, skills
│   ├── types.ts            # TypeScript definitions & interfaces
│   ├── App.tsx             # Main App layout & navigation
│   ├── main.tsx            # React DOM client entry point
│   └── index.css           # Tailwind CSS directives & global styling
├── server.ts               # Express backend API & Vite server integration
├── package.json            # Project dependencies & scripts
├── tsconfig.json           # TypeScript compiler configuration
├── vite.config.ts          # Vite bundler configuration
└── README.md               # Documentation
```

---

## 📄 License & Proprietary Notice
- **Portfolio & Web Architecture**: Open for personal demonstration.
- **Projects (Gana, Nexus Security, MCNP)**: Closed Source / Proprietary.
