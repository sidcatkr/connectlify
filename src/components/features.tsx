"use client"

import { motion } from "motion/react"
import { Package, Zap, CheckCircle, Cpu, Minimize2 } from "lucide-react"

const features = [
  {
    icon: <Package className="feature-icon" />,
    title: "Free and",
    description: "open-source",
  },
  {
    icon: <Zap className="feature-icon" />,
    title: "Easy",
    description: "to use",
  },
  {
    icon: <CheckCircle className="feature-icon" />,
    title: "Production",
    description: "-ready",
  },
  {
    icon: <Cpu className="feature-icon" />,
    title: "Hybrid",
    description: "engine",
  },
  {
    icon: <Minimize2 className="feature-icon" />,
    title: "Tiny",
    description: "footprint",
  },
]

export default function Features() {
  return (
    <section className="w-full flex justify-center py-16">
      <motion.div
        className="flex flex-wrap justify-center gap-12 md:gap-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="feature-container"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {feature.icon}
            <div className="feature-title">{feature.title}</div>
            <div className="feature-description">{feature.description}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
