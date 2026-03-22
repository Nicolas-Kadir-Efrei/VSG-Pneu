import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, ExternalLink, Quote } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Avis Clients - VSG PNEUS | Témoignages et Évaluations',
  description: 'Découvrez les avis de nos clients sur VSG PNEUS. Note moyenne 9,4/10 sur 48 avis. Témoignages authentiques sur nos services pneus.',
}

export default function AvisPage() {
  const reviews = [
    {
      name: "Marie L.",
      rating: 5,
      date: "Il y a 2 semaines",
      comment: "Service rapide et professionnel. J'ai eu une crevaison un matin et ils m'ont dépannée dans l'après-midi. Prix correct et travail soigné. Je recommande !",
      service: "Réparation crevaison"
    },
    {
      name: "Pierre D.",
      rating: 5,
      date: "Il y a 1 mois",
      comment: "Excellent accueil, conseils avisés pour le choix de mes pneus hiver. Montage impeccable et tarifs transparents. Garage de confiance !",
      service: "Montage pneus hiver"
    },
    {
      name: "Sophie M.",
      rating: 4,
      date: "Il y a 1 mois",
      comment: "Très satisfaite du service. Équipe compétente et à l'écoute. Seul petit bémol : un peu d'attente mais le résultat est parfait.",
      service: "Équilibrage"
    },
    {
      name: "Ahmed K.",
      rating: 5,
      date: "Il y a 2 mois",
      comment: "J'avais acheté mes pneus en ligne, ils les ont montés sans problème au même tarif. Travail professionnel, je reviendrai !",
      service: "Montage pneus clients"
    },
    {
      name: "Catherine R.",
      rating: 5,
      date: "Il y a 2 mois",
      comment: "Garage familial où on se sent en confiance. Prix honnêtes, pas de mauvaises surprises. Ils ont réparé ma crevaison rapidement.",
      service: "Réparation"
    },
    {
      name: "Jean-Luc B.",
      rating: 4,
      date: "Il y a 3 mois",
      comment: "Bon service, équipe sympa. Ils m'ont bien conseillé pour mes pneus utilitaire. Rapport qualité-prix correct.",
      service: "Pneus utilitaire"
    }
  ]

  const stats = {
    averageRating: 9.4,
    totalReviews: 48,
    fiveStars: 42,
    fourStars: 5,
    threeStars: 1,
    twoStars: 0,
    oneStars: 0
  }

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-500 to-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Avis de nos Clients
            </h1>
            <p className="text-xl text-red-100 mb-8">
              Découvrez ce que pensent nos clients de nos services
            </p>
            <div className="bg-white/20 rounded-lg p-6 inline-block">
              <div className="flex items-center justify-center gap-2 mb-2">
                {renderStars(5)}
              </div>
              <div className="text-3xl font-bold">{stats.averageRating}/10</div>
              <div className="text-red-100">Basé sur {stats.totalReviews} avis</div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="mb-12">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Répartition des notes</CardTitle>
                <CardDescription>
                  Évaluations de nos clients sur la plateforme Allopneus
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { stars: 5, count: stats.fiveStars, percentage: (stats.fiveStars / stats.totalReviews) * 100 },
                    { stars: 4, count: stats.fourStars, percentage: (stats.fourStars / stats.totalReviews) * 100 },
                    { stars: 3, count: stats.threeStars, percentage: (stats.threeStars / stats.totalReviews) * 100 },
                    { stars: 2, count: stats.twoStars, percentage: (stats.twoStars / stats.totalReviews) * 100 },
                    { stars: 1, count: stats.oneStars, percentage: (stats.oneStars / stats.totalReviews) * 100 },
                  ].map((item) => (
                    <div key={item.stars} className="flex items-center gap-4">
                      <div className="flex items-center gap-1 w-20">
                        <span className="text-sm font-medium">{item.stars}</span>
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      </div>
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-12">{item.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {reviews.map((review, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{review.name}</CardTitle>
                        <CardDescription>{review.date}</CardDescription>
                      </div>
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Quote className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground font-medium">
                          {review.service}
                        </span>
                      </div>
                      <p className="text-foreground italic">"{review.comment}"</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* External Reviews */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Voir tous nos avis
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-500/10 dark:bg-blue-500/20 rounded-lg flex items-center justify-center">
                        🛞
                      </div>
                      Allopneus
                    </CardTitle>
                    <CardDescription>
                      Plateforme spécialisée pneus
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        {renderStars(5)}
                        <span className="font-semibold">9,4/10</span>
                      </div>
                      <p className="text-muted-foreground">48 avis vérifiés</p>
                      <Button className="w-full" variant="outline" asChild>
                        <a 
                          href="https://www.allopneus.com/montage-pneu/val-de-marne-94/villeneuve-saint-georges/vsg-pneus-9797" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Voir sur Allopneus
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-red-500/10 dark:bg-red-500/20 rounded-lg flex items-center justify-center">
                        📍
                      </div>
                      Google My Business
                    </CardTitle>
                    <CardDescription>
                      Avis clients locaux
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        {renderStars(5)}
                        <span className="font-semibold">4,8/5</span>
                      </div>
                      <p className="text-muted-foreground">Avis Google</p>
                      <Button className="w-full" variant="outline" asChild>
                        <a 
                          href="https://maps.google.com/?q=VSG+PNEUS+Villeneuve-Saint-Georges" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Voir sur Google
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leave Review CTA */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Vous êtes client ?
            </h2>
            <p className="text-muted-foreground mb-8">
              Votre avis nous aide à améliorer nos services et guide les futurs clients
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/rendez-vous">Prendre rendez-vous</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:0143896808">Nous contacter</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-card rounded-lg p-6">
                <div className="text-3xl font-bold text-red-500 mb-2">10+</div>
                <div className="text-muted-foreground">Années d'expérience</div>
              </div>
              <div className="bg-card rounded-lg p-6">
                <div className="text-3xl font-bold text-red-500 mb-2">1000+</div>
                <div className="text-muted-foreground">Clients satisfaits</div>
              </div>
              <div className="bg-card rounded-lg p-6">
                <div className="text-3xl font-bold text-red-500 mb-2">95%</div>
                <div className="text-muted-foreground">Clients qui recommandent</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
