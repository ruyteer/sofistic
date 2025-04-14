"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { useRef, useState, useEffect } from "react"

interface SpotlightCardProps {
  children: React.ReactNode
  className?: string
  spotlightColor?: string
}

export const SpotlightCard = ({
  children,
  className,
  spotlightColor = "rgba(16, 185, 129, 0.1)",
}: SpotlightCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      mousePositionRef.current = { x, y }

      if (containerRef.current) {
        containerRef.current.style.setProperty("--x", `${x}px`)
        containerRef.current.style.setProperty("--y", `${y}px`)
      }
    }

    const handleMouseLeave = () => {
      if (containerRef.current) {
        containerRef.current.style.setProperty("--x", "0px")
        containerRef.current.style.setProperty("--y", "0px")
      }
    }

    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [isMounted])

  return (
    <div
      ref={containerRef}
      className={cn("relative h-full w-full overflow-hidden rounded-xl border border-white/10 bg-black p-8", className)}
      style={
        {
          "--spotlight-color": spotlightColor,
        } as React.CSSProperties
      }
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at var(--x) var(--y), var(--spotlight-color), transparent 40%)`,
        }}
      />
      {children}
    </div>
  )
}
