'use client';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // disable on touch devices
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX - 2; // center 4px cursor
      const y = e.clientY - 2;
      setPosition({ x, y });
      if (!mounted) {
        setMounted(true);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mounted]);

  // don't render until first user move
  if (!mounted) return null;

  return (
    <motion.div
      initial={{ x: position.x, y: position.y, opacity: 0 }}
      animate={{ x: position.x, y: position.y, opacity: 1 }}
      transition={{
        x: { type: 'spring', stiffness: 650, damping: 60, mass: 0.1 },
        y: { type: 'spring', stiffness: 650, damping: 60, mass: 0.1 },
        opacity: { duration: 0.3, ease: 'easeOut' }
      }}
      className="fixed top-0 left-0 z-[9999] w-4 h-4 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] pointer-events-none"
    />
  );
} 