import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Users, FileText, AlertTriangle, Clock, CheckCircle } from 'lucide-react'

interface DashboardStatsProps {
  stats: {
    totalAppointments: number
    pendingAppointments: number
    totalQuotes: number
    pendingQuotes: number
    todayAppointments: number
    urgentRequests: number
  }
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  const statCards = [
    {
      title: "Rendez-vous aujourd'hui",
      value: stats.todayAppointments,
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "RDV en attente",
      value: stats.pendingAppointments,
      icon: Clock,
      color: "text-red-600",
      bgColor: "bg-red-100"
    },
    {
      title: "Devis en attente",
      value: stats.pendingQuotes,
      icon: FileText,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Demandes urgentes",
      value: stats.urgentRequests,
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-100"
    },
    {
      title: "Total RDV",
      value: stats.totalAppointments,
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Total Devis",
      value: stats.totalQuotes,
      icon: CheckCircle,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {statCards.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.value > 0 ? (
                <Badge 
                  variant={stat.value > 5 ? "destructive" : stat.value > 2 ? "default" : "secondary"}
                  className="mt-2"
                >
                  {stat.value > 5 ? "Élevé" : stat.value > 2 ? "Modéré" : "Faible"}
                </Badge>
              ) : (
                <Badge variant="outline" className="mt-2 text-gray-400">
                  Aucune donnée
                </Badge>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
