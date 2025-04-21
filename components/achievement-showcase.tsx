"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useInView } from "react-intersection-observer"
import { motion, useAnimation } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Trophy, Award } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

interface AchievementPlaque {
  id: string
  title: string
  description: string
  imageSrc: string
  color: string
}

export default function AchievementShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })[0]
  const controls = useAnimation()
  const isMobile = useMobile()

  const plaques: AchievementPlaque[] = [
    {
      id: "10k",
      title: "10 MIL",
      description: "Faturados para nossos clientes",
      imageSrc: "/images/placa-10k.png",
      color: "from-gray-500/30 to-gray-700/30",
    },
    {
      id: "100k",
      title: "100 MIL",
      description: "Faturados para nossos clientes",
      imageSrc: "/images/placa-100k.png",
      color: "from-green-500/30 to-green-700/30",
    },
    {
      id: "1m",
      title: "1 MILHÃO",
      description: "Faturados para nossos clientes",
      imageSrc: "/images/placa-1m.png",
      color: "from-gray-500/30 to-gray-700/30",
    },
    {
      id: "5m",
      title: "5 MILHÕES",
      description: "Faturados para nossos clientes",
      imageSrc: "/images/placa-5m.jpeg",
      color: "from-red-500/30 to-red-700/30",
    },
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isInView && isAutoPlaying) {
      interval = setInterval(() => {
        setActiveIndex((prev) => (prev === plaques.length - 1 ? 0 : prev + 1))
        scrollToActive()
      }, 5000)
    }

    return () => clearInterval(interval)
  }, [isInView, isAutoPlaying, plaques.length, activeIndex])

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const scrollToActive = () => {
    if (carouselRef.current) {
      const scrollContainer = carouselRef.current
      const activeElement = scrollContainer.children[activeIndex] as HTMLElement

      if (activeElement) {
        const containerCenter = scrollContainer.offsetWidth / 2
        const elementCenter = activeElement.offsetWidth / 2
        const scrollLeft = activeElement.offsetLeft - containerCenter + elementCenter

        scrollContainer.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        })
      }
    }
  }

  useEffect(() => {
    scrollToActive()
  }, [activeIndex])

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isMobile) {
      e.preventDefault()
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isMobile) {
      e.preventDefault()
    }
  }

  return (
    <div ref={containerRef} className="relative py-16 overflow-hidden">
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        }}
        className="text-center mb-16"
        data-aos="fade-up"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Trophy className="w-8 h-8 text-green-500" />
          <h2 className="text-4xl md:text-5xl font-bold">
            Nossas <span className="text-gradient-primary">Conquistas</span>
          </h2>
          <Trophy className="w-8 h-8 text-green-500" />
        </div>
        <p className="text-lg text-white/70 max-w-2xl mx-auto">
          Celebrando marcos importantes que alcançamos junto aos nossos clientes
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto px-4 relative" data-aos="fade-up" data-aos-delay="200">
        <div
          ref={carouselRef}
          className="flex overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar justify-center"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          {plaques.map((plaque, index) => {
            const isActive = activeIndex === index

            return (
              <motion.div
                key={plaque.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: isActive ? 1 : 0.7,
                  scale: isActive ? 1 : 0.8,
                  filter: isActive ? "blur(0px)" : "blur(1px)",
                  transition: { duration: 0.3, ease: "easeInOut" },
                }}
                whileHover={{
                  scale: 1.05,
                  filter: "blur(0px)",
                  opacity: 1,
                  transition: { duration: 0.2 },
                }}
                className="flex-shrink-0 cursor-pointer transform snap-center mx-4 flex items-center justify-center"
                onHoverStart={() => {
                  setIsAutoPlaying(false)
                  setActiveIndex(index)
                }}
                onClick={() => {
                  setIsAutoPlaying(false)
                  setActiveIndex(index)
                }}
                style={{
                  width: isActive ? "220px" : "180px",
                  height: isActive ? "330px" : "270px",
                }}
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <div className="relative h-full w-full">
                 
                  <div className="relative overflow-hidden h-full">
                    <div className="w-full h-full relative">
                      <Image
                        src={plaque.imageSrc || "/placeholder.svg"}
                        alt={`Placa de ${plaque.title} faturados`}
                        fill
                        className="object-contain"
                        style={{
                          opacity: isActive ? 1 : 0.7,
                          transition: "opacity 0.5s ease-in-out",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="flex justify-between absolute top-1/2 left-0 right-0 transform -translate-y-1/2 px-2 md:px-0 pointer-events-none">
          <button
            onClick={() => {
              setIsAutoPlaying(false)
              setActiveIndex((prev) => (prev === 0 ? plaques.length - 1 : prev - 1))
            }}
            className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white border border-white/20 pointer-events-auto hover:bg-black/80 transition-colors md:-ml-5 lg:-ml-12"
            aria-label="Placa anterior"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => {
              setIsAutoPlaying(false)
              setActiveIndex((prev) => (prev === plaques.length - 1 ? 0 : prev + 1))
            }}
            className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white border border-white/20 pointer-events-auto hover:bg-black/80 transition-colors md:-mr-5 lg:-mr-12"
            aria-label="Próxima placa"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
          }}
          key={plaques[activeIndex].id}
          className="text-center max-w-md mx-auto mt-8"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div className="inline-flex items-center justify-center gap-2 mb-4 bg-green-500/10 px-4 py-2 rounded-full">
            <Award className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-medium">Marco Alcançado</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient-primary">{plaques[activeIndex].title}</span>
          </h3>
          <p className="text-lg text-white/80 mb-6">{plaques[activeIndex].description}</p>
        </motion.div>

        <div className="flex justify-center mt-8 gap-3" data-aos="fade-up" data-aos-delay="400">
          {plaques.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAutoPlaying(false)
                setActiveIndex(index)
              }}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                activeIndex === index
                  ? "bg-green-500 scale-125 shadow-lg shadow-green-500/20"
                  : "bg-white/20 hover:bg-white/40",
              )}
              aria-label={`Ver placa ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent"></div>
    </div>
  )
}
