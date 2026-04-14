import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Check } from 'lucide-react'

export default function PricingPreview() {
  const pricingCategories = [
    {
      title: "Voiture",
      description: "Véhicules légers",
      services: [
        { name: "Montage pneu (équilibrage inclus)", price: "15€" },
        { name: "Réparation crevaison", price: "15€" }
      ]
    },
    {
      title: "SUV / 4x4",
      description: "Véhicules tout-terrain",
      services: [
        { name: "Montage pneu (équilibrage inclus)", price: "15€" },
        { name: "Réparation crevaison", price: "15€" }
      ]
    },
    {
      title: "Utilitaire",
      description: "Camionnettes",
      services: [
        { name: "Montage pneu", price: "20€" },
        { name: "Réparation crevaison", price: "15€" }
      ]
    }
  ]

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Tarifs transparents
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Prix TTC affichés clairement, sans surprise. Devis gratuit sur demande.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {pricingCategories.map((category, index) => (
            <Card key={index} className="relative hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{category.title}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {category.services.map((service, serviceIndex) => (
                    <div key={serviceIndex} className="flex justify-between items-center">
                      <span className="text-muted-foreground">{service.name}</span>
                      <span className="font-semibold text-red-500">
                        À partir de {service.price}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="bg-muted rounded-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">
                Inclus dans nos prestations
              </h3>
              <div className="space-y-2">
                {[
                  "Contrôle gratuit de l'état des pneus",
                  "Vérification de la pression",
                  "Conseils d'entretien personnalisés"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">
                Suppléments éventuels
              </h3>
              <div className="space-y-2 text-muted-foreground">
                <p>• Valve TPMS : +15€</p>
                <p>• Pneus Run-flat : +5€</p>
                <p>• Diamètre &gt; 18&quot; : sur devis</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/tarifs">Voir tous les tarifs</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/devis">Demander un devis</Link>
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            * Tarifs TTC valables pour véhicules standards. Devis personnalisé gratuit.
          </p>
        </div>
      </div>
    </section>
  )
}
