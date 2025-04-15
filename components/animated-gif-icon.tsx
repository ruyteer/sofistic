"use client"

import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface AnimatedGifIconProps {
  src: string
  alt: string
  size?: number
  className?: string
}

export default function AnimatedGifIcon({ src, alt, size = 40, className }: AnimatedGifIconProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className={cn("relative flex items-center justify-center", className)} style={{ width: size, height: size }}>
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={size}
        height={size}
        className={cn("transition-opacity duration-300", isLoaded ? "opacity-100" : "opacity-0")}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  )
}
