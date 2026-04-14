'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { saveAppointment, getAppointments, getStats } from '@/lib/storage'

export default function TestStoragePage() {
  const [appointments, setAppointments] = useState<any[]>([])
  const [stats, setStats] = useState<any>({})

  const testSaveAppointment = () => {
    const testData = {
      customerName: 'Test Client',
      phone: '06 12 34 56 78',
      email: 'test@example.com',
      service: 'montage',
      vehicle: 'Test Vehicle',
      date: new Date().toISOString().split('T')[0],
      time: 'matin',
      urgency: 'normale' as const,
      message: 'Test message'
    }

    const saved = saveAppointment(testData)
    
    loadData()
  }

  const loadData = () => {
    const appointmentsData = getAppointments()
    const statsData = getStats()
    
    setAppointments(appointmentsData)
    setStats(statsData)
  }

  const clearStorage = () => {
    localStorage.removeItem('vsg_appointments')
    localStorage.removeItem('vsg_quotes')
    loadData()
  }

  const checkLocalStorage = () => {
    const stored = localStorage.getItem('vsg_appointments')
    alert(stored || 'Aucune donnée')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Test du système de stockage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-4 flex-wrap">
              <Button onClick={testSaveAppointment}>
                Sauvegarder RDV test
              </Button>
              <Button onClick={loadData} variant="outline">
                Recharger données
              </Button>
              <Button onClick={clearStorage} variant="destructive">
                Vider localStorage
              </Button>
              <Button onClick={checkLocalStorage} variant="secondary">
                Vérifier localStorage
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Rendez-vous ({appointments.length})</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {appointments.length > 0 ? (
                    appointments.map((apt, index) => (
                      <div key={index} className="p-3 bg-white rounded border">
                        <div className="font-medium">{apt.customerName}</div>
                        <div className="text-sm text-gray-600">{apt.phone}</div>
                        <div className="text-sm text-gray-600">{apt.service} - {apt.date}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500 italic">Aucun rendez-vous</div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Statistiques</h3>
                <div className="space-y-2">
                  <div>Total RDV: {stats.totalAppointments || 0}</div>
                  <div>RDV en attente: {stats.pendingAppointments || 0}</div>
                  <div>Total devis: {stats.totalQuotes || 0}</div>
                  <div>Devis en attente: {stats.pendingQuotes || 0}</div>
                  <div>RDV aujourd'hui: {stats.todayAppointments || 0}</div>
                  <div>Demandes urgentes: {stats.urgentRequests || 0}</div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded">
              <h4 className="font-semibold mb-2">Instructions de test :</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Ouvre la console du navigateur (F12)</li>
                <li>Clique sur "Sauvegarder RDV test" pour créer un RDV</li>
                <li>Vérifie que le RDV apparaît ci-dessus</li>
                <li>Va sur /admin pour voir si le RDV apparaît</li>
                <li>Utilise "Vider localStorage" pour nettoyer</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
