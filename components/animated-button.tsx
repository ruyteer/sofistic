"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface AnimatedButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: "primary" | "secondary"
}

export default function AnimatedButton({ children, onClick, className, variant = "primary" }: AnimatedButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const borderColor = variant === "primary" ? "#10b981" : "#10b981"

  return (
    <button
      className={cn(
        "relative px-6 py-2 rounded-md text-white font-medium overflow-hidden group transition-all duration-300",
        isHovered ? "text-white" : "bg-transparent",
        className,
      )}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isHovered
          ? `linear-gradient(90deg, ${borderColor} 0%, rgba(16, 185, 129, 0.7) 100%)`
          : "transparent",
      }}
    >
      <div
        className="absolute inset-0 rounded-md border border-green-500 overflow-hidden"
        style={{
          opacity: isHovered ? 0 : 1,
          animation: isHovered ? "none" : "rotate-border 1.5s linear infinite",
        }}
      />

      <span className="relative z-10">{children}</span>
    </button>
  )
}
