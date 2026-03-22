import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, Info } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Tarifs - VSG PNEUS | Prix transparents pour tous services pneus',
  description: 'Découvrez nos tarifs TTC transparents : montage pneu dès 15€, réparation crevaison dès 20€, équilibrage dès 10€. Devis gratuit.',
}

export default function TarifsPage() {
  const pricingData = [
    {
      category: "Voiture",
      description: "Véhicules légers (jusqu'à 16\")",
      services: [
        { name: "Montage pneu", price: "15€", details: "Démontage + montage + équilibrage + valve" },
        { name: "Équilibrage seul", price: "10€", details: "Équilibrage précis avec poids de qualité" },
        { name: "Réparation crevaison", price: "20€", details: "Réparation champignon + test étanchéité" },
        { name: "Permutation (4 roues)", price: "25€", details: "Rotation complète + contrôle pression" },
        { name: "Valve TPMS", price: "+15€", details: "Valve capteur de pression" },
      ]
    },
    {
      category: "SUV / 4x4",
      description: "Véhicules tout-terrain (16\" à 18\")",
      services: [
        { name: "Montage pneu", price: "18€", details: "Démontage + montage + équilibrage + valve" },
        { name: "Équilibrage seul", price: "12€", details: "Équilibrage précis avec poids de qualité" },
        { name: "Réparation crevaison", price: "25€", details: "Réparation champignon + test étanchéité" },
        { name: "Permutation (4 roues)", price: "30€", details: "Rotation complète + contrôle pression" },
        { name: "Valve TPMS", price: "+15€", details: "Valve capteur de pression" },
      ]
    },
    {
      category: "Utilitaire",
      description: "Camionnettes légères et utilitaires",
      services: [
        { name: "Montage pneu", price: "22€", details: "Démontage + montage + équilibrage + valve" },
        { name: "Équilibrage seul", price: "15€", details: "Équilibrage précis avec poids de qualité" },
        { name: "Réparation crevaison", price: "30€", details: "Réparation champignon + test étanchéité" },
        { name: "Permutation (4 roues)", price: "35€", details: "Rotation complète + contrôle pression" },
        { name: "Valve TPMS", price: "+15€", details: "Valve capteur de pression" },
      ]
    }
  ]

  const supplements = [
    { name: "Pneus Run-flat", price: "+5€", description: "Supplément pour pneus roulage à plat" },
    { name: "Jantes alliage", price: "+3€", description: "Supplément pour jantes en alliage" },
    { name: "Diamètre > 18\"", price: "Sur devis", description: "Tarif personnalisé selon dimensions" },
    { name: "Pneus hiver/été", price: "Même tarif", description: "Aucun supplément selon saison" },
  ]

  const includedServices = [
    "Contrôle gratuit de l'état des pneus",
    "Vérification et ajustement de la pression",
    "Nettoyage des jantes",
    "Serrage au couple recommandé",
    "Conseils d'entretien personnalisés",
    "Garantie sur la prestation"
  ]

  return (
    <div className="min-h-screen bg-gray-50 text-foreground dark:bg-black dark:text-zinc-100 dark:[&_[data-slot=card]]:bg-zinc-900 dark:[&_[data-slot=card]]:text-zinc-100 dark:[&_[data-slot=card]]:ring-zinc-700/60">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-500 to-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Tarifs Transparents
            </h1>
            <p className="text-xl text-red-100 mb-8">
              Prix TTC affichés clairement, sans surprise. Devis gratuit sur demande pour toute prestation.
            </p>
            <div className="bg-white/20 rounded-lg p-4 inline-block dark:bg-black/30 dark:border dark:border-zinc-700">
              <p className="text-lg font-semibold">📞 01 43 89 68 08</p>
              <p className="text-red-100">Devis gratuit par téléphone</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Pricing Tables */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {pricingData.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center bg-gray-50 dark:bg-zinc-950">
                  <CardTitle className="text-2xl text-gray-900 dark:text-zinc-100">{category.category}</CardTitle>
                  <CardDescription className="text-base">{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {category.services.map((service, serviceIndex) => (
                      <div key={serviceIndex} className="border-b border-gray-100 dark:border-zinc-700 pb-3 last:border-b-0">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-medium text-gray-900 dark:text-zinc-100">{service.name}</span>
                          <span className="font-bold text-red-500 text-lg">
                            {service.price.includes('+') ? service.price : `À partir de ${service.price}`}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-zinc-400">{service.details}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Supplements and Included Services */}
      <section className="py-16 bg-white dark:bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Supplements */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-zinc-100 mb-6">
                Suppléments éventuels
              </h2>
              <div className="space-y-4">
                {supplements.map((supplement, index) => (
                  <div key={index} className="flex justify-between items-start p-4 bg-gray-50 dark:bg-zinc-900 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-zinc-100">{supplement.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-zinc-400">{supplement.description}</p>
                    </div>
                    <span className="font-semibold text-red-500 ml-4">{supplement.price}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">Information importante</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Tous nos tarifs sont TTC. Un devis détaillé vous sera remis avant toute intervention.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Included Services */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-zinc-100 mb-6">
                Inclus dans nos prestations
              </h2>
              <div className="space-y-3">
                {includedServices.map((service, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-zinc-300">{service}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-3">Garanties</h3>
                <ul className="space-y-2 text-sm text-green-700">
                  <li>• Réparation crevaison : 6 mois</li>
                  <li>• Équilibrage : 1 mois</li>
                  <li>• Montage : Garanti contre défaut de pose</li>
                  <li>• Satisfaction client : Notre priorité</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-16 bg-gray-50 dark:bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-zinc-100 mb-4">
              Offres spéciales
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-xl text-red-800">🚨 Service Urgence</CardTitle>
                <CardDescription>Pour les situations d'urgence</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-zinc-300 mb-4">
                  En cas de crevaison ou problème urgent, nous faisons notre possible pour vous recevoir dans la journée.
                </p>
                <p className="text-sm text-red-700 font-medium">
                  Même tarif - Pas de supplément urgence
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-xl text-blue-800">🔧 J'ai déjà mes pneus</CardTitle>
                <CardDescription>Montage de vos pneus achetés ailleurs</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-zinc-300 mb-4">
                  Vous avez acheté vos pneus en ligne ou ailleurs ? Nous les montons au même tarif avec la même qualité.
                </p>
                <p className="text-sm text-blue-700 font-medium">
                  Même prix - Même garantie
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white dark:bg-zinc-950">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-zinc-100 mb-4">
            Besoin d'un devis personnalisé ?
          </h2>
          <p className="text-gray-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto">
            Contactez-nous pour obtenir un devis gratuit et personnalisé selon vos besoins
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/devis">Demander un devis gratuit</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="tel:0143896808">📞 01 43 89 68 08</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/rendez-vous">Prendre rendez-vous</Link>
            </Button>
          </div>
          <p className="text-sm text-gray-500 dark:text-zinc-500 mt-6">
            * Tarifs TTC valables pour véhicules standards. Devis personnalisé gratuit pour cas particuliers.
          </p>
        </div>
      </section>
    </div>
  )
}
