"use client"

import { useState, useEffect, useRef } from "react"
import { HoverBorderGradientNavbar } from "@/components/ui/hover-border-gradient"
import Footer from "@/components/footer"

import Image from "next/image"
import Link from "next/link"
import { CheckCircle, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CountUp } from "@/components/count-up"
import AnimatedButton from "@/components/animated-button"
import { AnimatedGradientText } from "@/components/aceternity/animated-gradient-text"
import { SpotlightCard } from "@/components/aceternity/spotlight-card"
import ServiceCard from "@/components/service-card"
import ProcessJourney from "@/components/process-journey"
import ExclusiveCta from "@/components/exclusive-cta"
import AchievementShowcase from "@/components/achievement-showcase"
import ContactForm from "@/components/contact-form"
import AnimatedGifIcon from "@/components/animated-gif-icon"

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

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

  // Service cards data - Updated to use GIFs for all cards with slightly smaller size
  const serviceCards = [
    {
      icon: <AnimatedGifIcon src="/images/brain-lightbulb.gif" alt="Brain with Lightbulb" size={100} />,
      iconBgColor: "bg-white",
      title: "Aumente A Retenção Dos Seus Clientes Por No Mínimo 6 Meses",
      description: "O Lucro mora aqui, se você não tem LTV alto está fadado a quebrar.",
    },
    {
      icon: <AnimatedGifIcon src="/images/thumbs-up-star.gif" alt="Thumbs Up with Star" size={100} />,
      iconBgColor: "bg-white",
      title: "Aumente Sua Conversão Em Pelo Menos 30% Em 60 Dias",
      description:
        "Com o público qualificado, um copywriting cirúrgico é essencial para aumentar comprovadamente sua conversão.",
    },
    {
      icon: <AnimatedGifIcon src="/images/bar-chart-trend.gif" alt="Bar Chart with Trend" size={100} />,
      iconBgColor: "bg-white",
      title: "Escale Seu Tráfego Com ROI Positivo",
      description: "Um fator crucial para alavancar o seu projeto, é mostrar o seu produto para o público certo.",
    },
    {
      icon: <AnimatedGifIcon src="/images/globe-icon.gif" alt="Globe Icon" size={100} />,
      iconBgColor: "bg-white",
      title: "Site Otimizado Para Conversão",
      description:
        "Análise e criação de sites validados, que aumentam a retenção do público e comprovadamente melhoram a conversão.",
    },
    {
      icon: <AnimatedGifIcon src="/images/team-stars.gif" alt="Team with Stars" size={100} />,
      iconBgColor: "bg-white",
      title: "Marketing Estratégico Para Crescimento Acelerado",
      description:
        "Receba leads quentes e qualificados, através da Metodologia Sofistic. Testada e comprovada para potencializar seu crescimento.",
    },
    {
      icon: <AnimatedGifIcon src="/images/funnel-dollar.gif" alt="Funnel with Dollar" size={100} />,
      iconBgColor: "bg-white",
      title: "Criação de Funil de Venda",
      description:
        "Você não está contratando apenas um serviço de Tráfego Pago, mas sim a criação de uma máquina de vendas.",
    },
  ]

  return (
    <div className="relative min-h-screen bg-black text-white">
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

          {/* Update the button in the navbar */}
          <div
            className="hidden md:block opacity-0 animate-fade-in"
            style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
          >
            <HoverBorderGradientNavbar
              containerClassName="rounded-full"
              as="button"
              className="text-white flex items-center space-x-2 px-5 py-2"
              onClick={() => (window.location.href = "#contato")}
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
                setMobileMenuOpen(false)
                window.location.href = "#contato"
              }}
              className="w-full"
            >
              Acelerar Vendas Agora
            </AnimatedButton>
          </nav>
        </div>
      )}

      {/* Hero Section - Updated headline */}
      <section className="relative z-10 pt-28 pb-16 px-6 md:px-10 lg:px-20 flex flex-col items-center justify-center">
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
        </div>
      </section>

      {/* Contact Form Section - NEW */}
      <section id="contato" className="relative z-10 py-10 px-6 md:px-10 lg:px-20 mb-16">
        <ContactForm />
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
            { value: 2.1, prefix: "R$", suffix: "MI+", decimals: 1, label: "Em faturamento gerado" },
            { value: 690, prefix: "R$", suffix: "K", label: "Investidos em mídias digitais" },
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

      {/* Process Section - Updated to match the image */}
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

          {/* Updated Process Journey Component */}
          <ProcessJourney />
        </div>
      </section>

      {/* Achievement Showcase Section */}
      <section id="conquistas" className="relative z-10 py-20 px-6 md:px-10 lg:px-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-green-900/10 z-0"></div>
        <AchievementShowcase />
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-6 md:px-10 lg:px-20">
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-black/50 z-0"></div>

        {/* Exclusive CTA Component */}
        <ExclusiveCta onButtonClick={() => (window.location.href = "#contato")} />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
