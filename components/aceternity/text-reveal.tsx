"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export const TextReveal = ({
  children,
  className,
  revealText,
  revealClassName,
}: {
  children?: React.ReactNode
  className?: string
  revealText?: string
  revealClassName?: string
}) => {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.1,
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div
        className={cn(
          "absolute inset-0 z-10 text-center flex items-center justify-center transition-all duration-1000",
          isInView ? "translate-y-full" : "translate-y-0",
          revealClassName,
        )}
      >
        <span>{revealText}</span>
      </div>
      <div
        className={cn("opacity-0 transition-opacity duration-1000 delay-500", isInView ? "opacity-100" : "opacity-0")}
      >
        {children}
      </div>
    </div>
  )
}
