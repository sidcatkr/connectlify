"use client"

import { motion } from "motion/react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function CTA() {
  return (
    <section className="py-20 md:py-32 w-full relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            className="text-3xl md:text-5xl font-heading font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ willChange: "transform, opacity" }}
          >
            Ready to <span className="text-gradient">connect</span> your digital experiences?
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-foreground/80 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ willChange: "transform, opacity" }}
          >
            Start building fluid, intuitive user experiences today with Connectlify.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ willChange: "transform, opacity" }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/get-started"
                className="px-8 py-3 rounded-lg bg-primary text-white font-medium flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                Get started for free <ArrowRight size={18} />
              </Link>
            </motion.div>

            <Link href="/contact" className="text-foreground/80 hover:text-foreground font-medium">
              Contact sales
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          style={{ willChange: "transform, opacity" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-primary/10 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ repeat: Infinity, duration: 10, delay: 1, ease: "easeInOut" }}
          style={{ willChange: "transform, opacity" }}
        />
      </div>
    </section>
  )
}
