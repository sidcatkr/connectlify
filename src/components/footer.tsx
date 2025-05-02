"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Github, Twitter, Linkedin } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full py-12 md:py-16 border-t border-gray-800 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center">
          <Link href="/" className="flex items-center space-x-2 mb-6">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden">
              <Image src="/images/logo.png" alt="Connectlify Logo" fill className="object-contain" />
            </div>
            <span className="font-heading text-lg font-bold">Connectlify</span>
          </Link>

          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
            Create fluid, intuitive user experiences with powerful animations.
          </p>

          <div className="flex space-x-4 mb-8">
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github size={20} />
            </motion.a>
            <motion.a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Twitter size={20} />
            </motion.a>
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin size={20} />
            </motion.a>
          </div>

          <p className="text-gray-500 dark:text-gray-500 text-sm">© {currentYear} Connectlify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
