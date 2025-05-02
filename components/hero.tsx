"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { animate, stagger } from "framer-motion"
import { splitText } from "@/utils/split-text"

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      // Wait for fonts to load
      document.fonts.ready.then(() => {
        if (!containerRef.current) return

        // Make container visible
        containerRef.current.style.visibility = "visible"

        // Split and animate heading text
        const heading = containerRef.current.querySelector("h1")
        if (heading) {
          const words = splitText(heading)

          animate(
            words,
            { opacity: [0, 1], y: [20, 0] },
            {
              duration: 0.5,
              delay: stagger(0.05),
              ease: "easeOut",
            },
          )
        }

        // Split and animate wavy text
        const wavyElement = containerRef.current.querySelector(".wavy")
        if (wavyElement) {
          const chars = splitText(wavyElement, { type: "chars" })

          const staggerDelay = 0.15

          // Animate each character with wavy effect
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
        }
      })
    }
  }, [])

  return (
    <section className="w-full flex flex-col items-center justify-center py-24 px-4">
      <motion.div
        className="w-16 h-16 accent-bg rounded-md flex items-center justify-center mb-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <span className="text-black font-bold text-xl">C</span>
      </motion.div>

      <div ref={containerRef} className="text-center max-w-3xl" style={{ visibility: "hidden" }}>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Welcome to Connectlify</h1>

        <p className="text-xl md:text-2xl">
          That's <span className="wavy text-yellow-300">waaaavy</span>.
        </p>

        <div className="flex justify-center mt-12">
          <motion.button className="quick-start-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Quick start
          </motion.button>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-10 w-64 h-64 rounded-full bg-yellow-300/5 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 8,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full bg-yellow-300/10 blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 10,
            ease: "easeInOut",
          }}
        />
      </div>
    </section>
  )
}
