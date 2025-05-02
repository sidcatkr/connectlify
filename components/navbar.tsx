"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import SearchOverlay from "./search-overlay"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md py-3 shadow-md" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <motion.div
            className="relative w-8 h-8 rounded-md overflow-hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image src="/images/logo.png" alt="Connectlify Logo" width={32} height={32} className="object-contain rounded" />
          </motion.div>
          <span className="font-heading text-xl font-bold text-white">Connectlify</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <SearchOverlay />
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4 md:hidden">
          <button className="text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md shadow-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <SearchOverlay />
          </div>
        </motion.div>
      )}
    </header>
  )
}
