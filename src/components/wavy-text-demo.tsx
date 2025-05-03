"use client"

import { useEffect, useRef } from "react"
import { animate, stagger } from "motion/react"
import { splitText } from "@/utils/split-text"

export default function WavyTextDemo() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Wait for fonts to load
    document.fonts.ready.then(() => {
      if (!containerRef.current) return

      // Make container visible
      containerRef.current.style.visibility = "visible"

      // Split text into characters
      const element = containerRef.current.querySelector(".wavy")
      if (!element) return

      const chars = splitText(element, { type: "chars" })

      const staggerDelay = 0.15

      // Animate each character
      animate(
        chars,
        { y: [-20, 20] },
        {
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "mirror",
          ease: "easeInOut",
          duration: 2,
          delay: stagger(staggerDelay, { startDelay: -staggerDelay * chars.length }),
        },
      )
    })
  }, [])

  return (
    <div ref={containerRef} className="flex justify-center items-center w-full" style={{ visibility: "hidden" }}>
      <h2 className="text-xl md:text-2xl font-medium text-center">
        That's <span className="wavy accent-text">waaaavy</span>.
      </h2>
    </div>
  )
}
