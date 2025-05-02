"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function ViewTransitionsDemo() {
  const [currentView, setCurrentView] = useState("home")

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded-md ${currentView === "home" ? "bg-white text-black" : "bg-white/10"}`}
          onClick={() => setCurrentView("home")}
        >
          Home
        </button>
        <button
          className={`px-4 py-2 rounded-md ${currentView === "details" ? "bg-white text-black" : "bg-white/10"}`}
          onClick={() => setCurrentView("details")}
        >
          Details
        </button>
      </div>

      <div className="w-full h-64 bg-black/20 rounded-lg overflow-hidden relative">
        <AnimatePresence mode="wait">
          {currentView === "home" ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <HomeView />
            </motion.div>
          ) : (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <DetailsView />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function HomeView() {
  return (
    <div className="p-6 h-full flex flex-col items-center justify-center">
      <h3 className="text-2xl font-bold mb-4">Home View</h3>
      <p className="text-center text-gray-300">This is the home view. Click "Details" to see the transition.</p>
    </div>
  )
}

function DetailsView() {
  return (
    <div className="p-6 h-full flex flex-col items-center justify-center">
      <h3 className="text-2xl font-bold mb-4">Details View</h3>
      <p className="text-center text-gray-300">This is the details view. Click "Home" to go back.</p>
    </div>
  )
}
