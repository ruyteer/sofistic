"use client"
import type React from "react"
import { useState, useEffect } from "react"

import { motion } from "motion/react"
import { cn } from "@/lib/utils"

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT"

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1,
  clockwise = true,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType
    containerClassName?: string
    className?: string
    duration?: number
    clockwise?: boolean
  } & React.HTMLAttributes<HTMLElement>
>) {
  const [hovered, setHovered] = useState<boolean>(false)
  const [direction, setDirection] = useState<Direction>("TOP")

  const rotateDirection = (currentDirection: Direction): Direction => {
    const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"]
    const currentIndex = directions.indexOf(currentDirection)
    const nextIndex = clockwise
      ? (currentIndex - 1 + directions.length) % directions.length
      : (currentIndex + 1) % directions.length
    return directions[nextIndex]
  }

  const movingMap: Record<Direction, string> = {
    TOP: "radial-gradient(20.7% 50% at 50% 0%, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)",
    LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)",
    BOTTOM: "radial-gradient(20.7% 50% at 50% 100%, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)",
    RIGHT:
      "radial-gradient(16.2% 41.199999999999996% at 100% 50%, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)",
  }

  const highlight = "radial-gradient(75% 181.15942028985506% at 50% 50%, #ffffff 0%, rgba(255, 255, 255, 0.9) 100%)"

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState))
      }, duration * 1000)
      return () => clearInterval(interval)
    }
  }, [hovered, duration])

  return (
    <Tag
      onMouseEnter={(event: React.MouseEvent<HTMLDivElement>) => {
        setHovered(true)
      }}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex content-center transition duration-500 items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-px decoration-clone w-fit shadow-md rounded-[8px]",
        containerClassName,
      )}
      {...props}
    >
      <div
        className={cn(
          "w-auto text-white z-10  bg-gradient-to-r from-green-800 to-green-600 px-4 py-2 rounded-[8px]",
          className,
        )}
      >
        {children}
      </div>

      <motion.div
        className={cn("flex-none inset-0 overflow-hidden absolute z-0 rounded-[8px]")}
        style={{
          filter: "blur(3px)",
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: 0.9,
          pointerEvents: "none",
          boxShadow: "0 0 10px rgba(255, 255, 255, 0.7)",
        }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered ? [movingMap[direction], highlight] : movingMap[direction],
        }}
        transition={{ ease: "linear", duration: duration ?? 1 }}
      />

      <div className="bg-gradient-to-r from-green-700 to-green-300 absolute z-1 flex-none inset-[1px] rounded-[8px]" />
    </Tag>
  )
}

export function HoverBorderGradientNavbar({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1,
  clockwise = true,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType
    containerClassName?: string
    className?: string
    duration?: number
    clockwise?: boolean
  } & React.HTMLAttributes<HTMLElement>
>) {
  const [hovered, setHovered] = useState<boolean>(false)
  const [direction, setDirection] = useState<Direction>("TOP")

  const rotateDirection = (currentDirection: Direction): Direction => {
    const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"]
    const currentIndex = directions.indexOf(currentDirection)
    const nextIndex = clockwise
      ? (currentIndex - 1 + directions.length) % directions.length
      : (currentIndex + 1) % directions.length
    return directions[nextIndex]
  }

  const movingMap: Record<Direction, string> = {
    TOP: "radial-gradient(20.7% 50% at 50% 0%, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)",
    LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)",
    BOTTOM: "radial-gradient(20.7% 50% at 50% 100%, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)",
    RIGHT:
      "radial-gradient(16.2% 41.199999999999996% at 100% 50%, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)",
  }

  const highlight = "radial-gradient(75% 181.15942028985506% at 50% 50%, #ffffff 0%, rgba(255, 255, 255, 0.9) 100%)"

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState))
      }, duration * 1000)
      return () => clearInterval(interval)
    }
  }, [hovered, duration])

  return (
    <Tag
      onMouseEnter={(event: React.MouseEvent<HTMLDivElement>) => {
        setHovered(true)
      }}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex content-center transition duration-500 items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-px decoration-clone w-fit shadow-md rounded-full",
        containerClassName,
      )}
      {...props}
    >
      <div
        className={cn(
          "w-auto text-white z-10  bg-gradient-to-r from-green-800 to-green-600 px-4 py-2 rounded-full",
          className,
        )}
      >
        {children}
      </div>

      <motion.div
        className={cn("flex-none inset-0 overflow-hidden absolute z-0 rounded-full")}
        style={{
          filter: "blur(3px)",
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: 0.9,
          pointerEvents: "none",
          boxShadow: "0 0 10px rgba(255, 255, 255, 0.7)",
        }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered ? [movingMap[direction], highlight] : movingMap[direction],
        }}
        transition={{ ease: "linear", duration: duration ?? 1 }}
      />

      <div className="bg-gradient-to-r from-green-700 to-green-300 absolute z-1 flex-none inset-[1px] rounded-full" />
    </Tag>
  )
}
