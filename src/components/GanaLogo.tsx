import React from 'react';

export const GanaLogo: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => {
  return (
    <div className={`relative flex items-center justify-center bg-zinc-950 rounded-2xl overflow-hidden shadow-lg ring-2 ring-indigo-500/40 shrink-0 ${className}`}>
      <img 
        src="/gana-logo.jpg" 
        alt="Gana Music Bot" 
        className="w-full h-full object-cover" 
      />
    </div>
  );
};
