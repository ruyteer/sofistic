"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useAnimation, useInView } from "motion/react"
import { Award, Trophy } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

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
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })
  const controls = useAnimation()

  // Update the plaques array to use the new 5MM image
  const plaques: AchievementPlaque[] = [
    {
      id: "10k",
      title: "10 MIL",
      description: "Faturados para nossos clientes",
      imageSrc: "/images/placa-10mil.gif",
      color: "from-gray-500/30 to-gray-700/30",
    },
    {
      id: "100k",
      title: "100 MIL",
      description: "Faturados para nossos clientes",
      imageSrc: "/images/placa-100mil.gif",
      color: "from-green-500/30 to-green-700/30",
    },
    {
      id: "1m",
      title: "1 MILHÃO",
      description: "Faturados para nossos clientes",
      imageSrc: "/images/placa-1milhao.gif",
      color: "from-gray-500/30 to-gray-700/30",
    },
    {
      id: "5m",
      title: "5 MILHÕES",
      description: "Faturados para nossos clientes",
      imageSrc: "/images/placa-5milhoes.gif",
      color: "from-red-500/30 to-red-700/30",
    },
  ]

  // Auto-advance carousel
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isInView && isAutoPlaying) {
      interval = setInterval(() => {
        setActiveIndex((prev) => (prev === plaques.length - 1 ? 0 : prev + 1))
      }, 5000)
    }

    return () => clearInterval(interval)
  }, [isInView, isAutoPlaying, plaques.length])

  // Animation when in view
  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  return (
    <div ref={containerRef} className="relative py-16 overflow-hidden">
      {/* Section header */}
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        }}
        className="text-center mb-16"
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

      {/* Replace the carousel container with a responsive version */}
      <div className="max-w-5xl mx-auto px-4 relative">
        {/* All plaques display - Updated for better mobile responsiveness */}
        <div className="flex justify-center items-center min-h-[400px] relative">
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-4 w-full">
            {plaques.map((plaque, index) => {
              const isActive = activeIndex === index

              return (
                <motion.div
                  key={plaque.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: isActive ? 1 : 0.7,
                    scale: isActive ? 0.9 : 0.7,
                    filter: isActive ? "blur(0px)" : "blur(1px)",
                    transition: { duration: 0.3, ease: "easeInOut" },
                  }}
                  whileHover={{
                    scale: 0.95,
                    filter: "blur(0px)",
                    opacity: 1,
                    transition: { duration: 0.2 },
                  }}
                  className="flex-shrink-0 cursor-pointer transform"
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
                    maxWidth: "100%",
                  }}
                >
                  {/* Plaque container */}
                  <div className="relative h-full w-full">
                    <div
                      className={cn(
                        "absolute -inset-1 bg-gradient-to-r rounded-lg blur-lg",
                        isActive ? `${plaque.color} opacity-50` : "from-white/10 to-white/20 opacity-20",
                      )}
                    ></div>
                    <div className="relative bg-black rounded-lg overflow-hidden border border-white/10 shadow-xl h-full">
                      <Image
                        src={plaque.imageSrc || "/placeholder.svg"}
                        alt={`Placa de ${plaque.title} faturados`}
                        fill
                        className="object-cover"
                        style={{
                          opacity: isActive ? 1 : 0.7,
                          transition: "opacity 0.5s ease-in-out",
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Active plaque description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
          }}
          key={plaques[activeIndex].id}
          className="text-center max-w-md mx-auto mt-8"
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

        {/* Dots navigation */}
        <div className="flex justify-center mt-8 gap-3">
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

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent"></div>
    </div>
  )
}
