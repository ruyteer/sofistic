"use client"

import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useInView } from "motion/react"
import { useRef } from "react"

interface ExclusiveCtaProps {
  onButtonClick: () => void
}

export default function ExclusiveCta({ onButtonClick }: ExclusiveCtaProps) {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })

  return (
    <div ref={containerRef} className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/60 backdrop-blur-sm p-12 md:p-16"
      >
        {/* Background grid pattern */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20"></div>

        {/* Glowing orbs */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-500/20 rounded-full blur-[80px]"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-green-500/20 rounded-full blur-[80px]"></div>

        {/* Content container */}
        <div className="relative z-10 text-center">
          {/* Headline */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
            O nosso <span className="text-gradient-primary">trabalho</span> é{" "}
            <span className="text-gradient-primary">exclusivo</span>, e por isso nem sempre temos vagas disponíveis para
            novos parceiros.
          </h2>

          {/* Description */}
          <p className="text-white/80 text-base md:text-lg mb-10 max-w-2xl mx-auto">
            Não trabalhamos com ofertas de prateleira! Por isso, fazemos tudo sob medida para o seu negócio. Abrace essa
            oportunidade e receba um diagnóstico completo do seu negócio, para que em 2025 você lucre ainda mais com a
            ajuda da Sofistic Midia!
          </p>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            onClick={onButtonClick}
            className={cn(
              "group relative overflow-hidden rounded-lg px-8 py-4 text-white font-medium",
              "bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400",
              "shadow-lg shadow-green-500/20 transition-all duration-300 hover:shadow-green-500/30 hover:scale-105",
            )}
          >
            <span className="relative z-10 flex items-center">
              Agende já uma reunião
              <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <span className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
