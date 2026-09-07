import React from 'react';

export const NexusLogo: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => {
  return (
    <div className={`relative flex items-center justify-center bg-zinc-950 rounded-2xl overflow-hidden shadow-lg ring-2 ring-sky-500/40 shrink-0 ${className}`}>
      <img 
        src="/nexus-security-logo.png" 
        alt="Nexus Security" 
        className="w-full h-full object-cover" 
      />
    </div>
  );
};
