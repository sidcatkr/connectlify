"use client"

import { useRef } from "react"
import { motion, useInView } from "motion/react"
import Image from "next/image"

const useCases = [
  {
    title: "Web Applications",
    description: "Create fluid transitions between screens and states in your web applications.",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "E-commerce",
    description: "Enhance product browsing and checkout experiences with meaningful animations.",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Dashboards",
    description: "Make data visualization more engaging with animated charts and transitions.",
    image: "/placeholder.svg?height=300&width=400",
  },
]

export default function UseCases() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-20 md:py-32 w-full">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-heading font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Connect Your Digital Experiences
          </motion.h2>
          <motion.p
            className="text-lg text-foreground/80 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            See how Connectlify transforms user experiences across different platforms
          </motion.p>
        </div>

        <div ref={ref} className="space-y-24">
          {useCases.map((useCase, index) => (
            <UseCaseItem
              key={index}
              title={useCase.title}
              description={useCase.description}
              image={useCase.image}
              isEven={index % 2 === 0}
              isInView={isInView}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

interface UseCaseItemProps {
  title: string
  description: string
  image: string
  isEven: boolean
  isInView: boolean
  delay: number
}

function UseCaseItem({ title, description, image, isEven, isInView, delay }: UseCaseItemProps) {
  return (
    <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-8 lg:gap-16`}>
      <motion.div
        className="w-full lg:w-1/2"
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay }}
      >
        <div className="relative overflow-hidden rounded-xl gradient-border">
          <Image src={image || "/placeholder.svg"} alt={title} width={600} height={400} className="w-full h-auto" />
          <motion.div
            className="absolute inset-0 bg-primary/10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>
      </motion.div>

      <motion.div
        className="w-full lg:w-1/2"
        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: delay + 0.2 }}
      >
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-foreground/70 mb-6">{description}</p>

        <motion.div className="inline-block" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <button className="px-5 py-2 rounded-lg bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors">
            Learn more
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}
