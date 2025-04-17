"use client"

import type React from "react"

import { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"

interface AOSProviderProps {
  children: React.ReactNode
}

export default function AOSProvider({ children }: AOSProviderProps) {
  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
      delay: 50,
      duration: 800,
    })
  }, [])

  return <>{children}</>
}
