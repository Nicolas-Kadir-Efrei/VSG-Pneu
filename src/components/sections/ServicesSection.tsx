import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Wrench, Zap } from 'lucide-react'

export default function ServicesSection() {
  const services = [
    {
      icon: Wrench,
      title: "Montage de pneus",
      description: "Montage professionnel de tous types de pneus avec équilibrage inclus",
      price: "À partir de 15€",
      features: ["Démontage/remontage", "Équilibrage inclus", "Contrôle pression", "Valve neuve"]
    },
    {
      icon: Zap,
      title: "Réparation crevaison",
      description: "Réparation rapide et durable de vos crevaisons",
      price: "À partir de 15€",
      features: ["Diagnostic gratuit", "Réparation selon les normes", "Contrôle de sécurité"]
    },
    {
      icon: Wrench,
      title: "Entretien moteur",
      description: "Vidange huile moteur selon préconisations",
      price: "À partir de 99€",
      features: ["Vidange", "Remise à niveau", "Contrôle de sécurité"]
    }
  ]

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Nos Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Des prestations complètes pour l'entretien et la réparation de vos pneus
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-red-500/10 dark:bg-red-500/20 p-2 rounded-lg">
                      <Icon className="h-6 w-6 text-red-500" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                      {service.price && (
                        <div className="text-lg font-semibold text-red-500">
                          {service.price}
                        </div>
                      )}
                    </div>
                  </div>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Special Services */}
        <div className="bg-card rounded-xl p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
            Services spécialisés
          </h3>
          <p className="text-center text-sm text-muted-foreground mb-6 max-w-2xl mx-auto">
            <span className="font-semibold text-foreground">En option :</span> entretien et changement de freins (plaquettes, disques) sur demande — tarif sur devis.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🏃‍♂️</div>
              <h4 className="font-semibold text-foreground mb-2">Service Express</h4>
              <p className="text-muted-foreground text-sm">Intervention rapide pour les urgences</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🚐</div>
              <h4 className="font-semibold text-foreground mb-2">Véhicules utilitaires</h4>
              <p className="text-muted-foreground text-sm">Pneus pour camionnettes et utilitaires</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🔧</div>
              <h4 className="font-semibold text-foreground mb-2">J'ai déjà mes pneus</h4>
              <p className="text-muted-foreground text-sm">Montage de vos pneus achetés ailleurs</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Button size="lg" asChild>
            <Link href="/services">Voir tous nos services</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
