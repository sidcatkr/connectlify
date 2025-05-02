"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "Connectlify transformed our user experience. The animations are smooth and purposeful, making our app feel more intuitive and polished.",
    author: "Sarah Johnson",
    role: "Product Designer at TechFlow",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    quote:
      "The API is so intuitive that we were able to implement complex animations in just a few hours. Our conversion rates have improved significantly.",
    author: "Michael Chen",
    role: "Frontend Developer at ShopWave",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    quote:
      "Our dashboard feels alive now. Data updates are visualized beautifully, making it easier for our users to understand complex information at a glance.",
    author: "Emma Rodriguez",
    role: "UX Lead at DataViz",
    avatar: "/placeholder.svg?height=80&width=80",
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const next = () => {
    setCurrent((current + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section ref={ref} className="py-20 md:py-32 w-full bg-gradient-to-b from-background to-background/90">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">What Our Users Say</h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Hear from developers and designers who have transformed their digital experiences
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-secondary/30 rounded-2xl p-8 md:p-12 gradient-border"
            >
              <Quote className="text-primary/40 w-12 h-12 mb-6" />
              <p className="text-xl md:text-2xl font-medium mb-8">"{testimonials[current].quote}"</p>

              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img
                    src={testimonials[current].avatar || "/placeholder.svg"}
                    alt={testimonials[current].author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold">{testimonials[current].author}</h4>
                  <p className="text-sm text-foreground/70">{testimonials[current].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === current ? "bg-primary" : "bg-foreground/20"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <motion.button
            className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 border border-border flex items-center justify-center text-foreground/80 hover:text-foreground"
            onClick={prev}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={20} />
          </motion.button>

          <motion.button
            className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 border border-border flex items-center justify-center text-foreground/80 hover:text-foreground"
            onClick={next}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>
      </div>
    </section>
  )
}
