import { Shield, Clock, Award, Users } from 'lucide-react'

export default function TrustSection() {
  const trustPoints = [
    {
      icon: Shield,
      title: "Partenaire Allopneus",
      description: "Depuis décembre 2012"
    },
    {
      icon: Award,
      title: "Note excellente",
      description: "9,4/10 sur 48 avis clients"
    },
    {
      icon: Clock,
      title: "Service rapide",
      description: "Intervention dans la journée"
    },
    {
      icon: Users,
      title: "Équipe experte",
      description: "Professionnels qualifiés"
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Pourquoi choisir VSG PNEUS ?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Plus de 10 ans d'expérience au service des automobilistes de Villeneuve-Saint-Georges
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustPoints.map((point, index) => {
            const Icon = point.icon
            return (
              <div key={index} className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {point.title}
                </h3>
                <p className="text-gray-600">
                  {point.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
