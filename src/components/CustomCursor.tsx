'use client';
import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect } from "react";

export default function CustomCursor() {
  // Motion values for cursor position
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Apply strong spring physics for smooth, controlled movement
  const springConfig = { stiffness: 650, damping: 60, mass: 0.1 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const OFFSET = 0
    const CURSOR_RADIUS = 2 // half of 4px circle
    const handleMouseMove = (e: MouseEvent) => {
      // Move cursor with offset from native pointer
      cursorX.set(e.clientX + OFFSET - CURSOR_RADIUS)
      cursorY.set(e.clientY + OFFSET - CURSOR_RADIUS)
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      style={{ translateX: cursorXSpring, translateY: cursorYSpring }}
      className="fixed top-0 left-0 z-[9999] w-4 h-4 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] pointer-events-none"
    />
  );
} 