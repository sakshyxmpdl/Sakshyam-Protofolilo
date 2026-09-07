import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

export const ParticleVfx: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Generate randomized particles
    const colors = [
      'rgba(99, 102, 241, 0.45)', // indigo
      'rgba(139, 92, 246, 0.45)', // violet
      'rgba(59, 130, 246, 0.35)', // blue
      'rgba(16, 185, 129, 0.35)', // emerald
      'rgba(236, 72, 153, 0.35)', // pink
    ];

    const generated: Particle[] = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 3.5,
      duration: 6 + Math.random() * 8,
      delay: Math.random() * 4,
      color: colors[i % colors.length],
    }));

    setParticles(generated);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Dynamic Interactive Cursor Ambient Glow Spotlight */}
      <motion.div
        className="fixed w-[380px] h-[380px] rounded-full pointer-events-none blur-[90px] opacity-30 dark:opacity-20 z-0 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.5) 0%, rgba(139,92,246,0.3) 45%, transparent 70%)',
          left: mousePos.x - 190,
          top: mousePos.y - 190,
          opacity: isHovering ? undefined : 0,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.5 }}
      />

      {/* Floating Particle Orbs */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none blur-[0.5px]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 10px ${p.color}`,
          }}
          animate={{
            y: [-30, 30, -30],
            x: [-20, 20, -20],
            opacity: [0.15, 0.85, 0.15],
            scale: [0.8, 1.4, 0.8],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};
