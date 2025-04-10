"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  ChevronDown,
  ArrowRight,
  Zap,
  PenTool,
  TrendingUp,
  Globe,
  CheckCircle,
  X,
  Menu,
  User,
  Mail,
  Phone,
  Building,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CountUp } from "@/components/count-up"
import ParticlesBackground from "@/components/particles-background"

export default function LandingPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formStep, setFormStep] = useState(1)
  const [scrollY, setScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()

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

  // Animated values for parallax effects
  const heroTextY = useTransform(scrollYProgress, [0, 0.2], [0, -50])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.5])

  // Header animation based on scroll
  const headerBg = useTransform(scrollYProgress, [0, 0.1], ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.8)"])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.style.background = headerBg.get()
    }
  }, [scrollY, headerBg])

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

      {/* Header */}
      <motion.header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between backdrop-blur-md transition-all duration-300 border-b border-white/10"
        style={{ backgroundColor: headerBg }}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-green-400">
            SOFISTIC
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {["Serviços", "Resultados", "Processo", "Contato"].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Link
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-white/80 hover:text-white relative group transition-colors"
              >
                {item}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-green-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
            <Menu className="w-6 h-6" />
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:block"
        >
          <Button
            onClick={() => setIsFormOpen(true)}
            className="relative overflow-hidden group bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-6 py-2 rounded-md transition-all duration-300 shadow-lg shadow-green-500/20"
          >
            <span className="relative z-10">Contratar Assessoria</span>
            <span className="absolute inset-0 w-full h-full bg-white/20 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
          </Button>
        </motion.div>
      </motion.header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40 bg-black/95 backdrop-blur-lg border-b border-white/10 py-4 px-6"
          >
            <nav className="flex flex-col space-y-4">
              {["Serviços", "Resultados", "Processo", "Contato"].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-white/80 hover:text-white py-2 transition-colors"
                >
                  {item}
                </Link>
              ))}
              <Button
                onClick={() => {
                  setIsFormOpen(true)
                  setMobileMenuOpen(false)
                }}
                className="mt-2 w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white"
              >
                Contratar Assessoria
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-32 px-6 md:px-10 lg:px-20 flex flex-col items-center justify-center min-h-[100vh]">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          style={{ y: heroTextY, opacity: heroOpacity }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Olá 👋, seja bem-vindo! Se prepare, pois a{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">
                evolução da sua Empresa
              </span>{" "}
              começa agora.
            </h1>
          </motion.div>

          <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-white/80 mb-8">
            Impulsione o crescimento da sua Empresa com{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600 font-semibold">
              inteligência comercial
            </span>
            . Atraia mais clientes, otimize processos e escale sua operação online.
          </motion.p>

          <motion.div variants={fadeInUp} className="mt-10">
            <Button
              onClick={() => setIsFormOpen(true)}
              className="relative overflow-hidden group bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-10 py-6 text-lg rounded-md transition-all duration-300 shadow-xl shadow-green-500/20"
            >
              <span className="relative z-10 flex items-center">
                Contratar Assessoria
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="absolute inset-0 w-full h-full bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="absolute w-full h-full bg-green-500/20 blur-md rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"></span>
              </span>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <span className="text-white/60 text-sm mb-2">Descubra mais</span>
          <ChevronDown className="w-6 h-6 text-white/60 animate-bounce" />
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="serviços" className="relative z-10 py-20 px-6 md:px-10 lg:px-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Nossos{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">Serviços</span>
          </h2>
          <p className="text-lg text-white/70">
            Soluções completas para impulsionar seu negócio no ambiente digital, com estratégias personalizadas e
            resultados mensuráveis.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {/* Service Cards with improved animations */}
          {[
            {
              icon: <Zap className="w-8 h-8 text-white" />,
              title: "Automações",
              description: "Automação comercial inteligente para equipes de alta performance",
            },
            {
              icon: <PenTool className="w-8 h-8 text-white" />,
              title: "Conversão",
              description: "Copywriting cirúrgico com metodologia Sofistic",
            },
            {
              icon: <TrendingUp className="w-8 h-8 text-white" />,
              title: "Tráfego",
              description: "Aumente a visibilidade da sua marca para gerar mais vendas",
            },
            {
              icon: <Globe className="w-8 h-8 text-white" />,
              title: "Site",
              description: "Criação de sites que retêm e convertem visitantes",
            },
          ].map((service, index) => (
            <motion.div
              key={service.title}
              variants={fadeInUp}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-gradient-to-br from-black/40 to-green-900/10 backdrop-blur-sm p-8 rounded-xl border border-white/10 group hover:border-green-500/50 transition-all duration-500 shadow-lg hover:shadow-green-500/10"
            >
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center mb-6"
              >
                {service.icon}
              </motion.div>
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-white/70 mb-4">{service.description}</p>
              <motion.div
                className="flex items-center text-green-400 font-medium group-hover:translate-x-2 transition-transform duration-300"
                whileHover={{ x: 5 }}
              >
                <span>Saiba mais</span>
                <ArrowRight className="ml-2 w-4 h-4" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Results Section with Counter Animation */}
      <section id="resultados" className="relative z-10 py-20 px-6 md:px-10 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/10 to-black/50 z-0"></div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="relative z-10 text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">
              Pessoas Mentem…
            </span>{" "}
            Números Não!
          </h2>
          <p className="text-lg text-white/70">Tudo que seu negócio precisa para escalar de verdade</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {/* Stats with Counter Animation */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            className="bg-gradient-to-br from-black/60 to-green-900/20 backdrop-blur-sm p-8 rounded-xl border border-white/10 text-center relative overflow-hidden group"
          >
            <span className="absolute -top-10 -right-10 w-20 h-20 bg-green-500/10 rounded-full blur-xl group-hover:bg-green-500/20 transition-colors duration-300"></span>
            <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-green-400 mb-4">
              <CountUp end={67} suffix="+" />
            </div>
            <p className="text-xl text-white/80">Clientes Turbinados</p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            className="bg-gradient-to-br from-black/60 to-green-900/20 backdrop-blur-sm p-8 rounded-xl border border-white/10 text-center relative overflow-hidden group"
          >
            <span className="absolute -top-10 -right-10 w-20 h-20 bg-green-500/10 rounded-full blur-xl group-hover:bg-green-500/20 transition-colors duration-300"></span>
            <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-green-400 mb-4">
              R$
              <CountUp end={7} suffix="MI+" />
            </div>
            <p className="text-xl text-white/80">Em faturamento gerado</p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            className="bg-gradient-to-br from-black/60 to-green-900/20 backdrop-blur-sm p-8 rounded-xl border border-white/10 text-center relative overflow-hidden group"
          >
            <span className="absolute -top-10 -right-10 w-20 h-20 bg-green-500/10 rounded-full blur-xl group-hover:bg-green-500/20 transition-colors duration-300"></span>
            <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-green-400 mb-4">
              R$
              <CountUp end={2.3} decimals={1} suffix="MI+" />
            </div>
            <p className="text-xl text-white/80">Investidos em mídias digitais</p>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="relative z-10 flex flex-wrap justify-center gap-6"
        >
          {/* Badges with improved animations */}
          {[
            { icon: <CheckCircle className="w-5 h-5 text-green-400 mr-2" />, text: "Especialistas em Conversão" },
            { icon: <CheckCircle className="w-5 h-5 text-green-400 mr-2" />, text: "Estratégias Personalizadas" },
            { icon: <CheckCircle className="w-5 h-5 text-green-400 mr-2" />, text: "Resultados Comprovados" },
          ].map((badge, index) => (
            <motion.div
              key={badge.text}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="bg-gradient-to-r from-green-500/20 to-green-700/20 backdrop-blur-sm px-6 py-3 rounded-full border border-green-500/30 flex items-center group"
            >
              <motion.span
                animate={{ rotate: [0, 15, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, repeatType: "mirror", duration: 2, delay: index }}
              >
                {badge.icon}
              </motion.span>
              <span className="text-white/90">{badge.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Process Section */}
      <section id="processo" className="relative z-10 py-20 px-6 md:px-10 lg:px-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Como{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">
              Trabalhamos
            </span>
          </h2>
          <p className="text-lg text-white/70">Um processo simples e eficiente para transformar seu negócio</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 relative"
        >
          {/* Animated connector line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-green-500/50 via-green-700/50 to-green-500/50 hidden md:block">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full bg-green-500"
              style={{ transformOrigin: "left" }}
            />
          </div>

          {/* Step 1 */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="relative z-10"
          >
            <div className="bg-gradient-to-br from-black/40 to-green-900/10 backdrop-blur-sm p-8 rounded-xl border border-white/10 text-center relative group hover:border-green-500/50 transition-all duration-300">
              <motion.div
                initial={{ scale: 1 }}
                whileInView={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-xl font-bold absolute -top-6 left-1/2 transform -translate-x-1/2 group-hover:shadow-lg group-hover:shadow-green-500/20 transition-all duration-300"
              >
                1
              </motion.div>
              <div className="pt-6">
                <h3 className="text-xl font-bold mb-4">Diagnóstico</h3>
                <p className="text-white/70">Preencha o formulário e agende um diagnóstico completo do seu negócio</p>
              </div>
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="relative z-10"
          >
            <div className="bg-gradient-to-br from-black/40 to-green-900/10 backdrop-blur-sm p-8 rounded-xl border border-white/10 text-center relative group hover:border-green-500/50 transition-all duration-300">
              <motion.div
                initial={{ scale: 1 }}
                whileInView={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-xl font-bold absolute -top-6 left-1/2 transform -translate-x-1/2 group-hover:shadow-lg group-hover:shadow-green-500/20 transition-all duration-300"
              >
                2
              </motion.div>
              <div className="pt-6">
                <h3 className="text-xl font-bold mb-4">Plano de Ação</h3>
                <p className="text-white/70">Receba análise completa + plano de ação personalizado para seu negócio</p>
              </div>
            </div>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="relative z-10"
          >
            <div className="bg-gradient-to-br from-black/40 to-green-900/10 backdrop-blur-sm p-8 rounded-xl border border-white/10 text-center relative group hover:border-green-500/50 transition-all duration-300">
              <motion.div
                initial={{ scale: 1 }}
                whileInView={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-xl font-bold absolute -top-6 left-1/2 transform -translate-x-1/2 group-hover:shadow-lg group-hover:shadow-green-500/20 transition-all duration-300"
              >
                3
              </motion.div>
              <div className="pt-6">
                <h3 className="text-xl font-bold mb-4">Resultados</h3>
                <p className="text-white/70">Compartilhe seu sucesso com a Sofistic Midia e escale seu negócio</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section id="contato" className="relative z-10 py-20 px-6 md:px-10 lg:px-20">
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-black/50 z-0"></div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="relative z-10 max-w-4xl mx-auto bg-gradient-to-br from-black/80 to-green-900/20 backdrop-blur-sm p-10 md:p-16 rounded-2xl border border-white/10 shadow-2xl"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Nosso trabalho é{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">
                exclusivo
              </span>
            </h2>
            <p className="text-xl text-white/80 mb-4">
              Não temos "ofertas de prateleira". Nem sempre temos vagas disponíveis.
            </p>
            <p className="text-lg text-white/70">
              Aproveite agora e receba um diagnóstico completo da sua empresa para crescer ainda mais em 2025!
            </p>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={() => setIsFormOpen(true)}
              className="relative overflow-hidden group bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-10 py-6 text-lg rounded-md transition-all duration-300 shadow-xl shadow-green-500/20 animate-pulse hover:animate-none"
            >
              <span className="relative z-10 flex items-center">
                Quero Escalar Meu Negócio
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="absolute inset-0 w-full h-full bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="absolute w-full h-full bg-green-500/20 blur-md rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"></span>
              </span>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-10 px-6 md:px-10 lg:px-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-green-400 mb-2">
              SOFISTIC
            </div>
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

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 bg-gradient-to-br from-black to-green-900/30 w-full max-w-lg rounded-xl border border-white/10 shadow-2xl overflow-hidden"
          >
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
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${(formStep / 3) * 100}%` }}
                  className="h-full bg-gradient-to-r from-green-400 to-green-600"
                />
              </div>

              <AnimatePresence mode="wait">
                {formStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
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
                  </motion.div>
                )}

                {formStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
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
                  </motion.div>
                )}

                {formStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
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
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-6 pt-6 border-t border-white/10 text-center text-sm text-white/60">
                Você receberá um retorno em até 24 horas úteis.
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
