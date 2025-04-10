"use client"

import { useState, useEffect, useRef } from "react"
import { useInView } from "framer-motion"

interface CountUpProps {
  end: number
  start?: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
}

export function CountUp({ end, start = 0, duration = 2000, decimals = 0, prefix = "", suffix = "" }: CountUpProps) {
  const [count, setCount] = useState(start)
  const countRef = useRef(null)
  const isInView = useInView(countRef, { once: true, margin: "-100px" })
  const countingRef = useRef(false)

  useEffect(() => {
    if (isInView && !countingRef.current) {
      countingRef.current = true
      let startTime: number | null = null
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)

        const currentCount = progress * (end - start) + start
        setCount(currentCount)

        if (progress < 1) {
          window.requestAnimationFrame(step)
        }
      }

      window.requestAnimationFrame(step)
    }
  }, [start, end, duration, isInView])

  return (
    <span ref={countRef}>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  )
}
