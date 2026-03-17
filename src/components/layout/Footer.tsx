import Link from 'next/link'
import { Phone, MapPin, Clock, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">VSG PNEUS</h3>
            <p className="text-gray-300 mb-4">
              Votre spécialiste pneus à Villeneuve-Saint-Georges depuis 2012.
              Service professionnel et tarifs transparents.
            </p>
            <div className="text-sm text-gray-400">
              <p>KAER VSG PNEUS</p>
              <p>SIREN: 810 919 258</p>
              <p>Capital social: 2 000 EUR</p>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-orange-500" />
                <a href="tel:0143896808" className="hover:text-orange-500 transition-colors">
                  01 43 89 68 08
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-orange-500 mt-1" />
                <div>
                  <p>192 Rue de Paris</p>
                  <p>94190 Villeneuve-Saint-Georges</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-500" />
                <span>Lun-Ven: 8h-18h, Sam: 8h-12h</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Nos Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/services/montage" className="hover:text-orange-500 transition-colors">
                  Montage de pneus
                </Link>
              </li>
              <li>
                <Link href="/services/reparation" className="hover:text-orange-500 transition-colors">
                  Réparation crevaison
                </Link>
              </li>
              <li>
                <Link href="/services/equilibrage" className="hover:text-orange-500 transition-colors">
                  Équilibrage
                </Link>
              </li>
              <li>
                <Link href="/services/permutation" className="hover:text-orange-500 transition-colors">
                  Permutation
                </Link>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens utiles</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/rendez-vous" className="hover:text-orange-500 transition-colors">
                  Prendre rendez-vous
                </Link>
              </li>
              <li>
                <Link href="/devis" className="hover:text-orange-500 transition-colors">
                  Demander un devis
                </Link>
              </li>
              <li>
                <Link href="/avis" className="hover:text-orange-500 transition-colors">
                  Avis clients
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-orange-500 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            © 2024 VSG PNEUS. Tous droits réservés.
          </div>
          <div className="flex gap-6 text-sm text-gray-400 mt-4 md:mt-0">
            <Link href="/mentions-legales" className="hover:text-orange-500 transition-colors">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="hover:text-orange-500 transition-colors">
              Confidentialité
            </Link>
            <Link href="/cookies" className="hover:text-orange-500 transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
