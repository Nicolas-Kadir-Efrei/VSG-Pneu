import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Phone, MapPin, Clock, MessageSquare } from 'lucide-react'

export default function ContactSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Contactez-nous
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Besoin d'un renseignement ou d'une intervention ? Nous sommes là pour vous aider.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Cards */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Phone className="h-6 w-6 text-orange-500" />
                  Urgence crevaison
                </CardTitle>
                <CardDescription>
                  Intervention rapide pour les situations d'urgence
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="lg" className="w-full bg-red-500 hover:bg-red-600" asChild>
                  <a href="tel:0143896808">
                    <Phone className="h-5 w-5 mr-2" />
                    Appeler maintenant
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <MessageSquare className="h-6 w-6 text-orange-500" />
                  Prendre rendez-vous
                </CardTitle>
                <CardDescription>
                  Planifiez votre intervention à l'avance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="lg" className="w-full" asChild>
                  <Link href="/rendez-vous">Réserver un créneau</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <MessageSquare className="h-6 w-6 text-orange-500" />
                  Demander un devis
                </CardTitle>
                <CardDescription>
                  Obtenez une estimation gratuite et personnalisée
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="lg" variant="outline" className="w-full" asChild>
                  <Link href="/devis">Devis gratuit</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info & Map */}
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Informations pratiques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Contact Details */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="font-medium">Téléphone</p>
                      <a href="tel:0143896808" className="text-orange-500 hover:underline">
                        01 43 89 68 08
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-orange-500 mt-1" />
                    <div>
                      <p className="font-medium">Adresse</p>
                      <p className="text-gray-600">192 Rue de Paris</p>
                      <p className="text-gray-600">94190 Villeneuve-Saint-Georges</p>
                      <Button variant="link" className="p-0 h-auto text-orange-500" asChild>
                        <a 
                          href="https://maps.google.com/?q=192+Rue+de+Paris,+94190+Villeneuve-Saint-Georges" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          Voir l'itinéraire
                        </a>
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-orange-500 mt-1" />
                    <div>
                      <p className="font-medium">Horaires</p>
                      <div className="text-gray-600 space-y-1">
                        <p>Lundi - Vendredi : 8h00 - 18h00</p>
                        <p>Samedi : 8h00 - 12h00</p>
                        <p>Dimanche : Fermé</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="h-12 w-12 mx-auto mb-2" />
                    <p>Carte interactive</p>
                    <p className="text-sm">192 Rue de Paris, VSG</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Special Notice */}
        <div className="mt-12 bg-orange-50 border border-orange-200 rounded-xl p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-orange-800 mb-2">
              🚨 Service d'urgence disponible
            </h3>
            <p className="text-orange-700">
              En cas de crevaison ou de problème urgent, appelez-nous directement. 
              Nous intervenons dans la journée selon disponibilité.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
