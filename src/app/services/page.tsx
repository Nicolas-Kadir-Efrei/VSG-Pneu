import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Wrench, Zap, Clock, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Services - VSG PNEUS | Montage et réparation de pneus',
  description:
    'Découvrez nos services : montage de pneus et réparation crevaison. Intervention rapide à Villeneuve-Saint-Georges.',
}

export default function ServicesPage() {
  const services = [
    {
      icon: Wrench,
      title: "Montage de pneus",
      description: "Montage professionnel de tous types de pneus avec équilibrage inclus",
      price: "À partir de 15€",
      duration: "30-45 min",
      features: [
        "Démontage de l'ancien pneu",
        "Montage du pneu neuf",
        "Équilibrage inclus",
        "Contrôle de la pression",
        "Valve neuve si nécessaire"
      ],
      details: "Nous montons tous types de pneus : été, hiver, 4 saisons, Run-flat. Notre équipement moderne garantit un montage dans les règles de l'art."
    },
    {
      icon: Zap,
      title: "Réparation crevaison",
      description: "Réparation rapide et durable de vos crevaisons selon les normes de sécurité",
      price: "À partir de 15€",
      duration: "20-30 min",
      features: [
        "Diagnostic gratuit",
        "Localisation précise du dommage",
        "Réparation selon les normes de sécurité",
        "Contrôle de sécurité",
      ],
      details: "Réparation possible uniquement sur la bande de roulement, selon les normes européennes. Diagnostic gratuit pour évaluer la faisabilité."
    },
    {
      icon: Wrench,
      title: "Entretien moteur",
      description: "Vidange + huile moteur selon les préconisations",
      price: "À partir de 99€",
      duration: "Sur rendez-vous",
      features: [
        "Vidange huile moteur",
        "Remise à niveau",
        "Contrôle de sécurité"
      ],
      details: "Entretien moteur (vidange) avec huile adaptée à votre véhicule. Prix variable selon modèle et type d'huile."
    }
  ]

  const specialServices = [
    {
      title: "Option — Freins",
      description: "Entretien et changement de freins (plaquettes, disques) sur demande, sans prix affiché",
      icon: "🛑",
      features: ["Sur rendez-vous", "Devis personnalisé", "Selon préconisations constructeur"]
    },
    {
      title: "Service Express Urgence",
      description: "Intervention rapide pour les situations d'urgence",
      icon: "🚨",
      features: ["Disponible dans la journée", "Priorité aux urgences", "Diagnostic immédiat"]
    },
    {
      title: "Véhicules Utilitaires",
      description: "Pneus pour camionnettes et véhicules utilitaires légers",
      icon: "🚐",
      features: ["Pneus renforcés", "Montage spécialisé", "Conseils charge"]
    },
    {
      title: "J'ai déjà mes pneus",
      description: "Montage de vos pneus achetés ailleurs",
      icon: "🔧",
      features: ["Même tarif", "Même qualité", "Garantie montage"]
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-500 to-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Nos Services Pneus
            </h1>
            <p className="text-xl text-red-100 mb-8">
              Des prestations complètes pour l'entretien et la réparation de vos pneus, 
              réalisées par des professionnels qualifiés
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <a href="tel:0143896808">Appeler pour urgence</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-red-600 border-white hover:bg-zinc-100 hover:text-red-700 dark:bg-black dark:text-white dark:border-black dark:hover:bg-zinc-900"
                asChild
              >
                <Link href="/rendez-vous">Prendre rendez-vous</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="bg-red-500/10 dark:bg-red-500/20 p-3 rounded-lg">
                        <Icon className="h-8 w-8 text-red-500" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                        <CardDescription className="text-base mb-3">
                          {service.description}
                        </CardDescription>
                        <div className="flex gap-4 text-sm">
                          {service.price && (
                            <span className="bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400 px-3 py-1 rounded-full font-medium">
                              {service.price}
                            </span>
                          )}
                          {service.duration && (
                            <span className="bg-muted text-muted-foreground px-3 py-1 rounded-full font-medium flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {service.duration}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{service.details}</p>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground">Prestations incluses :</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Special Services */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Services spécialisés
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Des solutions adaptées à vos besoins spécifiques
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {specialServices.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Besoin d'une intervention ?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contactez-nous pour un devis gratuit ou prenez rendez-vous directement en ligne
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/devis">Demander un devis</Link>
            </Button>
            <Button
              size="lg"
              className="bg-white text-red-600 hover:bg-zinc-100 hover:text-red-700 dark:bg-black dark:text-white dark:hover:bg-zinc-900"
              asChild
            >
              <Link href="/rendez-vous">Prendre rendez-vous</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="tel:0143896808">01 43 89 68 08</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
