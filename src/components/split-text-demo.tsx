"use client"

import { useEffect, useRef } from "react"
import { animate, stagger } from "framer-motion"
import { splitText } from "@/utils/split-text"

export default function SplitTextDemo() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Wait for fonts to load
    document.fonts.ready.then(() => {
      if (!containerRef.current) return

      // Make container visible
      containerRef.current.style.visibility = "visible"

      // Split text into words
      const heading = containerRef.current.querySelector("h2")
      if (!heading) return

      const words = splitText(heading)

      // Animate each word
      animate(
        words,
        { opacity: [0, 1], y: [10, 0] },
        {
          type: "spring",
          duration: 2,
          bounce: 0,
          delay: stagger(0.05),
        },
      )
    })
  }, [])

  return (
    <div ref={containerRef} className="flex justify-center items-center w-full" style={{ visibility: "hidden" }}>
      <h2 className="text-xl md:text-2xl font-medium text-center">Level up your animations with Connectlify</h2>
    </div>
  )
}
