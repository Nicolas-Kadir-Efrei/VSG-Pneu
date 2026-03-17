'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Phone, MapPin, Menu, X } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b">
      {/* Top bar with contact info */}
      <div className="bg-orange-500 text-white py-2">
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
          <Link href="/" className="text-2xl font-bold text-gray-900">
            VSG PNEUS
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-orange-500 transition-colors">
              Accueil
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-orange-500 transition-colors">
              Services
            </Link>
            <Link href="/tarifs" className="text-gray-700 hover:text-orange-500 transition-colors">
              Tarifs
            </Link>
            <Link href="/avis" className="text-gray-700 hover:text-orange-500 transition-colors">
              Avis
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-orange-500 transition-colors">
              Contact
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" asChild>
              <Link href="/rendez-vous">Prendre RDV</Link>
            </Button>
            <Button asChild>
              <Link href="/devis">Devis gratuit</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-orange-500 transition-colors">
                Accueil
              </Link>
              <Link href="/services" className="text-gray-700 hover:text-orange-500 transition-colors">
                Services
              </Link>
              <Link href="/tarifs" className="text-gray-700 hover:text-orange-500 transition-colors">
                Tarifs
              </Link>
              <Link href="/avis" className="text-gray-700 hover:text-orange-500 transition-colors">
                Avis
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-orange-500 transition-colors">
                Contact
              </Link>
              <div className="flex flex-col gap-3 pt-4">
                <Button variant="outline" asChild>
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
