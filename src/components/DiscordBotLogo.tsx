import React from 'react';

export const DiscordBotLogo: React.FC<{ botName: string; className?: string }> = ({ 
  botName, 
  className = "w-16 h-16"
}) => {
  const isSecurity = botName.toLowerCase().includes('security');
  const isStudio = botName.toLowerCase().includes('studio') || botName.toLowerCase() === 'nexus studio';
  
  const ringColor = isSecurity 
    ? 'ring-blue-500/40' 
    : isStudio 
    ? 'ring-indigo-500/50' 
    : 'ring-violet-500/40';

  const effectiveImage = isSecurity ? '/nexus-security-logo.png' : isStudio ? '/nexus-studio-logo.png' : '/gana-logo.jpg';

  return (
    <div className={`relative flex items-center justify-center bg-zinc-950 rounded-2xl overflow-hidden shadow-lg ring-2 ${ringColor} shrink-0 ${className}`}>
      {effectiveImage ? (
        <img src={effectiveImage} alt={botName} className="w-full h-full object-cover" />
      ) : (
        <svg viewBox="0 0 200 180" className="w-full h-full p-2" xmlns="http://www.w3.org/2000/svg">
          {/* Background */}
          <rect width="200" height="180" fill="#000000" rx="20" />
          
          {isStudio ? (
            // Nexus Studio Developer Hub Logo
            <g transform="translate(10, 30)">
              <defs>
                <linearGradient id="studioGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
              {/* Studio Code/Terminal Hex Icon */}
              <polygon points="90,10 115,25 115,55 90,70 65,55 65,25" fill="#18181b" stroke="url(#studioGrad)" strokeWidth="3" />
              <path d="M 78 35 L 72 40 L 78 45" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 102 35 L 108 40 L 102 45" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="86" y1="46" x2="94" y2="34" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" />

              {/* NEXUS STUDIO Typography */}
              <text x="90" y="96" fill="#ffffff" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="28" letterSpacing="2" textAnchor="middle">NEXUS</text>
              <line x1="20" y1="112" x2="52" y2="112" stroke="#6366f1" strokeWidth="2" />
              <text x="90" y="117" fill="#a5b4fc" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="13" letterSpacing="4" textAnchor="middle">STUDIO</text>
              <line x1="128" y1="112" x2="160" y2="112" stroke="#6366f1" strokeWidth="2" />
            </g>
          ) : isSecurity ? (
            // Nexus Security Logo
            <g transform="translate(15, 60)">
              <text x="85" y="32" fill="#ffffff" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="34" letterSpacing="1" textAnchor="middle">NEXUS</text>
              {/* Blue X over the U */}
              <path d="M 98 5 L 112 30 L 98 30 Z" fill="#0ea5e9" />
              <path d="M 112 5 L 98 30 L 112 30 Z" fill="#38bdf8" />
              
              {/* SECURITY subtitle with side lines */}
              <line x1="12" y1="52" x2="48" y2="52" stroke="#0ea5e9" strokeWidth="2.5" />
              <text x="85" y="58" fill="#38bdf8" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="16" letterSpacing="4" textAnchor="middle">SECURITY</text>
              <line x1="122" y1="52" x2="158" y2="52" stroke="#0ea5e9" strokeWidth="2.5" />
            </g>
          ) : (
            // Gana Music Bot Logo
            <g transform="translate(40, 15)">
              {/* Disc / Headphones background */}
              <circle cx="60" cy="75" r="50" fill="#7c3aed" stroke="#c084fc" strokeWidth="3" />
              <circle cx="60" cy="75" r="35" fill="#1e1b4b" />
              <circle cx="60" cy="75" r="12" fill="#a855f7" />
              <circle cx="60" cy="75" r="5" fill="#ffffff" />
              {/* Sound Wave Bars */}
              <rect x="25" y="50" width="6" height="25" rx="3" fill="#ffffff" />
              <rect x="37" y="35" width="6" height="55" rx="3" fill="#c084fc" />
              <rect x="77" y="35" width="6" height="55" rx="3" fill="#c084fc" />
              <rect x="89" y="50" width="6" height="25" rx="3" fill="#ffffff" />
              <text x="60" y="152" fill="#ffffff" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="20" letterSpacing="2" textAnchor="middle">GANA</text>
            </g>
          )}
        </svg>
      )}
    </div>
  );
};
