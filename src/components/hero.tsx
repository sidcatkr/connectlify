"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { motion, animate, stagger } from "framer-motion"
import { splitText } from "@/utils/split-text"
import { animateWithSpring } from "@/utils/spring-animations"

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      // Wait for fonts to load
      document.fonts.ready.then(() => {
        if (!containerRef.current) return

        // Make container visible
        containerRef.current.style.visibility = "visible"

        // Split and animate first line
        const firstLine = containerRef.current.querySelector(".first-line")
        if (firstLine) {
          const chars = splitText(firstLine, { type: "chars", preserveSpaces: true })

          animateWithSpring(
            chars,
            {
              opacity: [0, 1],
              y: [20, 0],
              filter: ["blur(8px)", "blur(0px)"],
            },
            {
              stiffness: 60, // Lower stiffness for smoother animation
              damping: 18, // Higher damping for smoother animation
              delay: stagger(0.06), // Longer stagger delay for slower animation
              duration: 1.8, // Longer duration for slower animation
            },
          )
        }

        // Split and animate second line with a delay
        const secondLine = containerRef.current.querySelector(".second-line")
        if (secondLine) {
          const chars = splitText(secondLine, { type: "chars", preserveSpaces: true })

          animateWithSpring(
            chars,
            {
              opacity: [0, 1],
              y: [20, 0],
              filter: ["blur(8px)", "blur(0px)"],
            },
            {
              stiffness: 60,
              damping: 18,
              delay: stagger(0.06, { startDelay: 0.3 }), // Start after first line begins
              duration: 1.8,
            },
          )
        }

        // Split and animate wavy text
        const wavyElement = containerRef.current.querySelector(".wavy")
        if (wavyElement) {
          const chars = splitText(wavyElement, { type: "chars" })

          // Animate each character with wavy effect using spring physics
          chars.forEach((char, i) => {
            animate(
              char,
              { y: [-15, 15] },
              {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "mirror",
                ease: "easeInOut",
                duration: 3.5, // Slower wave animation
                delay: i * 0.1, // Delay between characters
              },
            )
          })
        }
      })
    }
  }, [])

  return (
    <section className="w-full flex flex-col items-center justify-center py-24 px-4">
      <motion.div
        className="relative w-16 h-16 rounded-md overflow-hidden mb-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 150, // Lower stiffness
          damping: 30, // Higher damping
          duration: 2, // Longer duration
        }}
      >
        <Image src="/images/logo.png" alt="Connectlify Logo" fill className="object-contain rounded" />
      </motion.div>

      <div ref={containerRef} className="text-center max-w-3xl" style={{ visibility: "hidden" }}>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 flex flex-col gap-2">
          <span className="first-line">Welcome to</span>
          <span className="second-line">Connectlify</span>
        </h1>

        <p className="text-xl md:text-2xl mt-4">
          That's <span className="wavy text-yellow-300">waaaavy</span>.
        </p>

        <div className="flex justify-center mt-12">
          <motion.button
            className="quick-start-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 200, // Lower stiffness
              damping: 25, // Higher damping
              duration: 0.7, // Longer duration
            }}
          >
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
            duration: 18, // Even slower background animation
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
            duration: 22, // Even slower background animation
            ease: "easeInOut",
          }}
        />
      </div>
    </section>
  )
}
