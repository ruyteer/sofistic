"use client"

import { useEffect, useRef, useState } from "react"
import type React from "react"

interface ScrollAnimationProps {
  children: React.ReactNode
  animation: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom-in" | "zoom-out"
  delay?: number
  duration?: number
  once?: boolean
  className?: string
}

export default function ScrollAnimation({
  children,
  animation,
  delay = 0,
  duration = 800,
  once = true,
  className,
}: ScrollAnimationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once && ref.current) {
            observer.unobserve(ref.current)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [once])

  const getAnimationStyles = () => {
    const baseStyles = {
      opacity: 0,
      transform: "",
      transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
      transitionDelay: `${delay}ms`,
    }

    const visibleStyles = {
      opacity: 1,
      transform: "translate3d(0, 0, 0) scale(1)",
      transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
      transitionDelay: `${delay}ms`,
    }

    if (!isVisible) {
      switch (animation) {
        case "fade-up":
          baseStyles.transform = "translate3d(0, 30px, 0)"
          break
        case "fade-down":
          baseStyles.transform = "translate3d(0, -30px, 0)"
          break
        case "fade-left":
          baseStyles.transform = "translate3d(-30px, 0, 0)"
          break
        case "fade-right":
          baseStyles.transform = "translate3d(30px, 0, 0)"
          break
        case "zoom-in":
          baseStyles.transform = "scale(0.9)"
          break
        case "zoom-out":
          baseStyles.transform = "scale(1.1)"
          break
      }
      return baseStyles
    }

    return visibleStyles
  }

  return (
    <div ref={ref} className={className} style={getAnimationStyles()}>
      {children}
    </div>
  )
}
