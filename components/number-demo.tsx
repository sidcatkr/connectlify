"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function NumberDemo() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="text-4xl font-bold h-12 overflow-hidden">
        <AnimateNumber value={count} />
      </div>

      <div className="flex gap-2">
        <motion.button
          className="px-4 py-2 bg-white/10 rounded-md"
          whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCount((prev) => Math.max(0, prev - 1))}
        >
          -
        </motion.button>

        <motion.button
          className="px-4 py-2 bg-white/10 rounded-md"
          whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCount((prev) => prev + 1)}
        >
          +
        </motion.button>
      </div>
    </div>
  )
}

function AnimateNumber({ value }: { value: number }) {
  return (
    <div className="relative">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
