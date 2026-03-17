import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Phone, MapPin, Clock, Star } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div>
            <div className="mb-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                VSG PNEUS
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Votre spécialiste pneus à Villeneuve-Saint-Georges
              </p>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-900">9,4/10</span>
                <span className="text-gray-600">(48 avis)</span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-orange-500" />
                <a 
                  href="tel:0143896808" 
                  className="text-lg font-semibold text-gray-900 hover:text-orange-500 transition-colors"
                >
                  01 43 89 68 08
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-orange-500 mt-1" />
                <div>
                  <p className="text-gray-900 font-medium">192 Rue de Paris</p>
                  <p className="text-gray-600">94190 Villeneuve-Saint-Georges</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-orange-500" />
                <span className="text-gray-900">Lun-Ven: 8h-18h • Sam: 8h-12h</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="bg-orange-500 hover:bg-orange-600">
                <Link href="tel:0143896808">
                  <Phone className="h-5 w-5 mr-2" />
                  Appeler maintenant
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/rendez-vous">Prendre rendez-vous</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a 
                  href="https://maps.google.com/?q=192+Rue+de+Paris,+94190+Villeneuve-Saint-Georges" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <MapPin className="h-5 w-5 mr-2" />
                  Itinéraire
                </a>
              </Button>
            </div>
          </div>

          {/* Right Column - Image/Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-white">
              <div className="text-center">
                <div className="text-6xl font-bold mb-2">🚗</div>
                <h3 className="text-2xl font-bold mb-4">Service Express</h3>
                <p className="text-orange-100 mb-6">
                  Montage, réparation et équilibrage de pneus
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white/20 rounded-lg p-3">
                    <div className="font-semibold">Montage</div>
                    <div className="text-orange-100">À partir de 15€</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3">
                    <div className="font-semibold">Réparation</div>
                    <div className="text-orange-100">À partir de 20€</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
