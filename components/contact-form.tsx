"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronDown, ClipboardList, Phone, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import ScrollAnimation from "@/components/scroll-animation"

// Define option types with both value and label
interface SelectOption {
  value: string
  label: string
}

export default function ContactForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Define options with both value and display text
  const businessModelOptions: SelectOption[] = [
    { value: "servicos", label: "Serviços" },
    { value: "varejo-comercio", label: "Varejo / Comércio" },
    { value: "e-commerce", label: "E-commerce" },
    { value: "alimentacao-food-service", label: "Alimentação / Food Service" },
    { value: "educacao", label: "Educação" },
    { value: "imobiliario-construcao", label: "Imobiliário / Construção" },
    { value: "saude-estetica", label: "Saúde / Estética" },
    { value: "tecnologia-startups", label: "Tecnologia / Startups (inclui SaaS)" },
    { value: "financas-contabilidade", label: "Finanças / Contabilidade" },
    { value: "energia-sustentabilidade", label: "Energia / Sustentabilidade" },
    { value: "turismo-hotelaria", label: "Turismo / Hotelaria" },
    { value: "agro-rural", label: "Agro / Rural" },
    { value: "transporte-logistica", label: "Transporte / Logística" },
    { value: "ong-terceiro-setor", label: "ONG / Terceiro Setor" },
    { value: "outro", label: "Outro" },
  ]

  const revenueOptions: SelectOption[] = [
    { value: "11-20-mil", label: "De 11 mil até 20 mil" },
    { value: "21-30-mil", label: "De 21 mil até 30 mil" },
    { value: "31-50-mil", label: "De 31 mil até 50 mil" },
    { value: "51-80-mil", label: "De 51 mil até 80 mil" },
    { value: "81-150-mil", label: "De 81 mil até 150 mil" },
    { value: "151-300-mil", label: "De 151 mil até 300 mil" },
    { value: "acima-500-mil", label: "Acima de 500 mil" },
  ]

  // Form data with values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    instagram: "",
    businessModel: "",
    revenue: "",
  })

  // Track the selected options for display text
  const [selectedBusinessModel, setSelectedBusinessModel] = useState<SelectOption | null>(null)
  const [selectedRevenue, setSelectedRevenue] = useState<SelectOption | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Update selected options for select fields
    if (name === "businessModel") {
      const option = businessModelOptions.find((opt) => opt.value === value)
      setSelectedBusinessModel(option || null)
    } else if (name === "revenue") {
      const option = revenueOptions.find((opt) => opt.value === value)
      setSelectedRevenue(option || null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Create submission data with display text for select fields
      const submissionData = {
        ...formData,
        businessModel: selectedBusinessModel?.label || formData.businessModel,
        revenue: selectedRevenue?.label || formData.revenue,
      }

      const response = await fetch("https://webhook.sofisticmidia.com/webhook/9423832a-9200-4e17-875c-4e4adc01aae5", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      })

      if (!response.ok) {
        throw new Error("Falha ao enviar o formulário. Por favor, tente novamente.")
      }

      // Redirect to thank you page
      router.push("/obrigado")
    } catch (err) {
      console.error("Error submitting form:", err)
      setError(err instanceof Error ? err.message : "Ocorreu um erro ao enviar o formulário")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto bg-[#121212] rounded-2xl border border-white/10 p-10 md:p-16 relative overflow-hidden">
      <div className="absolute top-6 right-6 pointer-events-none">
        <div className="w-8 h-8 rounded-full bg-green-500"></div>
      </div>

      <ScrollAnimation animation="fade-up" className="text-3xl md:text-4xl font-bold mb-10">
        Dar o <span className="text-green-400">próximo passo</span> leva menos de um minuto
      </ScrollAnimation>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <ScrollAnimation animation="fade-right" delay={100} className="space-y-12">
          <div className="flex items-start gap-4">
            <div className="bg-green-500 p-3 rounded-md flex-shrink-0 mt-1">
              <ClipboardList className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Passo 1 - Complete o formulário</h3>
              <p className="text-white/70">
                Envie suas informações de contato. Todos os seus dados estarão seguros, garantimos total segurança.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-green-500 p-3 rounded-md flex-shrink-0 mt-1">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Passo 2 - Receba uma ligação personalizada</h3>
              <p className="text-white/70">
                Em um prazo de até 8 horas, um de nossos especialistas fará uma ligação para agendar a reunião mais
                importante com você.
              </p>
            </div>
          </div>
        </ScrollAnimation>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <ScrollAnimation animation="fade-up" delay={100}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Seu nome"
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-md px-4 py-4 text-white placeholder:text-white/50 focus:outline-none focus:border-green-500"
                required
                disabled={isSubmitting}
              />
            </ScrollAnimation>

            <ScrollAnimation animation="fade-up" delay={150}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Seu melhor e-mail"
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-md px-4 py-4 text-white placeholder:text-white/50 focus:outline-none focus:border-green-500"
                required
                disabled={isSubmitting}
              />
            </ScrollAnimation>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <ScrollAnimation animation="fade-up" delay={200}>
              <input
                type="tel"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleInputChange}
                placeholder="Seu Whatsapp"
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-md px-4 py-4 text-white placeholder:text-white/50 focus:outline-none focus:border-green-500"
                required
                disabled={isSubmitting}
              />
            </ScrollAnimation>

            <ScrollAnimation animation="fade-up" delay={250}>
              <input
                type="text"
                name="instagram"
                value={formData.instagram}
                onChange={handleInputChange}
                placeholder="Instagram da empresa"
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-md px-4 py-4 text-white placeholder:text-white/50 focus:outline-none focus:border-green-500"
                disabled={isSubmitting}
              />
            </ScrollAnimation>
          </div>

          <ScrollAnimation animation="fade-up" delay={300} className="relative">
            <select
              name="businessModel"
              value={formData.businessModel}
              onChange={handleInputChange}
              className="w-full bg-[#1A1A1A] border border-white/10 rounded-md px-4 py-4 text-white appearance-none focus:outline-none focus:border-green-500"
              required
              disabled={isSubmitting}
            >
              <option value="" disabled>
                Qual é o seu modelo de negócio?
              </option>
              {businessModelOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 pointer-events-none w-5 h-5" />
          </ScrollAnimation>

          <ScrollAnimation animation="fade-up" delay={350} className="relative">
            <select
              name="revenue"
              value={formData.revenue}
              onChange={handleInputChange}
              className="w-full bg-[#1A1A1A] border border-white/10 rounded-md px-4 py-4 text-white appearance-none focus:outline-none focus:border-green-500"
              required
              disabled={isSubmitting}
            >
              <option value="" disabled>
                Qual é o seu faturamento mensal?
              </option>
              {revenueOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 pointer-events-none w-5 h-5" />
          </ScrollAnimation>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-md text-sm">{error}</div>
          )}

          <ScrollAnimation animation="fade-up" delay={400}>
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "w-full bg-green-600 hover:bg-green-700 text-white font-bold py-5 rounded-md transition-colors duration-300 mt-6",
                "uppercase tracking-wider text-base flex items-center justify-center",
                isSubmitting ? "opacity-70 cursor-not-allowed" : "",
              )}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Enviando...
                </>
              ) : (
                "Receber mais informações"
              )}
            </button>
          </ScrollAnimation>
        </form>
      </div>
    </div>
  )
}
