"use client"

import { animate, type AnimationOptions, type MotionValue, useSpring } from "framer-motion"

export const springConfig = {
  light: {
    stiffness: 170,
    damping: 26,
    mass: 1,
  },
  medium: {
    stiffness: 280,
    damping: 25,
    mass: 1,
  },
  heavy: {
    stiffness: 550,
    damping: 30,
    mass: 1,
  },
  smooth: {
    stiffness: 80,
    damping: 20,
    mass: 1.2,
  },
}

export function useSpringValue(value: MotionValue<number>, config = "medium") {
  return useSpring(value, springConfig[config as keyof typeof springConfig])
}

export function animateWithSpring(
  element: Element | Element[],
  keyframes: Record<string, any>,
  options: Partial<AnimationOptions> = {},
) {
  return animate(element, keyframes, {
    type: "spring",
    stiffness: 100,
    damping: 15,
    ...options,
  })
}
