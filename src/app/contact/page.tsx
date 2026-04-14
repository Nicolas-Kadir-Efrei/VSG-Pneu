import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Phone, MapPin, Clock, Mail, Navigation } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Contact - VSG PNEUS | Adresse, Téléphone, Horaires',
  description: 'Contactez VSG PNEUS : 01 43 89 68 08, 192 Rue de Paris, 94190 Villeneuve-Saint-Georges. Horaires, itinéraire et informations pratiques.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-500 to-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Nous Contacter
            </h1>
            <p className="text-xl text-red-100 mb-8">
              Toutes les informations pour nous joindre et nous rendre visite
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Contact Details */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Phone className="h-6 w-6 text-red-500" />
                    Téléphone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <a 
                        href="tel:0143896808" 
                        className="text-3xl font-bold text-red-500 hover:text-red-600 transition-colors"
                      >
                        01 43 89 68 08
                      </a>
                      <p className="text-muted-foreground mt-2">
                        Appelez-nous pour toute urgence, prise de rendez-vous ou demande d'information
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Button size="lg" asChild>
                        <a href="tel:0143896808">
                          <Phone className="h-5 w-5 mr-2" />
                          Appeler maintenant
                        </a>
                      </Button>
                      <Button size="lg" variant="outline" asChild>
                        <Link href="/rendez-vous">Prendre RDV</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <MapPin className="h-6 w-6 text-red-500" />
                    Adresse
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xl font-semibold text-foreground">VSG PNEUS</p>
                      <p className="text-lg text-foreground">192 Rue de Paris</p>
                      <p className="text-lg text-foreground">94190 Villeneuve-Saint-Georges</p>
                    </div>
                    <div className="flex gap-3">
                      <Button size="lg" asChild>
                        <a 
                          href="https://maps.google.com/?q=192+Rue+de+Paris,+94190+Villeneuve-Saint-Georges" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <Navigation className="h-5 w-5 mr-2" />
                          Itinéraire GPS
                        </a>
                      </Button>
                      <Button size="lg" variant="outline" asChild>
                        <a 
                          href="https://waze.com/ul?q=192+Rue+de+Paris+Villeneuve-Saint-Georges" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          Waze
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map Placeholder */}
            <div>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Localisation</CardTitle>
                  <CardDescription>
                    Nous sommes situés sur la Rue de Paris, facilement accessible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <a
                    href="https://www.google.com/maps/place/Vsg+Pneus/@48.738991,2.4464866,514m/data=!3m1!1e3!4m15!1m8!3m7!1s0x47e60adf8a242f91:0x943a82df1af4104!2s94190+Villeneuve-Saint-Georges!3b1!8m2!3d48.7305769!4d2.447488!16zL20vMDQ4czQz!3m5!1s0x47e674d352ec3367:0x659d9a26cd39c1a9!8m2!3d48.7390273!4d2.4470169!16s%2Fg%2F1hc0wtmwl?entry=ttu&g_ep=EgoyMDI2MDQwOC4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block overflow-hidden rounded-lg border border-border"
                    aria-label="Ouvrir VSG PNEUS sur Google Maps"
                  >
                    <div className="relative h-80 w-full">
                      <Image
                        src="/vsg-pneus-devanture.png"
                        alt="Devanture du garage VSG PNEUS"
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        priority={false}
                      />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-white font-semibold leading-tight">VSG PNEUS</p>
                          <p className="text-white/80 text-sm truncate">192 Rue de Paris, 94190 Villeneuve‑Saint‑Georges</p>
                        </div>
                        <span className="shrink-0 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/20">
                          Voir sur Google Maps
                        </span>
                      </div>
                    </div>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Hours and Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Clock className="h-6 w-6 text-red-500" />
                  Horaires d'ouverture
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Lundi</span>
                    <span>9h00 - 18h00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Mardi</span>
                    <span>9h00 - 18h00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Mercredi</span>
                    <span>9h00 - 18h00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Jeudi</span>
                    <span>9h00 - 18h00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Vendredi</span>
                    <span>9h00 - 12h30 / 14h00 - 18h00</span>
                  </div>
                  <div className="flex justify-between items-center border-t pt-2">
                    <span className="font-medium">Samedi</span>
                    <span>9h00 - 18h00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Dimanche</span>
                    <span>10h00 - 17h00</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Informations pratiques</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium">Moyens de paiement :</span>
                    <p className="text-muted-foreground">CB, Espèces, Chèques</p>
                  </div>
                  <div>
                    <span className="font-medium">Stationnement :</span>
                    <p className="text-muted-foreground">Places disponibles devant le garage</p>
                  </div>
                  <div>
                    <span className="font-medium">Accès :</span>
                    <p className="text-muted-foreground">Proche RER D, bus 393</p>
                  </div>
                  <div>
                    <span className="font-medium">Services :</span>
                    <p className="text-muted-foreground">Montage et réparation</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Informations légales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Raison sociale :</span>
                    <p className="text-muted-foreground">KAER VSG PNEUS</p>
                  </div>
                  <div>
                    <span className="font-medium">SIREN :</span>
                    <p className="text-muted-foreground">810 919 258</p>
                  </div>
                  <div>
                    <span className="font-medium">Code APE :</span>
                    <p className="text-muted-foreground">45.20A</p>
                  </div>
                  <div>
                    <span className="font-medium">Capital social :</span>
                    <p className="text-muted-foreground">2 000 EUR</p>
                  </div>
                  <div>
                    <span className="font-medium">RCS :</span>
                    <p className="text-muted-foreground">Créteil</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Actions rapides
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choisissez l'action qui correspond le mieux à votre besoin
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🚨</div>
                <CardTitle className="text-lg">Urgence</CardTitle>
                <CardDescription>Crevaison, pneu dangereux</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-yellow-950" asChild>
                  <a href="tel:0143896808">Appeler maintenant</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">📅</div>
                <CardTitle className="text-lg">Rendez-vous</CardTitle>
                <CardDescription>Planifier une intervention</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" asChild>
                  <Link href="/rendez-vous">Réserver</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">💰</div>
                <CardTitle className="text-lg">Devis</CardTitle>
                <CardDescription>Estimation gratuite</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline" asChild>
                  <Link href="/devis">Demander</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🗺️</div>
                <CardTitle className="text-lg">Itinéraire</CardTitle>
                <CardDescription>Venir au garage</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline" asChild>
                  <a 
                    href="https://maps.google.com/?q=192+Rue+de+Paris,+94190+Villeneuve-Saint-Georges" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    GPS
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Emergency Notice */}
      <section className="py-12 bg-red-500/10 dark:bg-red-500/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-4">
              🚨 Service d'urgence disponible
            </h2>
            <p className="text-red-600 dark:text-red-300 text-lg mb-6">
              En cas de crevaison ou de problème urgent avec vos pneus, n'hésitez pas à nous appeler. 
              Nous faisons notre possible pour vous recevoir dans la journée selon nos disponibilités.
            </p>
            <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-yellow-950" asChild>
              <a href="tel:0143896808">
                <Phone className="h-5 w-5 mr-2" />
                01 43 89 68 08
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
