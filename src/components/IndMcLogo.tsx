import React from 'react';

export const IndMcLogo: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => {
  return (
    <div className={`relative flex items-center justify-center bg-zinc-950 rounded-2xl overflow-hidden shadow-lg ring-2 ring-emerald-500/40 shrink-0 ${className}`}>
      <img 
        src="/ind-mc-logo.png" 
        alt="Ind MC Logo" 
        className="w-full h-full object-cover" 
      />
    </div>
  );
};
