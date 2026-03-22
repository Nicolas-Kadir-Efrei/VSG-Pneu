'use client'

import { useState } from 'react'
import { saveAppointment } from '@/lib/storage'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar, Clock, Phone, MapPin, CheckCircle } from 'lucide-react'

export default function RendezVousPage() {
  const [formData, setFormData] = useState({
    nom: '',
    telephone: '',
    email: '',
    service: '',
    vehicule: '',
    date: '',
    heure: '',
    urgence: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Sauvegarder le rendez-vous dans le localStorage
    try {
      console.log('Données du formulaire avant sauvegarde:', formData)
      
      const appointment = saveAppointment({
        customerName: formData.nom,
        phone: formData.telephone,
        email: formData.email || undefined,
        service: formData.service,
        vehicle: formData.vehicule || undefined,
        date: formData.date,
        time: formData.heure,
        urgency: (formData.urgence as 'normale' | 'rapide' | 'urgente') || 'normale',
        message: formData.message || undefined
      })
      
      console.log('Rendez-vous sauvegardé:', appointment)
      
      // Vérifier que les données sont bien dans le localStorage
      const allAppointments = JSON.parse(localStorage.getItem('vsg_appointments') || '[]')
      console.log('Tous les RDV dans localStorage:', allAppointments)

      const mailResponse = await fetch('/api/form-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'rendezvous',
          data: formData,
        }),
      })

      if (!mailResponse.ok) {
        const payload = await mailResponse.json().catch(() => ({})) as {
          error?: string
          details?: string
          hint?: string
        }
        console.error('Envoi mail:', payload)
        const msg =
          payload.details ||
          payload.hint ||
          payload.error ||
          "Erreur lors de l'envoi du mail"
        throw new Error(msg)
      }
      
      setIsSubmitted(true)
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error)
      alert('Erreur lors de l\'envoi de votre demande. Veuillez réessayer.')
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black py-16 text-zinc-100">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="border-green-200 bg-green-50">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <CardTitle className="text-2xl text-green-800">Demande envoyée !</CardTitle>
                <CardDescription className="text-green-700">
                  Votre demande de rendez-vous a été transmise avec succès
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-zinc-300 mb-6">
                  Nous vous rappellerons dans les plus brefs délais pour confirmer votre rendez-vous.
                </p>
                <div className="space-y-2 text-sm text-zinc-400">
                  <p>📞 En cas d'urgence : <strong>01 43 89 68 08</strong></p>
                  <p>⏰ Délai de rappel habituel : sous 2h en journée</p>
                </div>
                <Button className="mt-6" onClick={() => setIsSubmitted(false)}>
                  Nouvelle demande
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100 [&_[data-slot=card]]:bg-zinc-900 [&_[data-slot=card]]:text-zinc-100 [&_[data-slot=card]]:ring-zinc-700/60 [&_[data-slot=input]]:border-zinc-700 [&_[data-slot=input]]:bg-zinc-950 [&_[data-slot=input]]:text-zinc-100 [&_[data-slot=textarea]]:border-zinc-700 [&_[data-slot=textarea]]:bg-zinc-950 [&_[data-slot=textarea]]:text-zinc-100 [&_[data-slot=select-trigger]]:border-zinc-700 [&_[data-slot=select-trigger]]:bg-zinc-950 [&_[data-slot=select-trigger]]:text-zinc-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-500 to-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Prendre Rendez-vous
            </h1>
            <p className="text-xl text-red-100 mb-8">
              Réservez votre créneau en ligne ou appelez-nous directement pour une intervention rapide
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:0143896808"
                className="inline-flex items-center justify-center px-6 py-3 bg-black text-white rounded-lg hover:bg-zinc-900 transition-colors font-medium border border-zinc-700"
              >
                <Phone className="h-5 w-5 mr-2" />
                01 43 89 68 08
              </a>
              <div className="flex items-center justify-center gap-2 text-red-100">
                <MapPin className="h-5 w-5" />
                <span>192 Rue de Paris, Villeneuve-Saint-Georges</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Formulaire de rendez-vous</CardTitle>
                  <CardDescription>
                    Remplissez ce formulaire et nous vous rappellerons pour confirmer votre rendez-vous
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Contact Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="nom">Nom complet *</Label>
                        <Input
                          id="nom"
                          value={formData.nom}
                          onChange={(e) => handleChange('nom', e.target.value)}
                          required
                          placeholder="Votre nom et prénom"
                        />
                      </div>
                      <div>
                        <Label htmlFor="telephone">Téléphone *</Label>
                        <Input
                          id="telephone"
                          type="tel"
                          value={formData.telephone}
                          onChange={(e) => handleChange('telephone', e.target.value)}
                          required
                          placeholder="06 12 34 56 78"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email (optionnel)</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="votre@email.com"
                      />
                    </div>

                    {/* Service Selection */}
                    <div>
                      <Label htmlFor="service">Service souhaité *</Label>
                      <Select onValueChange={(value) => handleChange('service', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez le service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="montage">Montage de pneus</SelectItem>
                          <SelectItem value="reparation">Réparation crevaison</SelectItem>
                          <SelectItem value="equilibrage">Équilibrage</SelectItem>
                          <SelectItem value="permutation">Permutation</SelectItem>
                          <SelectItem value="controle">Contrôle / Diagnostic</SelectItem>
                          <SelectItem value="autre">Autre (préciser dans le message)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="vehicule">Véhicule</Label>
                      <Input
                        id="vehicule"
                        value={formData.vehicule}
                        onChange={(e) => handleChange('vehicule', e.target.value)}
                        placeholder="Ex: Renault Clio 2018, Peugeot 308..."
                      />
                    </div>

                    {/* Date and Time */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="date">Date souhaitée</Label>
                        <Input
                          id="date"
                          type="date"
                          value={formData.date}
                          onChange={(e) => handleChange('date', e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      <div>
                        <Label htmlFor="heure">Créneau préféré</Label>
                        <Select onValueChange={(value) => handleChange('heure', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choisir un créneau" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="matin">Matin (8h-12h)</SelectItem>
                            <SelectItem value="apres-midi">Après-midi (14h-18h)</SelectItem>
                            <SelectItem value="flexible">Flexible</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Urgency */}
                    <div>
                      <Label htmlFor="urgence">Urgence</Label>
                      <Select onValueChange={(value) => handleChange('urgence', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Niveau d'urgence" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normale">Normale</SelectItem>
                          <SelectItem value="rapide">Rapide (dans la semaine)</SelectItem>
                          <SelectItem value="urgente">Urgente (dans la journée)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message">Message (optionnel)</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        placeholder="Précisions sur votre demande, problème rencontré..."
                        rows={3}
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      Envoyer la demande
                    </Button>

                    <p className="text-sm text-zinc-500 text-center">
                      * Champs obligatoires. Nous vous rappellerons pour confirmer le rendez-vous.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-red-500" />
                    Horaires
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Lundi - Vendredi</span>
                      <span className="font-medium">8h00 - 18h00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Samedi</span>
                      <span className="font-medium">8h00 - 12h00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dimanche</span>
                      <span className="text-zinc-500">Fermé</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-red-500" />
                    Contact direct
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button className="w-full" asChild>
                      <a href="tel:0143896808">
                        <Phone className="h-4 w-4 mr-2" />
                        01 43 89 68 08
                      </a>
                    </Button>
                    <p className="text-sm text-zinc-400">
                      Pour les urgences ou questions immédiates
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-red-50 border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-800">🚨 Urgence ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-red-700 mb-3">
                    En cas de crevaison ou problème urgent, appelez-nous directement.
                  </p>
                  <p className="text-sm text-red-600">
                    Nous faisons notre possible pour vous recevoir dans la journée.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
