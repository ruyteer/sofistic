"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import { ArrowRight } from "lucide-react"
import { BackgroundGradient } from "@/components/ui/background-gradient"

interface ServiceCardProps {
  icon: React.ReactNode
  iconBgColor: string
  title: string
  description: string
}

export default function ServiceCard({ icon, iconBgColor, title, description }: ServiceCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [particles, setParticles] = useState<
    Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
    }>
  >([])

  // Initialize particles
  useEffect(() => {
    const newParticles = []
    const particleCount = 15

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
      })
    }

    setParticles(newParticles)
  }, [])

  // Animate particles
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const containerWidth = canvas.width
    const containerHeight = canvas.height

    let animationFrameId: number

    const render = () => {
      ctx.clearRect(0, 0, containerWidth, containerHeight)

      // Draw grid pattern
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
      ctx.lineWidth = 0.5

      // Horizontal grid lines
      for (let y = 0; y <= containerHeight; y += 20) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(containerWidth, y)
        ctx.stroke()
      }

      // Vertical grid lines
      for (let x = 0; x <= containerWidth; x += 20) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, containerHeight)
        ctx.stroke()
      }

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off edges
        if (particle.x < 0 || particle.x > 100) particle.speedX *= -1
        if (particle.y < 0 || particle.y > 100) particle.speedY *= -1

        // Draw particle
        const x = (particle.x / 100) * containerWidth
        const y = (particle.y / 100) * containerHeight

        ctx.beginPath()
        ctx.arc(x, y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)"
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [particles])

  return (
     <BackgroundGradient className="rounded-xl bg-[#212121] h-[420px] p-5  ">
   


        {/* Top rectangular area with animated particles */}
        <div className="relative aspect-[16/9] w-full bg-black rounded-xl overflow-hidden z-10 mx-auto ">
          {/* Canvas for particles and grid */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" width={300} height={169} />

          {/* Icon in the center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-16 h-16 ${iconBgColor} rounded-full flex items-center justify-center z-10`}>{icon}</div>
          </div>
        </div>

        {/* Content area */}
        <div className="p-6 relative z-10">
          {/* Text content */}
          <h3 className="text-xl font-bold text-white text-center mb-3">{title}</h3>
          <p className="text-white/70 text-sm text-center mb-4">{description}</p>

        
        </div>
    
    </BackgroundGradient>
  )
}
