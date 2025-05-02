"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useMotionTemplate, useMotionValue, useTransform } from "framer-motion"
import { ArrowUp } from "lucide-react"
import { useWindowSize } from "@/hooks/use-window-size"

export default function ChatInput() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { width } = useWindowSize()

  // Motion values for dynamic island inspired animations
  const progress = useMotionValue(0)
  const blurValue = useTransform(progress, [0, 0.5, 1], [4, 2, 0])
  const blurFilter = useMotionTemplate`blur(${blurValue}px)`

  // Calculate responsive width based on screen size
  const getExpandedWidth = () => {
    if (width < 640) return Math.min(width * 0.9, 400) // Mobile
    if (width < 1024) return Math.min(width * 0.7, 500) // Tablet
    return 600 // Desktop
  }

  // Update motion value when expanded state changes
  useEffect(() => {
    const animateProgress = async () => {
      const controls = isExpanded ? [0, 1] : [1, 0]
      const duration = 0.4

      // Animate the progress value
      const startTime = performance.now()
      const animate = (time: number) => {
        const elapsed = time - startTime
        const t = Math.min(elapsed / (duration * 1000), 1)

        // Ease function (cubic bezier approximation)
        const easeValue = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

        progress.set(isExpanded ? easeValue : 1 - easeValue)

        if (t < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    }

    animateProgress()
  }, [isExpanded, progress])

  // Handle scroll to show/hide the input
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const threshold = windowHeight * 0.1 // Show after scrolling 10% of the viewport height

      if (scrollPosition > threshold) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
        // Also collapse the input if it's expanded and user scrolls to top
        if (isExpanded) {
          setIsExpanded(false)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    // Initial check
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isExpanded])

  // Handle click outside to collapse
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsExpanded(false)
      }
    }

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isExpanded])

  // Focus input when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isExpanded])

  const handleExpand = () => {
    setIsExpanded(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      console.log("Submitted:", inputValue)
      setInputValue("")
    }
  }

  // Dynamic Island inspired spring configuration
  const springConfig = {
    type: "spring",
    stiffness: 400,
    damping: 40,
    mass: 1.2,
  }

  // Width interpolation
  const widthPx = useTransform(progress, [0, 1], [200, getExpandedWidth()])

  // Opacity interpolation
  const opacity = useTransform(progress, [0, 0.2, 0.8, 1], [0.7, 0.85, 0.95, 1])

  const arrowOpacity = useTransform(progress, [0, 0.5], [0, 1])

  return (
    <div className="fixed bottom-6 left-0 right-0 flex justify-center z-40" ref={containerRef}>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={springConfig}
            className="will-change-transform"
          >
            <AnimatePresence mode="wait">
              {isExpanded ? (
                <motion.form
                  key="expanded"
                  className="bg-neutral-800/90 backdrop-blur-sm rounded-full flex items-center px-4 shadow-lg border border-neutral-700 will-change-transform"
                  onSubmit={handleSubmit}
                  style={{
                    width: widthPx,
                    filter: blurFilter,
                    opacity,
                  }}
                >
                  <motion.input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask Connectlify..."
                    className="flex-1 bg-transparent border-none outline-none text-white px-2 py-3 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  />
                  <motion.div layout transition={springConfig} style={{ opacity: arrowOpacity }}>
                    <motion.button
                      type="submit"
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        inputValue.trim() ? "bg-accent-bg" : "bg-neutral-700"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={!inputValue.trim()}
                      transition={springConfig}
                    >
                      <ArrowUp size={16} className={inputValue.trim() ? "text-black" : "text-neutral-400"} />
                    </motion.button>
                  </motion.div>
                </motion.form>
              ) : (
                <motion.button
                  key="collapsed"
                  onClick={handleExpand}
                  className="bg-neutral-800/90 backdrop-blur-sm text-neutral-300 rounded-full px-4 py-3 flex items-center gap-2 shadow-lg border border-neutral-700 text-sm will-change-transform"
                  style={{
                    filter: blurFilter,
                    opacity,
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={springConfig}
                >
                  Ask Connectlify
                  <motion.div
                    className="w-6 h-6 rounded-full bg-neutral-700 flex items-center justify-center"
                    layout
                    transition={springConfig}
                  >
                    <ArrowUp size={14} />
                  </motion.div>
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
