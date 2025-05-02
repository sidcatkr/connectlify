"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp } from "lucide-react"

export default function ChatInput() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

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

  return (
    <div className="fixed bottom-6 left-0 right-0 flex justify-center z-40" ref={containerRef}>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <AnimatePresence mode="wait">
              {isExpanded ? (
                <motion.form
                  key="expanded"
                  initial={{ width: "200px", opacity: 0 }}
                  animate={{ width: "600px", opacity: 1 }}
                  exit={{ width: "200px", opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="bg-neutral-800/90 backdrop-blur-sm rounded-full flex items-center px-4 shadow-lg border border-neutral-700"
                  onSubmit={handleSubmit}
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask Connectlify..."
                    className="flex-1 bg-transparent border-none outline-none text-white px-2 py-3 text-sm"
                  />
                  <motion.button
                    type="submit"
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      inputValue.trim() ? "bg-accent-bg" : "bg-neutral-700"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!inputValue.trim()}
                  >
                    <ArrowUp size={16} className={inputValue.trim() ? "text-black" : "text-neutral-400"} />
                  </motion.button>
                </motion.form>
              ) : (
                <motion.button
                  key="collapsed"
                  onClick={handleExpand}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-neutral-800/90 backdrop-blur-sm text-neutral-300 rounded-full px-4 py-3 flex items-center gap-2 shadow-lg border border-neutral-700 text-sm"
                >
                  Ask Connectlify
                  <div className="w-6 h-6 rounded-full bg-neutral-700 flex items-center justify-center">
                    <ArrowUp size={14} />
                  </div>
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
