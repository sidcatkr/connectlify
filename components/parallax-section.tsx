"use client"

import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { useRef } from "react"

function useParallax(value: any, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance])
}

function Image({ id }: { id: number }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const y = useParallax(scrollYProgress, 300)

  return (
    <section className="parallax-item">
      <div ref={ref}>
        <img src={`/placeholder.svg?height=400&width=300&text=Image ${id}`} alt={`Parallax image ${id}`} />
      </div>
      <motion.h2
        initial={{ visibility: "hidden" }}
        animate={{ visibility: "visible" }}
        style={{ y }}
      >{`#00${id}`}</motion.h2>
    </section>
  )
}

export default function ParallaxSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <div className="w-full relative" ref={sectionRef}>
      <div id="parallax-container" className="parallax-container">
        {[1, 2, 3, 4, 5].map((image) => (
          <Image key={image} id={image} />
        ))}
      </div>
      <motion.div className="parallax-progress" style={{ scaleX }} />
      <StyleSheet />
    </div>
  )
}

function StyleSheet() {
  return (
    <style>{`
        .parallax-container {
            height: 100vh;
            overflow-y: auto;
            overflow-x: hidden;
            perspective: 10px;
            scroll-snap-type: y mandatory;
        }

        .parallax-item {
            height: 100vh;
            scroll-snap-align: start;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
        }

        .parallax-item > div {
            width: 300px;
            height: 400px;
            margin: 20px;
            background: #f5f5f5;
            overflow: hidden;
        }

        .parallax-item img {
            width: 300px;
            height: 400px;
            object-fit: cover;
        }

        @media (max-width: 500px) {
            .parallax-item > div {
                width: 150px;
                height: 200px;
            }

            .parallax-item img {
                width: 150px;
                height: 200px;
            }
        }

        .parallax-item h2 {
            color: #ffe600;
            margin: 0;
            font-family: monospace;
            font-size: 50px;
            font-weight: 700;
            letter-spacing: -3px;
            line-height: 1.2;
            position: absolute;
            display: inline-block;
            top: calc(50% - 25px);
            left: calc(50% + 120px);
        }

        @media (max-width: 768px) {
            .parallax-item h2 {
                font-size: 30px;
                left: calc(50% + 80px);
            }
        }

        .parallax-progress {
            position: fixed;
            left: 0;
            right: 0;
            height: 5px;
            background: #ffe600;
            bottom: 50px;
            transform-origin: 0%;
            z-index: 50;
        }
    `}</style>
  )
}
