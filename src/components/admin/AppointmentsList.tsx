'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Phone, Mail, Car, Clock, MoreHorizontal, Eye, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { type Appointment } from '@/lib/storage'

interface AppointmentsListProps {
  appointments: Appointment[]
  onStatusChange?: (id: string, status: Appointment['status']) => void
}

export default function AppointmentsList({ appointments, onStatusChange }: AppointmentsListProps) {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)

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

  const getUrgencyBadge = (urgency: Appointment['urgency']) => {
    switch (urgency) {
      case 'urgente':
        return <Badge variant="destructive">Urgent</Badge>
      case 'rapide':
        return <Badge variant="default">Rapide</Badge>
      case 'normale':
        return <Badge variant="secondary">Normal</Badge>
      default:
        return <Badge variant="secondary">Normal</Badge>
    }
  }

  const getServiceLabel = (service: string) => {
    const services: { [key: string]: string } = {
      'montage': 'Montage de pneus',
      'reparation': 'Réparation crevaison',
      'equilibrage': 'Équilibrage',
      'permutation': 'Permutation',
      'controle': 'Contrôle / Diagnostic',
      'autre': 'Autre service'
    }
    return services[service] || service
  }

  const getTimeLabel = (time: string) => {
    const times: { [key: string]: string } = {
      'matin': 'Matin (8h-12h)',
      'apres-midi': 'Après-midi (14h-18h)',
      'flexible': 'Flexible'
    }
    return times[time] || time
  }

  const handleStatusChange = (appointmentId: string, newStatus: Appointment['status']) => {
    if (onStatusChange) {
      onStatusChange(appointmentId, newStatus)
    }
  }

  return (
    <div className="space-y-4">
      {/* Filtres rapides */}
      <div className="flex gap-2 flex-wrap">
        <Button variant="outline" size="sm">Tous ({appointments.length})</Button>
        <Button variant="outline" size="sm">
          En attente ({appointments.filter(a => a.status === 'pending').length})
        </Button>
        <Button variant="outline" size="sm">
          Urgents ({appointments.filter(a => a.urgency === 'urgente').length})
        </Button>
        <Button variant="outline" size="sm">
          Aujourd'hui ({appointments.filter(a => a.date === new Date().toISOString().split('T')[0]).length})
        </Button>
      </div>

      {/* Table des rendez-vous */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Date & Heure</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Urgence</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id} className="hover:bg-gray-50">
                <TableCell>
                  <div>
                    <div className="font-medium">{appointment.customerName}</div>
                    {appointment.vehicle && (
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Car className="h-3 w-3" />
                        {appointment.vehicle}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {getServiceLabel(appointment.service)}
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">
                      {format(new Date(appointment.date), 'dd MMM yyyy', { locale: fr })}
                    </div>
                    <div className="text-sm text-gray-500">
                      {getTimeLabel(appointment.time)}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {getStatusBadge(appointment.status)}
                </TableCell>
                <TableCell>
                  {getUrgencyBadge(appointment.urgency)}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" asChild>
                      <a href={`tel:${appointment.phone}`}>
                        <Phone className="h-4 w-4" />
                      </a>
                    </Button>
                    {appointment.email && (
                      <Button variant="ghost" size="sm" asChild>
                        <a href={`mailto:${appointment.email}`}>
                          <Mail className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedAppointment(appointment)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Détails du rendez-vous</DialogTitle>
                          <DialogDescription>
                            Rendez-vous de {appointment.customerName}
                          </DialogDescription>
                        </DialogHeader>
                        {selectedAppointment && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-semibold mb-2">Informations client</h4>
                                <div className="space-y-1 text-sm">
                                  <p><strong>Nom:</strong> {selectedAppointment.customerName}</p>
                                  <p><strong>Téléphone:</strong> {selectedAppointment.phone}</p>
                                  {selectedAppointment.email && (
                                    <p><strong>Email:</strong> {selectedAppointment.email}</p>
                                  )}
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Détails du service</h4>
                                <div className="space-y-1 text-sm">
                                  <p><strong>Service:</strong> {getServiceLabel(selectedAppointment.service)}</p>
                                  {selectedAppointment.vehicle && (
                                    <p><strong>Véhicule:</strong> {selectedAppointment.vehicle}</p>
                                  )}
                                  <p><strong>Date:</strong> {format(new Date(selectedAppointment.date), 'dd MMMM yyyy', { locale: fr })}</p>
                                  <p><strong>Créneau:</strong> {getTimeLabel(selectedAppointment.time)}</p>
                                </div>
                              </div>
                            </div>
                            {selectedAppointment.message && (
                              <div>
                                <h4 className="font-semibold mb-2">Message du client</h4>
                                <p className="text-sm bg-gray-50 p-3 rounded-lg">
                                  {selectedAppointment.message}
                                </p>
                              </div>
                            )}
                            <div className="flex gap-2 pt-4">
                              <Button 
                                onClick={() => handleStatusChange(selectedAppointment.id, 'confirmed')}
                                className="flex items-center gap-2"
                              >
                                <CheckCircle className="h-4 w-4" />
                                Confirmer
                              </Button>
                              <Button 
                                variant="outline"
                                onClick={() => handleStatusChange(selectedAppointment.id, 'cancelled')}
                                className="flex items-center gap-2"
                              >
                                <XCircle className="h-4 w-4" />
                                Annuler
                              </Button>
                              <Button variant="ghost" asChild>
                                <a href={`tel:${selectedAppointment.phone}`}>
                                  <Phone className="h-4 w-4 mr-2" />
                                  Appeler
                                </a>
                              </Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleStatusChange(appointment.id, 'confirmed')}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Confirmer
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(appointment.id, 'completed')}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Marquer terminé
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(appointment.id, 'cancelled')}>
                          <XCircle className="h-4 w-4 mr-2" />
                          Annuler
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {appointments.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Aucun rendez-vous pour le moment</p>
        </div>
      )}
    </div>
  )
}
