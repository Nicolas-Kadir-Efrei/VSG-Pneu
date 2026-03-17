'use client'

import { useState } from 'react'
import { Metadata } from 'next'
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData)
    setIsSubmitted(true)
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
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
                <p className="text-gray-700 mb-6">
                  Nous vous rappellerons dans les plus brefs délais pour confirmer votre rendez-vous.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Prendre Rendez-vous
            </h1>
            <p className="text-xl text-orange-100 mb-8">
              Réservez votre créneau en ligne ou appelez-nous directement pour une intervention rapide
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:0143896808"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-orange-500 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                <Phone className="h-5 w-5 mr-2" />
                01 43 89 68 08
              </a>
              <div className="flex items-center justify-center gap-2 text-orange-100">
                <MapPin className="h-5 w-5" />
                <span>192 Rue de Paris, Villeneuve-Saint-Georges</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
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

                    <p className="text-sm text-gray-500 text-center">
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
                    <Clock className="h-5 w-5 text-orange-500" />
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
                      <span className="text-gray-500">Fermé</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-orange-500" />
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
                    <p className="text-sm text-gray-600">
                      Pour les urgences ou questions immédiates
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-orange-50 border-orange-200">
                <CardHeader>
                  <CardTitle className="text-orange-800">🚨 Urgence ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-orange-700 mb-3">
                    En cas de crevaison ou problème urgent, appelez-nous directement.
                  </p>
                  <p className="text-sm text-orange-600">
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
