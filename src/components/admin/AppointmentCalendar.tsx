'use client'

import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { format, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns'
import { fr } from 'date-fns/locale'
import { ChevronLeft, ChevronRight, Phone, Car, Clock } from 'lucide-react'

interface Appointment {
  id: string
  customerName: string
  phone: string
  email?: string
  service: string
  vehicle?: string
  date: string
  time: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  urgency: 'normale' | 'rapide' | 'urgente'
  message?: string
  createdAt: string
}

interface AppointmentCalendarProps {
  appointments: Appointment[]
}

export default function AppointmentCalendar({ appointments }: AppointmentCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())

  // Obtenir les rendez-vous pour une date donnée
  const getAppointmentsForDate = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd')
    return appointments.filter(appointment => appointment.date === dateString)
  }

  // Obtenir les rendez-vous pour la date sélectionnée
  const selectedDateAppointments = getAppointmentsForDate(selectedDate)

  // Créer un objet avec le nombre de rendez-vous par jour pour le mois courant
  const appointmentsByDay = appointments.reduce((acc, appointment) => {
    const appointmentDate = new Date(appointment.date)
    if (appointmentDate >= startOfMonth(currentMonth) && appointmentDate <= endOfMonth(currentMonth)) {
      const dateKey = format(appointmentDate, 'yyyy-MM-dd')
      acc[dateKey] = (acc[dateKey] || 0) + 1
    }
    return acc
  }, {} as Record<string, number>)

  const getServiceLabel = (service: string) => {
    const services: { [key: string]: string } = {
      'montage': 'Montage',
      'reparation': 'Réparation',
      'equilibrage': 'Équilibrage',
      'permutation': 'Permutation',
      'controle': 'Contrôle',
      'autre': 'Autre'
    }
    return services[service] || service
  }

  const getStatusBadge = (status: Appointment['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-red-600 border-red-600">En attente</Badge>
      case 'confirmed':
        return <Badge variant="outline" className="text-blue-600 border-blue-600">Confirmé</Badge>
      case 'completed':
        return <Badge variant="outline" className="text-green-600 border-green-600">Terminé</Badge>
      case 'cancelled':
        return <Badge variant="outline" className="text-red-600 border-red-600">Annulé</Badge>
      default:
        return <Badge variant="outline">Inconnu</Badge>
    }
  }

  const getUrgencyColor = (urgency: Appointment['urgency']) => {
    switch (urgency) {
      case 'urgente':
        return 'bg-red-100 border-red-300'
      case 'rapide':
        return 'bg-red-100 border-red-300'
      case 'normale':
        return 'bg-blue-100 border-blue-300'
      default:
        return 'bg-gray-100 border-gray-300'
    }
  }

  const getTimeLabel = (time: string) => {
    const times: { [key: string]: string } = {
      'matin': 'Matin',
      'apres-midi': 'Après-midi',
      'flexible': 'Flexible'
    }
    return times[time] || time
  }

  // Fonction pour personnaliser l'affichage des jours dans le calendrier
  const modifiers = {
    hasAppointments: (date: Date) => {
      const dateKey = format(date, 'yyyy-MM-dd')
      return appointmentsByDay[dateKey] > 0
    }
  }

  const modifiersStyles = {
    hasAppointments: {
      backgroundColor: '#fef3c7',
      border: '2px solid #f59e0b',
      borderRadius: '6px'
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendrier */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>
                  {format(currentMonth, 'MMMM yyyy', { locale: fr })}
                </CardTitle>
                <CardDescription>
                  Cliquez sur une date pour voir les rendez-vous
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentMonth(new Date())}
                >
                  Aujourd'hui
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              month={currentMonth}
              onMonthChange={setCurrentMonth}
              locale={fr}
              modifiers={modifiers}
              modifiersStyles={modifiersStyles}
              className="rounded-md border"
            />
            
            {/* Légende */}
            <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-200 border-2 border-yellow-500 rounded"></div>
                <span>Jours avec rendez-vous</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span>Jour sélectionné</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Détails de la date sélectionnée */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              {format(selectedDate, 'dd MMMM yyyy', { locale: fr })}
            </CardTitle>
            <CardDescription>
              {selectedDateAppointments.length} rendez-vous
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedDateAppointments.length > 0 ? (
              <div className="space-y-4">
                {selectedDateAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className={`p-4 rounded-lg border-2 ${getUrgencyColor(appointment.urgency)}`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{appointment.customerName}</h4>
                        {getStatusBadge(appointment.status)}
                      </div>
                      
                      <div className="text-sm space-y-1">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          <span>{getTimeLabel(appointment.time)}</span>
                        </div>
                        
                        <div>
                          <strong>Service:</strong> {getServiceLabel(appointment.service)}
                        </div>
                        
                        {appointment.vehicle && (
                          <div className="flex items-center gap-2">
                            <Car className="h-3 w-3" />
                            <span>{appointment.vehicle}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2">
                          <Phone className="h-3 w-3" />
                          <a 
                            href={`tel:${appointment.phone}`}
                            className="text-blue-600 hover:underline"
                          >
                            {appointment.phone}
                          </a>
                        </div>
                      </div>

                      {appointment.message && (
                        <div className="text-xs bg-muted/50 p-2 rounded border">
                          <strong>Note:</strong> {appointment.message}
                        </div>
                      )}

                      {appointment.urgency === 'urgente' && (
                        <Badge variant="destructive" className="text-xs">
                          URGENT
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Aucun rendez-vous ce jour</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Résumé du mois */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Résumé du mois</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Total rendez-vous:</span>
                <span className="font-semibold">
                  {Object.values(appointmentsByDay).reduce((sum, count) => sum + count, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Jours avec RDV:</span>
                <span className="font-semibold">
                  {Object.keys(appointmentsByDay).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Moyenne par jour:</span>
                <span className="font-semibold">
                  {Object.keys(appointmentsByDay).length > 0 
                    ? (Object.values(appointmentsByDay).reduce((sum, count) => sum + count, 0) / Object.keys(appointmentsByDay).length).toFixed(1)
                    : '0'
                  }
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
