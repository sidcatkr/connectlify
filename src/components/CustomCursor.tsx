'use client';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // only respond to pointer events from mouse or pen (e.g., Magic Keyboard trackpad, stylus)
    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
      const CURSOR_RADIUS = 6; // half of 12px cursor
      const OFFSET_X = 0;
      const OFFSET_Y = 6;
      const x = e.clientX + OFFSET_X - CURSOR_RADIUS;
      const y = e.clientY + OFFSET_Y - CURSOR_RADIUS;
      setPosition({ x, y });
      if (!mounted) setMounted(true);
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
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
      className="fixed top-0 left-0 z-[9999] w-3 h-3 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] pointer-events-none"
    />
  );
} 