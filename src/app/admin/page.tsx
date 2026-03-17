'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getAppointments, getQuotes, getStats, updateAppointmentStatus, updateQuoteStatus, type Appointment, type Quote } from '@/lib/storage'
import { checkAdminAuth, logout, extendSession } from '@/lib/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar, Users, FileText, Phone, Clock, CheckCircle, AlertCircle, TrendingUp, LogOut, Loader2, RefreshCw } from 'lucide-react'
import AppointmentCalendar from '@/components/admin/AppointmentCalendar'
import AppointmentsList from '@/components/admin/AppointmentsList'
import QuotesList from '@/components/admin/QuotesList'
import DashboardStats from '@/components/admin/DashboardStats'

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  // État pour les données réelles
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [stats, setStats] = useState({
    totalAppointments: 0,
    pendingAppointments: 0,
    totalQuotes: 0,
    pendingQuotes: 0,
    todayAppointments: 0,
    urgentRequests: 0
  })

  // Vérifier l'authentification au montage
  useEffect(() => {
    const checkAuth = () => {
      const authenticated = checkAdminAuth()
      if (!authenticated) {
        router.push('/admin/login')
        return
      }
      setIsAuthenticated(true)
      setIsLoading(false)
      
      // Étendre la session
      extendSession()
    }
    
    checkAuth()
  }, [router])

  // Fonction pour charger les données (accessible dans tout le composant)
  const loadData = () => {
    console.log('Chargement des données dans le dashboard admin...')
    
    const appointmentsData = getAppointments()
    const quotesData = getQuotes()
    const statsData = getStats()
    
    console.log('Données RDV chargées:', appointmentsData)
    console.log('Données devis chargées:', quotesData)
    console.log('Statistiques calculées:', statsData)
    
    setAppointments(appointmentsData)
    setQuotes(quotesData)
    setStats(statsData)
  }

  // Charger les données au montage du composant
  useEffect(() => {
    if (!isAuthenticated) return
    
    loadData()
    
    // Recharger les données toutes les 5 secondes pour les mises à jour
    const interval = setInterval(loadData, 5000)
    
    // Écouter les changements du localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'vsg_appointments' || e.key === 'vsg_quotes') {
        console.log('Changement détecté dans localStorage:', e.key)
        loadData()
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    
    return () => {
      clearInterval(interval)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  // Fonction pour mettre à jour le statut d'un rendez-vous
  const handleAppointmentStatusChange = (id: string, newStatus: Appointment['status']) => {
    updateAppointmentStatus(id, newStatus)
    // Recharger les données
    setAppointments(getAppointments())
    setStats(getStats())
  }

  // Fonction pour mettre à jour le statut d'un devis
  const handleQuoteStatusChange = (id: string, newStatus: Quote['status']) => {
    updateQuoteStatus(id, newStatus)
    // Recharger les données
    setQuotes(getQuotes())
    setStats(getStats())
  }

  // Fonction de déconnexion
  const handleLogout = () => {
    logout()
    router.push('/admin/login')
  }

  // Écran de chargement
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-orange-500" />
          <p className="text-gray-600">Vérification de l'authentification...</p>
        </div>
      </div>
    )
  }

  // Si pas authentifié, ne rien afficher (redirection en cours)
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
              <p className="text-gray-600 mt-1">VSG PNEUS - Gestion des rendez-vous et devis</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-sm">
                <Clock className="h-4 w-4 mr-1" />
                Dernière mise à jour: {new Date().toLocaleTimeString('fr-FR')}
              </Badge>
              <Button variant="outline" onClick={loadData}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Actualiser
              </Button>
              <Button asChild>
                <a href="tel:0143896808">
                  <Phone className="h-4 w-4 mr-2" />
                  01 43 89 68 08
                </a>
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="container mx-auto px-4 py-6">
        <DashboardStats stats={stats} />

        {/* Main Content */}
        <div className="mt-8">
          <Tabs defaultValue="calendar" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="calendar" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Calendrier
              </TabsTrigger>
              <TabsTrigger value="appointments" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Rendez-vous
              </TabsTrigger>
              <TabsTrigger value="quotes" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Devis
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Statistiques
              </TabsTrigger>
            </TabsList>

            <TabsContent value="calendar" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Calendrier des rendez-vous</CardTitle>
                  <CardDescription>
                    Vue d'ensemble de tous vos rendez-vous planifiés
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AppointmentCalendar appointments={appointments} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appointments" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gestion des rendez-vous</CardTitle>
                  <CardDescription>
                    Liste complète des demandes de rendez-vous
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AppointmentsList 
                    appointments={appointments} 
                    onStatusChange={handleAppointmentStatusChange}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="quotes" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gestion des devis</CardTitle>
                  <CardDescription>
                    Liste complète des demandes de devis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <QuotesList 
                    quotes={quotes} 
                    onStatusChange={handleQuoteStatusChange}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Activité récente</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {appointments.length > 0 || quotes.length > 0 ? (
                      <div className="space-y-3">
                        {stats.todayAppointments > 0 && (
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm">{stats.todayAppointments} nouveau(x) RDV aujourd'hui</span>
                          </div>
                        )}
                        {stats.pendingQuotes > 0 && (
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-sm">{stats.pendingQuotes} devis en attente</span>
                          </div>
                        )}
                        {stats.urgentRequests > 0 && (
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            <span className="text-sm">{stats.urgentRequests} demande(s) urgente(s)</span>
                          </div>
                        )}
                        {stats.todayAppointments === 0 && stats.pendingQuotes === 0 && stats.urgentRequests === 0 && (
                          <div className="text-center text-gray-500 py-4">
                            <span className="text-sm">Aucune activité récente</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center text-gray-500 py-4">
                        <span className="text-sm">Aucune donnée disponible</span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Services populaires</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {appointments.length > 0 ? (
                      <div className="space-y-3">
                        {(() => {
                          const serviceCounts = appointments.reduce((acc, apt) => {
                            acc[apt.service] = (acc[apt.service] || 0) + 1
                            return acc
                          }, {} as Record<string, number>)
                          
                          const total = appointments.length
                          const sortedServices = Object.entries(serviceCounts)
                            .sort(([,a], [,b]) => b - a)
                            .slice(0, 3)
                          
                          const serviceLabels: Record<string, string> = {
                            'montage': 'Montage',
                            'reparation': 'Réparation',
                            'equilibrage': 'Équilibrage',
                            'permutation': 'Permutation',
                            'controle': 'Contrôle'
                          }
                          
                          return sortedServices.map(([service, count]) => (
                            <div key={service} className="flex justify-between">
                              <span className="text-sm">{serviceLabels[service] || service}</span>
                              <span className="text-sm font-medium">{Math.round((count / total) * 100)}%</span>
                            </div>
                          ))
                        })()}
                      </div>
                    ) : (
                      <div className="text-center text-gray-500 py-4">
                        <span className="text-sm">Aucune donnée disponible</span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Taux de conversion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {appointments.length > 0 || quotes.length > 0 ? (
                      <div className="space-y-3">
                        {appointments.length > 0 && (
                          <div className="flex justify-between">
                            <span className="text-sm">RDV confirmés</span>
                            <span className="text-sm font-medium text-green-600">
                              {Math.round((appointments.filter(a => a.status === 'confirmed' || a.status === 'completed').length / appointments.length) * 100)}%
                            </span>
                          </div>
                        )}
                        {quotes.length > 0 && (
                          <div className="flex justify-between">
                            <span className="text-sm">Devis acceptés</span>
                            <span className="text-sm font-medium text-blue-600">
                              {Math.round((quotes.filter(q => q.status === 'accepted').length / quotes.length) * 100)}%
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center text-gray-500 py-4">
                        <span className="text-sm">Aucune donnée disponible</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
