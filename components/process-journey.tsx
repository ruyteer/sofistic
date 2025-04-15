"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "motion/react"
import { Search, FileText, BarChart2, FileBarChart } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProcessStepProps {
  number: number
  title: string
  description: string
  icon: React.ReactNode
  isActive: boolean
  onClick: () => void
}

const ProcessStep = ({ number, title, description, icon, isActive, onClick }: ProcessStepProps) => {
  return (
    <div
      className={cn(
        "flex flex-col cursor-pointer transition-all duration-300",
        isActive ? "opacity-100" : "opacity-80 hover:opacity-100",
      )}
      onClick={onClick}
    >
      {/* Step number with icon */}
      <div className="flex items-center mb-4">
        <div className="bg-green-500 text-white rounded-full px-4 py-1 flex items-center gap-2">
          <span className="font-medium">PASSO {number}</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl md:text-2xl font-bold mb-4 text-white">{title}</h3>

      {/* Description */}
      <p className="text-white/70 text-sm md:text-base leading-relaxed">{description}</p>
    </div>
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
      setActiveStep((prev) => (prev < 4 ? prev + 1 : 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [isInView])

  const processSteps = [
    {
      number: 1,
      title: "Consultoria e Diagnóstico Empresarial",
      description:
        "Analisamos e entendemos o seu mercado, juntamente com a posição atual da sua empresa. Estudamos seu público, as estratégias utilizadas por seus concorrentes e encontramos possibilidades de crescimento da sua empresa, dentro do seu mercado.",
      icon: <Search className="w-5 h-5 text-white" />,
    },
    {
      number: 2,
      title: "Planejamento e execução",
      description:
        "Desenvolvemos uma estratégia exclusiva e personalizada para o seu negócio, escolhendo o canal de vendas que mais se adequa para a sua empresa (Meta Ads, Google Ads, Tiktok Ads ou linkedin Ads). Em sequência, montamos as campanhas irresistíveis com as estratégias certas para a sua empresa, visando o lucro máximo em cima do seu público ideal.",
      icon: <FileText className="w-5 h-5 text-white" />,
    },
    {
      number: 3,
      title: "Análise e Otimização Constante",
      description:
        "Monitoramos diariamente o desenvolvimento das estratégias e campanhas publicadas para garantir o uso máximo do capital investido, visando o investimento máximo.",
      icon: <BarChart2 className="w-5 h-5 text-white" />,
    },
    {
      number: 4,
      title: "Relatórios e Resultados",
      description:
        "Te atualizamos de todo o desenrolar da estratégia, resultados gerados, capital investido, ROAS e faturamento… Você acompanha tudo de forma clara e simplificada, além de marcarmos reuniões sempre que necessário.",
      icon: <FileBarChart className="w-5 h-5 text-white" />,
    },
  ]

  return (
    <div ref={containerRef} className="relative">
      {/* Progress indicator */}
      <div className="flex justify-center mb-12">
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map((step) => (
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

      {/* Process steps in a grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
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
            animate={{ width: `${(activeStep / 4) * 100}%` }}
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </motion.div>
    </div>
  )
}
