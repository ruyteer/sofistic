"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface AnimatedServiceIconProps {
  icon: React.ReactNode
}

export default function AnimatedServiceIcon({ icon }: AnimatedServiceIconProps) {
  const [particles, setParticles] = useState<{ x: number; y: number; size: number; delay: number }[]>([])

  useEffect(() => {
    const newParticles = []
    for (let i = 0; i < 10; i++) {
      newParticles.push({
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 2,
      })
    }
    setParticles(newParticles)
  }, [])

  return (
    <div className="relative">
      <motion.div
        className="absolute w-16 h-16 rounded-lg bg-gradient-to-br from-green-500/30 to-green-700/30"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-green-500"
          style={{
            width: particle.size,
            height: particle.size,
          }}
          initial={{
            x: 0,
            y: 0,
            opacity: 0,
          }}
          animate={{
            x: particle.x,
            y: particle.y,
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 3,
            delay: particle.delay,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        />
      ))}

      <motion.div
        className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center relative z-10"
        whileHover={{ scale: 1.1 }}
        animate={{
          boxShadow: [
            "0 0 0 rgba(16, 185, 129, 0.4)",
            "0 0 20px rgba(16, 185, 129, 0.6)",
            "0 0 0 rgba(16, 185, 129, 0.4)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        {icon}
      </motion.div>
    </div>
  )
}
