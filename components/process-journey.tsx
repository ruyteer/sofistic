"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "motion/react"
import { cn } from "@/lib/utils"
import { ArrowRight, CheckCircle } from "lucide-react"

interface ProcessStepProps {
  number: number
  title: string
  description: string
  icon: React.ReactNode
  isActive: boolean
  onClick: () => void
}

const ProcessStep = ({ number, title, description, icon, isActive, onClick }: ProcessStepProps) => {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
      }}
      className={cn(
        "relative cursor-pointer transition-all duration-500 transform",
        isActive ? "scale-105 z-20" : "scale-100 hover:scale-102 z-10",
      )}
      onClick={onClick}
    >
      {/* Connection line */}
      {number < 3 && (
        <div className="hidden md:block absolute top-1/2 left-full w-12 h-0.5 bg-gradient-to-r from-green-500/80 to-transparent z-0">
          <motion.div
            className="absolute top-0 left-0 h-full bg-green-400"
            initial={{ width: 0 }}
            animate={isActive ? { width: "100%" } : { width: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      )}

      {/* Card */}
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl transition-all duration-500",
          isActive
            ? "bg-gradient-to-br from-green-900/40 to-black/80 border-green-500/50 shadow-lg shadow-green-500/20"
            : "bg-black/40 border-white/10 hover:border-green-500/30",
        )}
        style={{
          borderWidth: "1px",
          backdropFilter: "blur(8px)",
        }}
      >
        {/* Background patterns */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20" />

        {/* Animated gradient background */}
        <div
          className={cn(
            "absolute inset-0 opacity-0 transition-opacity duration-500",
            isActive ? "opacity-20" : "group-hover:opacity-10",
          )}
          style={{
            background: "radial-gradient(circle at center, rgba(16, 185, 129, 0.3) 0%, transparent 70%)",
            animation: isActive ? "pulse 3s infinite alternate" : "none",
          }}
        />

        {/* Content container */}
        <div className="relative z-10 p-6 md:p-8">
          {/* Step number with icon */}
          <div className="flex items-center justify-center mb-6">
            <div
              className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500",
                isActive
                  ? "bg-gradient-to-br from-green-400 to-green-600 shadow-lg shadow-green-500/30"
                  : "bg-gradient-to-br from-green-500/40 to-green-700/40",
              )}
            >
              {icon}
            </div>
          </div>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-1 mb-3">
            <span
              className={cn(
                "text-xs font-semibold uppercase tracking-wider",
                isActive ? "text-green-400" : "text-green-500/70",
              )}
            >
              Passo
            </span>
            <span
              className={cn(
                "flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold",
                isActive ? "bg-green-500 text-white" : "bg-green-500/20 text-green-400",
              )}
            >
              {number}
            </span>
          </div>

          {/* Title */}
          <h3
            className={cn(
              "text-xl font-bold text-center mb-4 transition-colors duration-300",
              isActive ? "text-white" : "text-white/80",
            )}
          >
            {title}
          </h3>

          {/* Description with animation */}
          <motion.div
            initial={{ height: isActive ? "auto" : "0" }}
            animate={{ height: isActive ? "auto" : "0" }}
            transition={{ duration: 0.5 }}
            className={cn("overflow-hidden", isActive ? "opacity-100" : "opacity-0")}
          >
            <p className="text-white/70 text-center leading-relaxed">{description}</p>
          </motion.div>

          {/* Completion indicator */}
          {isActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="mt-4 flex justify-center"
            >
              <span className="inline-flex items-center text-green-400 text-sm font-medium">
                <CheckCircle className="w-4 h-4 mr-1" />
                Etapa atual
              </span>
            </motion.div>
          )}
        </div>

        {/* Bottom decoration */}
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 h-1 transition-all duration-500",
            isActive ? "bg-gradient-to-r from-green-500 via-green-400 to-green-500" : "bg-green-500/20",
          )}
        />
      </div>
    </motion.div>
  )
}

export default function ProcessJourney() {
  const [activeStep, setActiveStep] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })

  // Auto-advance steps
  useEffect(() => {
    if (!isInView) return

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev < 3 ? prev + 1 : 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [isInView])

  const processSteps = [
    {
      number: 1,
      title: "Diagnóstico",
      description: "Preencha o Formulário e Agende um Diagnóstico Para a Sua Empresa.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      ),
    },
    {
      number: 2,
      title: "Plano de Ação",
      description:
        "Receba um diagnóstico completo da situação atual da sua empresa, juntamente com estratégias e implementações comerciais e processos, para alavancar ainda mais sua Empresa!",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M16 13H8" />
          <path d="M16 17H8" />
          <path d="M10 9H8" />
        </svg>
      ),
    },
    {
      number: 3,
      title: "Resultados",
      description: "Venha compartilhar conosco o sucesso da sua Empresa, após contratar os serviços da Sofistic Midia!",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 20V10" />
          <path d="M18 20V4" />
          <path d="M6 20v-4" />
          <path d="M2 8h20" />
          <path d="M2 16h20" />
        </svg>
      ),
    },
  ]

  return (
    <div ref={containerRef} className="relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-[10%] w-[30%] h-[30%] rounded-full bg-green-500/5 blur-[120px]"></div>
        <div className="absolute bottom-1/4 -right-[10%] w-[30%] h-[30%] rounded-full bg-green-500/5 blur-[120px]"></div>
      </div>

      {/* Progress indicator */}
      <div className="flex justify-center mb-12">
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((step) => (
            <button
              key={step}
              onClick={() => setActiveStep(step)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                step === activeStep ? "bg-green-500 scale-125" : "bg-green-500/30 hover:bg-green-500/50",
              )}
              aria-label={`Ir para o passo ${step}`}
            />
          ))}
        </div>
      </div>

      {/* Process steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
        {processSteps.map((step) => (
          <ProcessStep
            key={step.number}
            number={step.number}
            title={step.title}
            description={step.description}
            icon={step.icon}
            isActive={step.number === activeStep}
            onClick={() => setActiveStep(step.number)}
          />
        ))}
      </div>

      {/* Journey progress bar */}
      <div className="mt-12 max-w-md mx-auto">
        <div className="h-1 bg-green-500/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-green-400 to-green-600"
            initial={{ width: "0%" }}
            animate={{ width: `${(activeStep / 3) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="mt-4 flex justify-between text-xs text-green-500/70">
          <span>Início</span>
          <span>Processo</span>
          <span>Conclusão</span>
        </div>
      </div>

      {/* Call to action */}
      <motion.div
        className="mt-16 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <button
          className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-green-600 to-green-800 px-8 py-4 text-white shadow-lg transition-all duration-300 hover:shadow-green-500/20 hover:scale-105"
          onClick={() => (window.location.href = "#contato")}
        >
          <span className="relative z-10 flex items-center font-medium">
            Iniciar Jornada
            <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20" />
        </button>
      </motion.div>
    </div>
  )
}
