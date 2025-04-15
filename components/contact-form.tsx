"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, ClipboardList, Phone } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    instagram: "",
    businessModel: "",
    revenue: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    // Here you would typically send the data to your backend
    alert("Formulário enviado com sucesso! Entraremos em contato em breve.")
  }

  return (
    <div className="w-full max-w-6xl mx-auto bg-[#121212] rounded-2xl border border-white/10 p-10 md:p-16 relative overflow-hidden">
      {/* Decorative circle - keeping only the circle, removing the path */}
      <div className="absolute top-6 right-6 pointer-events-none">
        <div className="w-8 h-8 rounded-full bg-green-500"></div>
      </div>

      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold mb-10">
        Dar o <span className="text-green-400">próximo passo</span> leva menos de um minuto
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left side - Steps */}
        <div className="space-y-12">
          {/* Step 1 */}
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

          {/* Step 2 */}
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
        </div>

        {/* Right side - Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Name */}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Seu nome"
              className="w-full bg-[#1A1A1A] border border-white/10 rounded-md px-4 py-4 text-white placeholder:text-white/50 focus:outline-none focus:border-green-500"
              required
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Seu melhor e-mail"
              className="w-full bg-[#1A1A1A] border border-white/10 rounded-md px-4 py-4 text-white placeholder:text-white/50 focus:outline-none focus:border-green-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* WhatsApp */}
            <input
              type="tel"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleInputChange}
              placeholder="Seu Whatsapp"
              className="w-full bg-[#1A1A1A] border border-white/10 rounded-md px-4 py-4 text-white placeholder:text-white/50 focus:outline-none focus:border-green-500"
              required
            />

            {/* Instagram */}
            <input
              type="text"
              name="instagram"
              value={formData.instagram}
              onChange={handleInputChange}
              placeholder="Instagram da empresa"
              className="w-full bg-[#1A1A1A] border border-white/10 rounded-md px-4 py-4 text-white placeholder:text-white/50 focus:outline-none focus:border-green-500"
            />
          </div>

          {/* Business Model - Updated with exact options from the image */}
          <div className="relative">
            <select
              name="businessModel"
              value={formData.businessModel}
              onChange={handleInputChange}
              className="w-full bg-[#1A1A1A] border border-white/10 rounded-md px-4 py-4 text-white appearance-none focus:outline-none focus:border-green-500"
              required
            >
              <option value="" disabled>
                Qual é o seu modelo de negócio?
              </option>
              <option value="servicos">Serviços</option>
              <option value="varejo-comercio">Varejo / Comércio</option>
              <option value="e-commerce">E-commerce</option>
              <option value="alimentacao-food-service">Alimentação / Food Service</option>
              <option value="educacao">Educação</option>
              <option value="imobiliario-construcao">Imobiliário / Construção</option>
              <option value="saude-estetica">Saúde / Estética</option>
              <option value="tecnologia-startups">Tecnologia / Startups (inclui SaaS)</option>
              <option value="financas-contabilidade">Finanças / Contabilidade</option>
              <option value="energia-sustentabilidade">Energia / Sustentabilidade</option>
              <option value="turismo-hotelaria">Turismo / Hotelaria</option>
              <option value="agro-rural">Agro / Rural</option>
              <option value="transporte-logistica">Transporte / Logística</option>
              <option value="ong-terceiro-setor">ONG / Terceiro Setor</option>
              <option value="outro">Outro</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 pointer-events-none w-5 h-5" />
          </div>

          {/* Revenue - Updated with exact options from the image */}
          <div className="relative">
            <select
              name="revenue"
              value={formData.revenue}
              onChange={handleInputChange}
              className="w-full bg-[#1A1A1A] border border-white/10 rounded-md px-4 py-4 text-white appearance-none focus:outline-none focus:border-green-500"
              required
            >
              <option value="" disabled>
                Qual é o seu faturamento mensal?
              </option>
              <option value="ate-10-mil">Até 10 mil</option>
              <option value="11-20-mil">De 11 mil até 20 mil</option>
              <option value="21-30-mil">De 21 mil até 30 mil</option>
              <option value="31-50-mil">De 31 mil até 50 mil</option>
              <option value="51-80-mil">De 51 mil até 80 mil</option>
              <option value="81-150-mil">De 81 mil até 150 mil</option>
              <option value="151-300-mil">De 151 mil até 300 mil</option>
              <option value="acima-500-mil">Acima de 500 mil</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 pointer-events-none w-5 h-5" />
          </div>

          {/* Submit Button - Changed to darker green with black text */}
          <button
            type="submit"
            className={cn(
              "w-full bg-green-600 hover:bg-green-700 text-black font-bold py-5 rounded-md transition-colors duration-300 mt-6",
              "uppercase tracking-wider text-base",
            )}
          >
            Receber mais informações
          </button>
        </form>
      </div>
    </div>
  )
}
