'use client'

import { useState } from 'react'
import { saveQuote } from '@/lib/storage'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calculator, Phone, CheckCircle, Info } from 'lucide-react'

export default function DevisPage() {
  const [formData, setFormData] = useState({
    nom: '',
    telephone: '',
    email: '',
    vehicule: '',
    marque: '',
    modele: '',
    annee: '',
    service: '',
    nombrePneus: '',
    dimensionsPneus: '',
    marquePreferee: '',
    budgetMax: '',
    pneusAchetes: '',
    urgence: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Sauvegarder le devis dans le localStorage
    try {
      const quote = saveQuote({
        customerName: formData.nom,
        phone: formData.telephone,
        email: formData.email || undefined,
        service: formData.service,
        vehicle: formData.vehicule || undefined,
        vehicleDetails: {
          marque: formData.marque || undefined,
          modele: formData.modele || undefined,
          annee: formData.annee || undefined
        },
        numberOfTires: formData.nombrePneus || undefined,
        tireDimensions: formData.dimensionsPneus || undefined,
        preferredBrand: formData.marquePreferee || undefined,
        maxBudget: formData.budgetMax || undefined,
        hasOwnTires: formData.pneusAchetes || undefined,
        urgency: (formData.urgence as 'flexible' | 'semaine' | 'rapide' | 'urgent') || 'flexible',
        message: formData.message || undefined
      })
      
      console.log('Devis sauvegardé:', quote)

      const mailResponse = await fetch('/api/form-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'devis',
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
                <CardTitle className="text-2xl text-green-800">Demande de devis envoyée !</CardTitle>
                <CardDescription className="text-green-700">
                  Votre demande de devis a été transmise avec succès
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-zinc-300 mb-6">
                  Nous vous rappellerons rapidement avec un devis personnalisé et détaillé.
                </p>
                <div className="space-y-2 text-sm text-zinc-400">
                  <p>📞 Contact direct : <strong>01 43 89 68 08</strong></p>
                  <p>⏰ Délai de réponse : sous 4h en journée</p>
                  <p>📧 Devis détaillé par email si renseigné</p>
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
              Demander un Devis
            </h1>
            <p className="text-xl text-red-100 mb-8">
              Obtenez un devis gratuit et personnalisé pour vos besoins en pneus et services
            </p>
            <div className="flex items-center justify-center gap-6 text-red-100">
              <div className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                <span>Devis gratuit</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <span>Réponse rapide</span>
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
                  <CardTitle className="text-2xl">Formulaire de devis</CardTitle>
                  <CardDescription>
                    Plus vous nous donnez d'informations, plus notre devis sera précis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Contact Info */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-zinc-100">Vos coordonnées</h3>
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
                        <Label htmlFor="email">Email (recommandé)</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          placeholder="votre@email.com"
                        />
                        <p className="text-sm text-zinc-500 mt-1">Pour recevoir le devis détaillé par email</p>
                      </div>
                    </div>

                    {/* Vehicle Info */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-zinc-100">Votre véhicule</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="marque">Marque</Label>
                          <Input
                            id="marque"
                            value={formData.marque}
                            onChange={(e) => handleChange('marque', e.target.value)}
                            placeholder="Renault, Peugeot..."
                          />
                        </div>
                        <div>
                          <Label htmlFor="modele">Modèle</Label>
                          <Input
                            id="modele"
                            value={formData.modele}
                            onChange={(e) => handleChange('modele', e.target.value)}
                            placeholder="Clio, 308..."
                          />
                        </div>
                        <div>
                          <Label htmlFor="annee">Année</Label>
                          <Input
                            id="annee"
                            value={formData.annee}
                            onChange={(e) => handleChange('annee', e.target.value)}
                            placeholder="2020"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="vehicule">Ou plaque d'immatriculation</Label>
                        <Input
                          id="vehicule"
                          value={formData.vehicule}
                          onChange={(e) => handleChange('vehicule', e.target.value)}
                          placeholder="AB-123-CD (pour identification automatique)"
                        />
                      </div>
                    </div>

                    {/* Service Details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-zinc-100">Votre besoin</h3>
                      <div>
                        <Label htmlFor="service">Service souhaité *</Label>
                        <Select onValueChange={(value) => handleChange('service', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez le service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="montage-neuf">Montage pneus neufs</SelectItem>
                            <SelectItem value="montage-apporte">Montage pneus que j'apporte</SelectItem>
                            <SelectItem value="reparation">Réparation crevaison</SelectItem>
                            <SelectItem value="pack-complet">Pack complet (pneus + montage)</SelectItem>
                            <SelectItem value="autre">Autre (préciser dans le message)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="nombrePneus">Nombre de pneus</Label>
                          <Select onValueChange={(value) => handleChange('nombrePneus', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Combien de pneus ?" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 pneu</SelectItem>
                              <SelectItem value="2">2 pneus</SelectItem>
                              <SelectItem value="4">4 pneus</SelectItem>
                              <SelectItem value="autre">Autre nombre</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="urgence">Délai souhaité</Label>
                          <Select onValueChange={(value) => handleChange('urgence', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Quand ?" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="flexible">Pas pressé</SelectItem>
                              <SelectItem value="semaine">Cette semaine</SelectItem>
                              <SelectItem value="rapide">Rapidement</SelectItem>
                              <SelectItem value="urgent">Urgent (aujourd'hui)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="dimensionsPneus">Dimensions des pneus (si connues)</Label>
                        <Input
                          id="dimensionsPneus"
                          value={formData.dimensionsPneus}
                          onChange={(e) => handleChange('dimensionsPneus', e.target.value)}
                          placeholder="Ex: 205/55 R16 91V"
                        />
                      </div>

                      <div>
                        <Label htmlFor="pneusAchetes">Avez-vous déjà vos pneus ?</Label>
                        <Select onValueChange={(value) => handleChange('pneusAchetes', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Situation actuelle" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="non">Non, j'ai besoin de pneus + montage</SelectItem>
                            <SelectItem value="oui">Oui, j'ai mes pneus (montage seul)</SelectItem>
                            <SelectItem value="commande">Je vais les commander</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Preferences */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-zinc-100">Préférences (optionnel)</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="marquePreferee">Marque de pneu préférée</Label>
                          <Input
                            id="marquePreferee"
                            value={formData.marquePreferee}
                            onChange={(e) => handleChange('marquePreferee', e.target.value)}
                            placeholder="Michelin, Continental..."
                          />
                        </div>
                        <div>
                          <Label htmlFor="budgetMax">Budget maximum</Label>
                          <Input
                            id="budgetMax"
                            value={formData.budgetMax}
                            onChange={(e) => handleChange('budgetMax', e.target.value)}
                            placeholder="Ex: 400€ pour 4 pneus"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">Message / Précisions</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        placeholder="Décrivez votre problème, vos besoins spécifiques, questions..."
                        rows={4}
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      Demander le devis gratuit
                    </Button>

                    <p className="text-sm text-zinc-500 text-center">
                      * Champs obligatoires. Devis gratuit et sans engagement.
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
                    <Calculator className="h-5 w-5 text-red-500" />
                    Devis gratuit
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <p>✅ Estimation précise et détaillée</p>
                    <p>✅ Aucun engagement</p>
                    <p>✅ Réponse rapide (sous 4h)</p>
                    <p>✅ Conseils personnalisés</p>
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
                  <Button className="w-full mb-3" asChild>
                    <a href="tel:0143896808">
                      <Phone className="h-4 w-4 mr-2" />
                      01 43 89 68 08
                    </a>
                  </Button>
                  <p className="text-sm text-zinc-400">
                    Devis par téléphone possible pour les demandes simples
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-800">
                    <Info className="h-5 w-5" />
                    Bon à savoir
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-blue-700">
                    <p>• Nous montons vos pneus achetés ailleurs</p>
                    <p>• Tarifs identiques toute l'année</p>
                    <p>• Garantie sur toutes nos prestations</p>
                    <p>• Paiement CB, espèces, chèques</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-red-50 border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-800">🚨 Urgence ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-red-700">
                    Pour les urgences, appelez directement. Nous faisons notre possible pour intervenir dans la journée.
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
