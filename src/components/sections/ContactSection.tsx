import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Phone, MapPin, Clock, MessageSquare } from 'lucide-react'
import Image from 'next/image'

export default function ContactSection() {
  const googleMapsUrl =
    'https://www.google.com/maps/place/Vsg+Pneus/@48.738991,2.4464866,514m/data=!3m1!1e3!4m15!1m8!3m7!1s0x47e60adf8a242f91:0x943a82df1af4104!2s94190+Villeneuve-Saint-Georges!3b1!8m2!3d48.7305769!4d2.447488!16zL20vMDQ4czQz!3m5!1s0x47e674d352ec3367:0x659d9a26cd39c1a9!8m2!3d48.7390273!4d2.4470169!16s%2Fg%2F1hc0wtmwl?entry=ttu&g_ep=EgoyMDI2MDQwOC4wIKXMDSoASAFQAw%3D%3D'

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Contactez-nous
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Besoin d'un renseignement ou d'une intervention ? Nous sommes là pour vous aider.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Cards */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Phone className="h-6 w-6 text-red-500" />
                  Urgence crevaison
                </CardTitle>
                <CardDescription>
                  Intervention rapide pour les situations d'urgence
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="lg" className="w-full bg-yellow-400 hover:bg-yellow-500 text-yellow-950" asChild>
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
                  <MessageSquare className="h-6 w-6 text-red-500" />
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
                  <MessageSquare className="h-6 w-6 text-red-500" />
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
                    <Phone className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="font-medium">Téléphone</p>
                      <a href="tel:0143896808" className="text-red-500 hover:underline">
                        01 43 89 68 08
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-red-500 mt-1" />
                    <div>
                      <p className="font-medium">Adresse</p>
                      <p className="text-muted-foreground">192 Rue de Paris</p>
                      <p className="text-muted-foreground">94190 Villeneuve-Saint-Georges</p>
                      <Button variant="link" className="p-0 h-auto text-red-500" asChild>
                        <a 
                          href={googleMapsUrl}
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          Voir l'itinéraire
                        </a>
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-red-500 mt-1" />
                    <div>
                      <p className="font-medium">Horaires</p>
                      <div className="text-muted-foreground space-y-1">
                        <p>Lundi - Jeudi : 9h00 - 18h00</p>
                        <p>Vendredi : 9h00 - 12h30 / 14h00 - 18h00</p>
                        <p>Samedi : 9h00 - 18h00</p>
                        <p>Dimanche : 10h00 - 17h00</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map preview */}
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block overflow-hidden rounded-lg border border-border"
                  aria-label="Ouvrir VSG PNEUS sur Google Maps"
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src="/vsg-pneus-devanture.png"
                      alt="Devanture du garage VSG PNEUS"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      priority={false}
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-white text-sm font-semibold leading-tight">VSG PNEUS</p>
                        <p className="text-white/80 text-xs truncate">Voir sur Google Maps</p>
                      </div>
                      <span className="shrink-0 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white ring-1 ring-white/20">
                        Ouvrir
                      </span>
                    </div>
                  </div>
                </a>

                <Button size="sm" variant="outline" className="w-full" asChild>
                  <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                    Voir sur Google Maps
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Special Notice */}
        <div className="mt-12 bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              🚨 Service d'urgence disponible
            </h3>
            <p className="text-red-700">
              En cas de crevaison ou de problème urgent, appelez-nous directement. 
              Nous intervenons dans la journée selon disponibilité.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
