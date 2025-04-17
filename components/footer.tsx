"use client"

import { Instagram } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ScrollAnimation from "@/components/scroll-animation"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <ScrollAnimation animation="fade-up" delay={100} className="space-y-4">
            <Image
              src="/images/logo-transparent.png"
              alt="Sofistic Midia"
              width={220}
              height={70}
              className="h-14 w-auto"
            />
            <div className="mt-4 text-white/70 text-sm space-y-1">
              <p>Sofistic Midia Negocios Digitais LTDA</p>
              <p>CNPJ: 549486650001-50</p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="fade-up" delay={200}>
            <h3 className="text-lg font-semibold mb-6 text-green-400">SITE</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#serviços" className="text-white/70 hover:text-white transition-colors">
                  Serviços
                </Link>
              </li>
              <li>
                <Link href="#resultados" className="text-white/70 hover:text-white transition-colors">
                  Resultados
                </Link>
              </li>
              <li>
                <Link href="#processo" className="text-white/70 hover:text-white transition-colors">
                  Como Trabalhamos
                </Link>
              </li>
              <li>
                <Link href="#conquistas" className="text-white/70 hover:text-white transition-colors">
                  Conquistas
                </Link>
              </li>
              <li>
                <Link href="#contato" className="text-white/70 hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </ScrollAnimation>

          <ScrollAnimation animation="fade-up" delay={300}>
            <h3 className="text-lg font-semibold mb-6 text-green-400">SOCIAIS</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="https://www.instagram.com/sofisticmidia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                  <span>@sofisticmidia</span>
                </Link>
              </li>
            </ul>
          </ScrollAnimation>
        </div>

        <ScrollAnimation
          animation="fade-up"
          delay={400}
          className="mt-12 pt-6 border-t border-white/10 text-center text-white/50 text-sm"
        >
          <p>Sofistic Midia © | {currentYear} | Todos os Direitos Reservados.</p>
        </ScrollAnimation>
      </div>
    </footer>
  )
}
