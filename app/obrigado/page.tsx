"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Rocket } from "lucide-react"

export default function ThankYouPage() {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-between py-10 px-4 text-center">
      <div className="w-full max-w-md">
        <Image
          src="/images/logo-transparent.png"
          alt="Sofistic Midia"
          width={220}
          height={70}
          className="h-14 w-auto mx-auto"
        />
      </div>

      <div className="flex flex-col items-center max-w-2xl">
        <div className="mb-6 relative">
          <Rocket className="w-16 h-16 text-green-400 animate-float" />
          <div className="absolute inset-0 bg-green-500/20 filter blur-xl rounded-full animate-pulse-slow opacity-50"></div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-primary">
          Obrigado por preencher nosso formulário!
        </h1>

        <p className="text-xl text-white/90 mb-8">Em até 20 minutos nossa equipe entrará em contato com você!</p>

        <Link
          href="/"
          className="bg-green-600 hover:bg-green-500 text-white py-3 px-8 rounded-md transition-all duration-300 font-medium"
        >
          Voltar para a página inicial
        </Link>
      </div>

      <div className="w-full max-w-2xl mt-20">
        <Image
          src="/images/logo-transparent.png"
          alt="Sofistic Midia"
          width={180}
          height={60}
          className="h-12 w-auto mx-auto mb-4"
        />

        <p className="text-sm text-white/50 mb-2">
          Copyright © {new Date().getFullYear()} – Sofistic Midia – Todos os direitos reservados.
        </p>

        <p className="text-xs text-white/40 max-w-lg mx-auto">
          Seus dados entregues para nossa equipe não serão usados para SPAM, todas as informações deixadas nesta página
          estão em segurança e você será contatado após o envio de seus dados por nossa equipe comercial.
        </p>
      </div>
    </div>
  )
}
