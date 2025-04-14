"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { HoverBorderGradient, HoverBorderGradientNavbar } from "@/components/ui/hover-border-gradient"

import Image from "next/image"
import Link from "next/link"
import {
  ChevronDown,
  ArrowRight,
  CheckCircle,
  X,
  Menu,
  User,
  Mail,
  Phone,
  Building,
  MessageSquare,
  Brain,
  ThumbsUp,
  BarChart3,
  Globe2,
  Users2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CountUp } from "@/components/count-up"
import ParticlesBackground from "@/components/particles-background"
import AnimatedButton from "@/components/animated-button"
import { AnimatedGradientText } from "@/components/aceternity/animated-gradient-text"
import { SpotlightCard } from "@/components/aceternity/spotlight-card"
import ServiceCard from "@/components/service-card"
import ProcessJourney from "@/components/process-journey"
import ExclusiveCta from "@/components/exclusive-cta"
import AchievementShowcase from "@/components/achievement-showcase"

export default function LandingPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formStep, setFormStep] = useState(1)
  const [scrollY, setScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const nextStep = () => {
    setFormStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setFormStep((prev) => prev - 1)
  }

  // Header animation based on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      if (headerRef.current) {
        const opacity = Math.min(scrollY / 200, 0.8)
        headerRef.current.style.background = `rgba(0, 0, 0, ${opacity})`
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrollY])

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  // Close form
  const closeForm = () => {
    setIsFormOpen(false)
    setTimeout(() => setFormStep(1), 500) // Reset form step after closing animation completes
  }

  // Service cards data
  const serviceCards = [
    {
      icon: <Brain className="w-10 h-10 text-white" />,
      iconBgColor: "bg-red-600",
      title: "Aumente A Retenção Dos Seus Clientes Por No Mínimo 6 Meses",
      description: "O Lucro mora aqui, se você não tem LTV alto está fadado a quebrar.",
    },
    {
      icon: <ThumbsUp className="w-10 h-10 text-white" />,
      iconBgColor: "bg-green-600",
      title: "Aumente Sua Conversão Em Pelo Menos 30% Em 60 Dias",
      description:
        "Com o público qualificado, um copywriting cirúrgico é essencial para aumentar comprovadamente sua conversão.",
    },
    {
      icon: <BarChart3 className="w-10 h-10 text-white" />,
      iconBgColor: "bg-blue-600",
      title: "Escale Seu Tráfego Com ROI Positivo",
      description: "Um fator crucial para alavancar o seu projeto, é mostrar o seu produto para o público certo.",
    },
    {
      icon: <Globe2 className="w-10 h-10 text-white" />,
      iconBgColor: "bg-purple-600",
      title: "Site Otimizado Para Conversão",
      description:
        "Análise e criação de sites validados, que aumentam a retenção do público e comprovadamente melhoram a conversão.",
    },
    {
      icon: <Users2 className="w-10 h-10 text-white" />,
      iconBgColor: "bg-amber-600",
      title: "Marketing Estratégico Para Crescimento Acelerado",
      description:
        "Receba leads quentes e qualificados, através da Metodologia Sofistic. Testada e comprovada para potencializar seu crescimento.",
    },
    {
      icon: <Users2 className="w-10 h-10 text-white" />,
      iconBgColor: "bg-amber-600",
      title: "Criação de Funil de Venda",
      description:
        "Você não está contratando apenas um serviço de Tráfego Pago, mas sim a criação de uma máquina de vendas.",
    },
  ]

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <ParticlesBackground />

      {/* Animated Gradients */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[40%] -left-[20%] w-[70%] h-[70%] rounded-full bg-green-500/10 blur-[150px] animate-blob"></div>
        <div className="absolute top-[60%] -right-[20%] w-[60%] h-[60%] rounded-full bg-green-500/10 blur-[150px] animate-blob animation-delay-2000"></div>
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-green-700/5 blur-[150px] animate-blob animation-delay-4000"></div>
        <div className="absolute -bottom-[10%] left-[10%] w-[50%] h-[50%] rounded-full bg-green-700/5 blur-[150px] animate-blob animation-delay-6000"></div>
      </div>

      <div className="w-full flex items-center justify-center">
        {/* Header - Circular with glow effect */}
        <header
          ref={headerRef}
          className="w-[70%] z-50 px-6 py-4 flex items-center justify-between transition-all duration-300 rounded-full mx-4 mt-8 border border-green-500/20"
          style={{
            boxShadow: "0 0 20px rgba(16, 185, 129, 0.2), inset 0 0 20px rgba(16, 185, 129, 0.1)",
            background: "linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(16,185,129,0.1) 50%, rgba(0,0,0,0.9) 100%)",
          }}
        >
          <div
            className="flex items-center opacity-0 animate-fade-in"
            style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
          >
            <Image src="/images/logo.png" alt="Sofistic Midia" width={150} height={50} className="h-10 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {["Serviços", "Resultados", "Processo", "Conquistas", "Contato"].map((item, index) => (
              <div
                key={item}
                className="opacity-0 animate-fade-in"
                style={{ animationDelay: `${0.1 * index + 0.3}s`, animationFillMode: "forwards" }}
              >
                <Link
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-medium text-white/80 hover:text-white relative group transition-colors"
                >
                  {item}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-green-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>

          {/* Update the button in the navbar to match the new style */}
          <div
            className="hidden md:block opacity-0 animate-fade-in"
            style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
          >
            <HoverBorderGradientNavbar
              containerClassName="rounded-full"
              as="button"
              className="text-white flex items-center space-x-2 px-5 py-2 "
              onClick={() => setIsFormOpen(true)}
            >
              <span>Contratar Acessoria</span>
            </HoverBorderGradientNavbar>
          </div>
        </header>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="fixed top-24 left-0 right-0 z-40 bg-black/95 backdrop-blur-lg border-b border-white/10 py-4 px-6">
          <nav className="flex flex-col space-y-4">
            {["Serviços", "Resultados", "Processo", "Conquistas", "Contato"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-white/80 hover:text-white py-2 transition-colors"
              >
                {item}
              </Link>
            ))}
            <AnimatedButton
              onClick={() => {
                setIsFormOpen(true)
                setMobileMenuOpen(false)
              }}
              className="w-full"
            >
              Acelerar Vendas Agora
            </AnimatedButton>
          </nav>
        </div>
      )}

      {/* Hero Section - Updated headline */}
      <section className="relative z-10 pt-28 pb-32 px-6 md:px-10 lg:px-20 flex flex-col items-center justify-center min-h-[100vh]">
        <div
          className="text-center max-w-4xl mx-auto opacity-0 animate-fade-in-up"
          style={{ animationFillMode: "forwards" }}
        >
          <div
            className="opacity-0 animate-fade-in-scale"
            style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
          >
            <p
              className="text-6xl md:text-3xl text-white/80 mb-8 mt-6 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
            >
              Se prepare...
            </p>
            <h1 className="text-3xl md:text-4xl mt-6 lg:text-5xl font-bold mb-6 leading-tight">
              Pois a evolução da sua <span className="text-gradient-primary">EMPRESA</span> começa agora!
            </h1>
          </div>

          <p
            className="text-xl md:text-2xl text-white/80 mb-8 mt-6 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
          >
            Impulsione o crescimento da sua Empresa com a{" "}
            <span className="text-gradient-primary font-semibold">Metodologia Sofistic</span>, com clientes que crescem
            acima de 400% durante a parceria. Atraia mais clientes, otimize processos e escale sua operação online.
          </p>

          <div
            className="mt-10 opacity-0 animate-fade-in-up flex justify-center"
            style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}
          >
            <HoverBorderGradient
              containerClassName="rounded-md"
              as="button"
              className="text-white flex items-center space-x-2 text-lg py-3 px-10"
              onClick={() => setIsFormOpen(true)}
            >
              <span className="flex items-center">
                Acelerar Vendas Agora
                <ArrowRight className="ml-2 w-5 h-5 transition-transform" />
              </span>
            </HoverBorderGradient>
          </div>
        </div>

        <div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-0 animate-fade-in"
          style={{ animationDelay: "1s", animationFillMode: "forwards" }}
        >
          <span className="text-white/60 text-sm mb-2">Descubra mais</span>
          <ChevronDown className="w-6 h-6 text-white/60 animate-bounce" />
        </div>
      </section>

      {/* Services Section - Updated with new card style */}
      <section id="serviços" className="relative z-10 py-20 px-6 md:px-10 lg:px-20">
        <div
          className="text-center max-w-3xl mx-auto mb-16 opacity-0 animate-fade-in-up"
          style={{ animationFillMode: "forwards" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center justify-center gap-3">
            Nossos <AnimatedGradientText>Serviços</AnimatedGradientText>
          </h2>
          <p className="text-lg text-white/70">
            Soluções completas para impulsionar seu negócio no ambiente digital, com estratégias personalizadas e
            resultados mensuráveis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* New Service Cards */}
          {serviceCards.map((service, index) => (
            <div
              key={index}
              className="opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
            >
              <ServiceCard
                icon={service.icon}
                iconBgColor={service.iconBgColor}
                title={service.title}
                description={service.description}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Results Section with Counter Animation */}
      <section id="resultados" className="relative z-10 py-20 px-6 md:px-10 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/10 to-black/50 z-0"></div>

        <div
          className="relative z-10 text-center max-w-3xl mx-auto mb-16 opacity-0 animate-fade-in-up"
          style={{ animationFillMode: "forwards" }}
        >
          <h2 className="text-7xl md:text-8xl lg:text-9xl font-bold mb-4 text-gradient-tudo tracking-wide">Tudo</h2>
          <p className="text-xl md:text-2xl mb-10 text-gradient-white-green">
            que o seu negócio precisa para escalar de verdade
          </p>
          <h3 className="text-2xl md:text-3xl font-bold">
            Alguns dados da nossa <AnimatedGradientText>Metodologia Digital:</AnimatedGradientText>
          </h3>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Stats with Counter Animation */}
          {[
            { value: 67, suffix: "+", label: "Clientes Turbinados" },
            { value: 7, prefix: "R$", suffix: "MI+", label: "Em faturamento gerado" },
            { value: 2.3, prefix: "R$", suffix: "MI+", decimals: 1, label: "Investidos em mídias digitais" },
          ].map((stat, index) => (
            <SpotlightCard
              key={index}
              className="bg-gradient-to-br from-black/60 to-green-900/20 backdrop-blur-sm p-8 rounded-xl border border-white/10 text-center relative overflow-hidden group hover:scale-105 transition-transform duration-300 opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${0.1 * (index + 1)}s`, animationFillMode: "forwards" }}
            >
              <span className="absolute -top-10 -right-10 w-20 h-20 bg-green-500/10 rounded-full blur-xl group-hover:bg-green-500/20 transition-colors duration-300"></span>
              <div className="text-5xl font-bold text-gradient-white-green mb-4">
                {stat.prefix && stat.prefix}
                <CountUp end={stat.value} decimals={stat.decimals || 0} suffix={stat.suffix} />
              </div>
              <p className="text-xl text-white/80">{stat.label}</p>
            </SpotlightCard>
          ))}
        </div>

        <div className="relative z-10 flex flex-wrap justify-center gap-6">
          {/* Badges with improved animations */}
          {[
            { icon: <CheckCircle className="w-5 h-5 text-green-400 mr-2" />, text: "Especialistas em Conversão" },
            { icon: <CheckCircle className="w-5 h-5 text-green-400 mr-2" />, text: "Estratégias Personalizadas" },
            { icon: <CheckCircle className="w-5 h-5 text-green-400 mr-2" />, text: "Resultados Comprovados" },
          ].map((badge, index) => (
            <div
              key={badge.text}
              className="bg-gradient-to-r from-green-500/20 to-green-700/20 backdrop-blur-sm px-6 py-3 rounded-full border border-green-500/30 flex items-center group hover:scale-105 transition-transform duration-200 opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 0.1 + 0.4}s`, animationFillMode: "forwards" }}
            >
              <span className="animate-pulse" style={{ animationDuration: "2s" }}>
                {badge.icon}
              </span>
              <span className="text-white/90">{badge.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section - Completely Redesigned */}
      <section id="processo" className="relative z-10 py-32 px-6 md:px-10 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Como <AnimatedGradientText>Trabalhamos</AnimatedGradientText>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Um processo simplificado e eficiente para transformar seu negócio e impulsionar seu crescimento.
            </p>
          </div>

          {/* Interactive Process Journey Component */}
          <ProcessJourney />
        </div>
      </section>

      {/* Achievement Showcase Section - NEW */}
      <section id="conquistas" className="relative z-10 py-20 px-6 md:px-10 lg:px-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-green-900/10 z-0"></div>
        <AchievementShowcase />
      </section>

      {/* CTA Section - Redesigned to match the image */}
      <section id="contato" className="relative z-10 py-20 px-6 md:px-10 lg:px-20">
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-black/50 z-0"></div>

        {/* New Exclusive CTA Component */}
        <ExclusiveCta onButtonClick={() => setIsFormOpen(true)} />
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-10 px-6 md:px-10 lg:px-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Image src="/images/logo.png" alt="Sofistic Midia" width={150} height={50} className="h-10 w-auto mb-2" />
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} Sofistic Midia LTDA. Todos os direitos reservados.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <Link href="#" className="text-sm text-white/60 hover:text-white transition-colors">
              Política de Privacidade
            </Link>
            <Link href="#" className="text-sm text-white/60 hover:text-white transition-colors">
              Termos de Uso
            </Link>
            <Link href="#" className="text-sm text-white/60 hover:text-white transition-colors">
              Contato
            </Link>
          </div>
        </div>
      </footer>

      {/* Multi-step Contact Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeForm}></div>

          <div
            className="relative z-10 bg-gradient-to-br from-black to-green-900/30 w-full max-w-lg rounded-xl border border-white/10 shadow-2xl overflow-hidden opacity-0 animate-fade-in-scale"
            style={{ animationFillMode: "forwards", animationDuration: "0.3s" }}
          >
            <SpotlightCard className="bg-transparent border-none">
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Contratar Assessoria</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={closeForm}
                    className="text-white/70 hover:text-white hover:bg-white/10"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Progress Indicator */}
                <div className="w-full bg-white/10 h-1 rounded-full mb-8 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-300"
                    style={{ width: `${(formStep / 3) * 100}%` }}
                  />
                </div>

                {formStep === 1 && (
                  <div
                    className="opacity-0 animate-fade-in-right"
                    style={{ animationFillMode: "forwards", animationDuration: "0.3s" }}
                  >
                    <h4 className="text-lg font-medium mb-4">Informações Pessoais</h4>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-white/70 flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          Nome Completo
                        </label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Seu nome completo"
                          className="bg-white/5 border-white/10 focus:border-green-500 text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-white/70 flex items-center">
                          <Mail className="w-4 h-4 mr-2" />
                          E-mail
                        </label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="seu@email.com"
                          className="bg-white/5 border-white/10 focus:border-green-500 text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium text-white/70 flex items-center">
                          <Phone className="w-4 h-4 mr-2" />
                          Telefone
                        </label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="(00) 00000-0000"
                          className="bg-white/5 border-white/10 focus:border-green-500 text-white"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end mt-6">
                      <Button
                        onClick={nextStep}
                        className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white py-2 rounded-md transition-all duration-300"
                      >
                        Próximo
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {formStep === 2 && (
                  <div
                    className="opacity-0 animate-fade-in-right"
                    style={{ animationFillMode: "forwards", animationDuration: "0.3s" }}
                  >
                    <h4 className="text-lg font-medium mb-4">Informações da Empresa</h4>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="company" className="text-sm font-medium text-white/70 flex items-center">
                          <Building className="w-4 h-4 mr-2" />
                          Nome da Empresa
                        </label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Nome da sua empresa"
                          className="bg-white/5 border-white/10 focus:border-green-500 text-white"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between mt-6">
                      <Button
                        onClick={prevStep}
                        variant="outline"
                        className="border-white/10 text-white hover:bg-white/10"
                      >
                        Voltar
                      </Button>

                      <Button
                        onClick={nextStep}
                        className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white py-2 rounded-md transition-all duration-300"
                      >
                        Próximo
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {formStep === 3 && (
                  <div
                    className="opacity-0 animate-fade-in-right"
                    style={{ animationFillMode: "forwards", animationDuration: "0.3s" }}
                  >
                    <h4 className="text-lg font-medium mb-4">Sua Mensagem</h4>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium text-white/70 flex items-center">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Mensagem
                        </label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Conte-nos um pouco sobre seu negócio e objetivos"
                          className="bg-white/5 border-white/10 focus:border-green-500 text-white min-h-[120px]"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between mt-6">
                      <Button
                        onClick={prevStep}
                        variant="outline"
                        className="border-white/10 text-white hover:bg-white/10"
                      >
                        Voltar
                      </Button>

                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white py-2 rounded-md transition-all duration-300"
                      >
                        Enviar Solicitação
                      </Button>
                    </div>
                  </div>
                )}

                <div className="mt-6 pt-6 border-t border-white/10 text-center text-sm text-white/60">
                  Você receberá um retorno em até 24 horas úteis.
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      )}
    </div>
  )
}
