"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

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
      opacity: number
    }>
  >([])

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
        opacity: Math.random() * 0.5 + 0.2,
      })
    }

    setParticles(newParticles)
  }, [])

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

      particles.forEach((particle) => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x < 0 || particle.x > 100) particle.speedX *= -1
        if (particle.y < 0 || particle.y > 100) particle.speedY *= -1

        const x = (particle.x / 100) * containerWidth
        const y = (particle.y / 100) * containerHeight

        ctx.beginPath()
        ctx.arc(x, y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(76, 175, 80, ${particle.opacity})`
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
    <div className="relative rounded-xl h-[455px] p-[1px] overflow-hidden">
      <div className="relative bg-[#212121] h-full w-full rounded-lg p-5 flex flex-col">
        <div
          className="relative aspect-[16/9] w-full bg-black rounded-xl overflow-hidden z-10 mx-auto flex items-center justify-center"
          style={{ minHeight: "160px" }}
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" width={300} height={169} />

          <div className={`w-auto h-auto ${iconBgColor} rounded-full flex items-center justify-center z-10 p-1`}>
            {icon}
          </div>
        </div>

        <div className="p-6 relative z-10 flex-grow">
          <h3 className="text-xl font-bold text-white text-center mb-3">{title}</h3>
          <p className="text-white/70 text-sm text-center mb-4">{description}</p>
        </div>
      </div>
    </div>
  )
}
