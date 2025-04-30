"use client"

import { animate } from "motion"
import { useSpring } from "motion/react"

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
}

export function useSpringValue(value: any, config = "medium") {
  return useSpring(value, springConfig[config as keyof typeof springConfig])
}

export function animateWithSpring(
  element: Element | Element[],
  keyframes: Record<string, any>,
  options: any = {},
) {
  return animate(element, keyframes, {
    type: "spring",
    stiffness: 100,
    damping: 15,
    ...options,
  })
}
