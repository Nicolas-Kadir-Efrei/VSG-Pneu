'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Phone, MapPin, Menu, X } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-[#313334] shadow-sm border-b border-zinc-700">
      {/* Top bar with contact info */}
      <div className="bg-red-500 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <a href="tel:0143896808" className="hover:underline">
                01 43 89 68 08
              </a>
            </div>
            <div className="hidden md:flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>192 Rue de Paris, 94190 Villeneuve-Saint-Georges</span>
            </div>
          </div>
          <div className="text-sm font-medium">
            Note: 9,4/10 sur 48 avis
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center" aria-label="Accueil VSG PNEUS">
            <Image
              src="/logo.png"
              alt="Logo VSG PNEUS"
              width={300}
              height={100}
              className="h-40 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-red-400 transition-colors">
              Accueil
            </Link>
            <Link href="/services" className="text-white hover:text-red-400 transition-colors">
              Services
            </Link>
            <Link href="/tarifs" className="text-white hover:text-red-400 transition-colors">
              Tarifs
            </Link>
            <Link href="/avis" className="text-white hover:text-red-400 transition-colors">
              Avis
            </Link>
            <Link href="/contact" className="text-white hover:text-red-400 transition-colors">
              Contact
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-[#313334]" asChild>
              <Link href="/rendez-vous">Prendre RDV</Link>
            </Button>
            <Button asChild>
              <Link href="/devis">Devis gratuit</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-zinc-700">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-white hover:text-red-400 transition-colors">
                Accueil
              </Link>
              <Link href="/services" className="text-white hover:text-red-400 transition-colors">
                Services
              </Link>
              <Link href="/tarifs" className="text-white hover:text-red-400 transition-colors">
                Tarifs
              </Link>
              <Link href="/avis" className="text-white hover:text-red-400 transition-colors">
                Avis
              </Link>
              <Link href="/contact" className="text-white hover:text-red-400 transition-colors">
                Contact
              </Link>
              <div className="flex flex-col gap-3 pt-4">
                <ThemeToggle />
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-[#313334]" asChild>
                  <Link href="/rendez-vous">Prendre RDV</Link>
                </Button>
                <Button asChild>
                  <Link href="/devis">Devis gratuit</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
