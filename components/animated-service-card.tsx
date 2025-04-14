"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"

interface AnimatedServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

export default function AnimatedServiceCard({ icon, title, description }: AnimatedServiceCardProps) {
  const [particles, setParticles] = useState<{ x: number; y: number; size: number; delay: number }[]>([])

  useEffect(() => {
    // Generate random particles
    const newParticles = []
    for (let i = 0; i < 15; i++) {
      newParticles.push({
        x: Math.random() * 60 - 30,
        y: Math.random() * 60 - 30,
        size: Math.random() * 2 + 0.5,
        delay: Math.random() * 2,
      })
    }
    setParticles(newParticles)
  }, [])

  return (
    <div className="bg-black rounded-xl overflow-hidden border border-white/5 shadow-lg relative hover:-translate-y-1 transition-transform duration-300">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20"></div>

      {/* Content container */}
      <div className="p-6 flex flex-col items-center">
        {/* Icon container */}
        <div className="relative w-20 h-20 mb-6">
          {/* Animated background circle */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-600 to-green-700 animate-pulse" />

          {/* Particles */}
          {particles.map((particle, index) => (
            <div
              key={index}
              className="absolute rounded-full bg-green-400 animate-ping"
              style={{
                width: particle.size,
                height: particle.size,
                top: "50%",
                left: "50%",
                transform: `translate(${particle.x}px, ${particle.y}px)`,
                animationDuration: `${3 + particle.delay}s`,
                animationDelay: `${particle.delay}s`,
                opacity: 0.6,
              }}
            />
          ))}

          {/* Icon */}
          <div
            className="absolute inset-0 flex items-center justify-center text-white z-10 animate-pulse"
            style={{
              animationDuration: "3s",
            }}
          >
            {icon}
          </div>
        </div>

        {/* Text content */}
        <h3 className="text-xl font-bold text-white text-center mb-3">{title}</h3>
        <p className="text-white/70 text-sm text-center mb-4">{description}</p>

        <div className="flex items-center text-green-400 text-sm font-medium hover:translate-x-2 transition-transform duration-300">
          <span>Saiba mais</span>
          <ArrowRight className="ml-2 w-3 h-3" />
        </div>
      </div>
    </div>
  )
}
