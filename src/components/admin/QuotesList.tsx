'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Phone, Mail, Car, FileText, MoreHorizontal, Eye, Send, CheckCircle, XCircle } from 'lucide-react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { type Quote } from '@/lib/storage'

interface QuotesListProps {
  quotes: Quote[]
  onStatusChange?: (id: string, status: Quote['status']) => void
}

export default function QuotesList({ quotes, onStatusChange }: QuotesListProps) {
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)

  const getStatusBadge = (status: Quote['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-orange-600 border-orange-600">En attente</Badge>
      case 'sent':
        return <Badge variant="outline" className="text-blue-600 border-blue-600">Envoyé</Badge>
      case 'accepted':
        return <Badge variant="outline" className="text-green-600 border-green-600">Accepté</Badge>
      case 'declined':
        return <Badge variant="outline" className="text-red-600 border-red-600">Refusé</Badge>
      default:
        return <Badge variant="outline">Inconnu</Badge>
    }
  }

  const getUrgencyBadge = (urgency: Quote['urgency']) => {
    switch (urgency) {
      case 'urgent':
        return <Badge variant="destructive">Urgent</Badge>
      case 'rapide':
        return <Badge variant="default">Rapide</Badge>
      case 'semaine':
        return <Badge variant="secondary">Cette semaine</Badge>
      case 'flexible':
        return <Badge variant="outline">Flexible</Badge>
      default:
        return <Badge variant="secondary">Normal</Badge>
    }
  }

  const getServiceLabel = (service: string) => {
    const services: { [key: string]: string } = {
      'pack-complet': 'Pack complet (pneus + montage)',
      'montage-neuf': 'Montage pneus neufs',
      'montage-apporte': 'Montage pneus apportés',
      'reparation': 'Réparation crevaison',
      'equilibrage': 'Équilibrage',
      'permutation': 'Permutation',
      'autre': 'Autre service'
    }
    return services[service] || service
  }

  const handleStatusChange = (quoteId: string, newStatus: Quote['status']) => {
    if (onStatusChange) {
      onStatusChange(quoteId, newStatus)
    }
  }

  return (
    <div className="space-y-4">
      {/* Filtres rapides */}
      <div className="flex gap-2 flex-wrap">
        <Button variant="outline" size="sm">Tous ({quotes.length})</Button>
        <Button variant="outline" size="sm">
          En attente ({quotes.filter(q => q.status === 'pending').length})
        </Button>
        <Button variant="outline" size="sm">
          Urgents ({quotes.filter(q => q.urgency === 'urgent').length})
        </Button>
        <Button variant="outline" size="sm">
          Avec email ({quotes.filter(q => q.email).length})
        </Button>
      </div>

      {/* Table des devis */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Véhicule</TableHead>
              <TableHead>Détails</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Urgence</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quotes.map((quote) => (
              <TableRow key={quote.id} className="hover:bg-gray-50">
                <TableCell>
                  <div>
                    <div className="font-medium">{quote.customerName}</div>
                    <div className="text-sm text-gray-500">
                      {format(new Date(quote.createdAt), 'dd MMM yyyy', { locale: fr })}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {getServiceLabel(quote.service)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {quote.vehicleDetails ? (
                      <div>
                        <div className="font-medium">
                          {quote.vehicleDetails.marque} {quote.vehicleDetails.modele}
                        </div>
                        {quote.vehicleDetails.annee && (
                          <div className="text-gray-500">{quote.vehicleDetails.annee}</div>
                        )}
                      </div>
                    ) : (
                      quote.vehicle || '-'
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm space-y-1">
                    {quote.numberOfTires && (
                      <div>{quote.numberOfTires} pneu(s)</div>
                    )}
                    {quote.tireDimensions && (
                      <div className="text-gray-500">{quote.tireDimensions}</div>
                    )}
                    {quote.maxBudget && (
                      <div className="text-green-600">Budget: {quote.maxBudget}</div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {getStatusBadge(quote.status)}
                </TableCell>
                <TableCell>
                  {getUrgencyBadge(quote.urgency)}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" asChild>
                      <a href={`tel:${quote.phone}`}>
                        <Phone className="h-4 w-4" />
                      </a>
                    </Button>
                    {quote.email && (
                      <Button variant="ghost" size="sm" asChild>
                        <a href={`mailto:${quote.email}`}>
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
                          onClick={() => setSelectedQuote(quote)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>Détails du devis</DialogTitle>
                          <DialogDescription>
                            Demande de devis de {quote.customerName}
                          </DialogDescription>
                        </DialogHeader>
                        {selectedQuote && (
                          <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-semibold mb-3">Informations client</h4>
                                <div className="space-y-2 text-sm">
                                  <p><strong>Nom:</strong> {selectedQuote.customerName}</p>
                                  <p><strong>Téléphone:</strong> {selectedQuote.phone}</p>
                                  {selectedQuote.email && (
                                    <p><strong>Email:</strong> {selectedQuote.email}</p>
                                  )}
                                  <p><strong>Demande créée:</strong> {format(new Date(selectedQuote.createdAt), 'dd MMMM yyyy à HH:mm', { locale: fr })}</p>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-3">Détails du véhicule</h4>
                                <div className="space-y-2 text-sm">
                                  {selectedQuote.vehicleDetails ? (
                                    <>
                                      <p><strong>Marque:</strong> {selectedQuote.vehicleDetails.marque || '-'}</p>
                                      <p><strong>Modèle:</strong> {selectedQuote.vehicleDetails.modele || '-'}</p>
                                      <p><strong>Année:</strong> {selectedQuote.vehicleDetails.annee || '-'}</p>
                                    </>
                                  ) : (
                                    <p><strong>Véhicule:</strong> {selectedQuote.vehicle || 'Non spécifié'}</p>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-semibold mb-3">Service demandé</h4>
                                <div className="space-y-2 text-sm">
                                  <p><strong>Type:</strong> {getServiceLabel(selectedQuote.service)}</p>
                                  {selectedQuote.numberOfTires && (
                                    <p><strong>Nombre de pneus:</strong> {selectedQuote.numberOfTires}</p>
                                  )}
                                  {selectedQuote.tireDimensions && (
                                    <p><strong>Dimensions:</strong> {selectedQuote.tireDimensions}</p>
                                  )}
                                  {selectedQuote.hasOwnTires && (
                                    <p><strong>Pneus déjà achetés:</strong> {selectedQuote.hasOwnTires === 'oui' ? 'Oui' : 'Non'}</p>
                                  )}
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-3">Préférences</h4>
                                <div className="space-y-2 text-sm">
                                  {selectedQuote.preferredBrand && (
                                    <p><strong>Marque préférée:</strong> {selectedQuote.preferredBrand}</p>
                                  )}
                                  {selectedQuote.maxBudget && (
                                    <p><strong>Budget maximum:</strong> {selectedQuote.maxBudget}</p>
                                  )}
                                  <p><strong>Urgence:</strong> {getUrgencyBadge(selectedQuote.urgency)}</p>
                                </div>
                              </div>
                            </div>

                            {selectedQuote.message && (
                              <div>
                                <h4 className="font-semibold mb-3">Message du client</h4>
                                <p className="text-sm bg-gray-50 p-4 rounded-lg">
                                  {selectedQuote.message}
                                </p>
                              </div>
                            )}

                            <div className="flex gap-3 pt-4 border-t">
                              <Button 
                                onClick={() => handleStatusChange(selectedQuote.id, 'sent')}
                                className="flex items-center gap-2"
                              >
                                <Send className="h-4 w-4" />
                                Envoyer devis
                              </Button>
                              <Button 
                                variant="outline"
                                onClick={() => handleStatusChange(selectedQuote.id, 'accepted')}
                                className="flex items-center gap-2"
                              >
                                <CheckCircle className="h-4 w-4" />
                                Marquer accepté
                              </Button>
                              <Button variant="ghost" asChild>
                                <a href={`tel:${selectedQuote.phone}`}>
                                  <Phone className="h-4 w-4 mr-2" />
                                  Appeler
                                </a>
                              </Button>
                              {selectedQuote.email && (
                                <Button variant="ghost" asChild>
                                  <a href={`mailto:${selectedQuote.email}?subject=Devis VSG PNEUS - ${selectedQuote.customerName}`}>
                                    <Mail className="h-4 w-4 mr-2" />
                                    Email
                                  </a>
                                </Button>
                              )}
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
                        <DropdownMenuItem onClick={() => handleStatusChange(quote.id, 'sent')}>
                          <Send className="h-4 w-4 mr-2" />
                          Envoyer devis
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(quote.id, 'accepted')}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Marquer accepté
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(quote.id, 'declined')}>
                          <XCircle className="h-4 w-4 mr-2" />
                          Marquer refusé
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

      {quotes.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Aucune demande de devis pour le moment</p>
        </div>
      )}
    </div>
  )
}
