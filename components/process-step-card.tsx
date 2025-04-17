"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

interface ProcessStepCardProps {
  number: number
  title: string
  description: string
  delay?: number
  glowColor?: string
}

export default function ProcessStepCard({
  number,
  title,
  description,
  delay = 0,
  glowColor = "rgba(16, 185, 129, 0.5)",
}: ProcessStepCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: delay * 0.2 }}
      className="relative group"
    >
      <div
        className="absolute -inset-0.5 rounded-2xl opacity-75 blur-sm group-hover:opacity-100 transition duration-500"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}, transparent 60%)`,
        }}
      />

      <div className="relative bg-black bg-opacity-70 backdrop-blur-sm border border-green-500/20 rounded-2xl p-6 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20" />

        <div className="relative z-10">
          <div
            className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto",
              "bg-gradient-to-br from-green-400 to-green-600 shadow-lg shadow-green-500/20",
            )}
          >
            <span className="text-2xl font-bold text-white">{number}</span>
          </div>

          <h3 className="text-xl font-bold text-white text-center mb-4 group-hover:text-green-400 transition-colors duration-300">
            Passo {number}
          </h3>
          <p className="text-white/80 text-center leading-relaxed">{description}</p>

          <div className="absolute -z-10 inset-0 overflow-hidden opacity-30">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-green-400"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `pulse ${2 + Math.random() * 3}s infinite alternate ${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
