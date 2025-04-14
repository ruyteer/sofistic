"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface AnimatedGradientTextProps {
  children: React.ReactNode
  className?: string
  gradientColors?: string[]
}

export const AnimatedGradientText = ({
  children,
  className,
  gradientColors = ["rgb(195, 255, 171)", "rgb(0, 128, 0)", "rgb(255, 255, 255)"],
}: AnimatedGradientTextProps) => {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const textElement = textRef.current
    if (!textElement) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = textElement.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      textElement.style.setProperty("--x", `${x}px`)
      textElement.style.setProperty("--y", `${y}px`)
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const gradientStyle = {
    backgroundImage: `linear-gradient(90deg, ${gradientColors.join(", ")})`,
  }

  return (
    <div
      ref={textRef}
      className={cn("animate-gradient-text bg-clip-text text-transparent relative", className)}
      style={gradientStyle}
    >
      {children}
    </div>
  )
}
