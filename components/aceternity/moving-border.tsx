"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export const MovingBorder = ({
  children,
  duration = 2000,
  className,
  containerClassName,
  borderClassName,
  as: Component = "div",
}: {
  children: React.ReactNode
  duration?: number
  className?: string
  containerClassName?: string
  borderClassName?: string
  as?: any
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isMounted])

  return (
    <Component className={cn("relative w-full h-full p-[1px] overflow-hidden rounded-xl", containerClassName)}>
      <div
        className={cn("absolute inset-0 rounded-xl z-[1] pointer-events-none", borderClassName)}
        style={{
          background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, rgba(16, 185, 129, 0.3), transparent 40%)`,
        }}
      />
      <div className={cn("relative z-10 w-full h-full bg-black rounded-xl", className)}>{children}</div>
    </Component>
  )
}
