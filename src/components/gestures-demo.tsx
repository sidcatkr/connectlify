"use client"

import { motion } from "motion/react"

export default function GesturesDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="flex gap-4 justify-center">
        <motion.div
          className="w-20 h-20 bg-[#9911ff] rounded-md"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
        />

        <motion.div
          className="w-20 h-20 accent-bg rounded-md"
          whileHover={{
            scale: 1.2,
            rotate: 5,
            backgroundColor: "#e6cc00",
          }}
          whileTap={{
            scale: 0.8,
            rotate: -5,
            backgroundColor: "#ffcc00",
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 17,
          }}
        />
      </div>

      <motion.button
        className="px-6 py-3 bg-white text-black font-medium rounded-md"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        whileDrag={{ scale: 0.9, rotate: 10 }}
        drag
        dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
      >
        Drag me
      </motion.button>
    </div>
  )
}
