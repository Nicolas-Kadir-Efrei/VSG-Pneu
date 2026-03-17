// Types pour les données
export interface Appointment {
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

export interface Quote {
  id: string
  customerName: string
  phone: string
  email?: string
  service: string
  vehicle?: string
  vehicleDetails?: {
    marque?: string
    modele?: string
    annee?: string
  }
  numberOfTires?: string
  tireDimensions?: string
  preferredBrand?: string
  maxBudget?: string
  hasOwnTires?: string
  urgency: 'flexible' | 'semaine' | 'rapide' | 'urgent'
  status: 'pending' | 'sent' | 'accepted' | 'declined'
  message?: string
  createdAt: string
}

// Clés pour le localStorage
const APPOINTMENTS_KEY = 'vsg_appointments'
const QUOTES_KEY = 'vsg_quotes'

// Fonctions pour les rendez-vous
export const getAppointments = (): Appointment[] => {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(APPOINTMENTS_KEY)
    console.log('getAppointments - localStorage brut:', stored)
    if (stored) {
      const parsed = JSON.parse(stored)
      console.log('getAppointments - données parsées:', parsed)
      return parsed
    }
  } catch (error) {
    console.error('Erreur lors de la lecture des rendez-vous:', error)
  }
  
  // Dashboard vierge par défaut
  console.log('getAppointments - retour tableau vide')
  return []
}

export const saveAppointment = (appointment: Omit<Appointment, 'id' | 'createdAt' | 'status'>): Appointment => {
  console.log('saveAppointment appelé avec:', appointment)
  
  const appointments = getAppointments()
  console.log('Appointments existants:', appointments)
  
  const newAppointment: Appointment = {
    ...appointment,
    id: Date.now().toString(),
    status: 'pending',
    createdAt: new Date().toISOString()
  }
  
  console.log('Nouveau appointment créé:', newAppointment)
  
  appointments.push(newAppointment)
  
  if (typeof window !== 'undefined') {
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments))
    console.log('Sauvegardé dans localStorage, total appointments:', appointments.length)
    
    // Vérification immédiate
    const verification = localStorage.getItem(APPOINTMENTS_KEY)
    console.log('Vérification localStorage après sauvegarde:', verification)
  }
  
  return newAppointment
}

export const updateAppointmentStatus = (id: string, status: Appointment['status']): void => {
  const appointments = getAppointments()
  const index = appointments.findIndex(apt => apt.id === id)
  
  if (index !== -1) {
    appointments[index].status = status
    if (typeof window !== 'undefined') {
      localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments))
    }
  }
}

// Fonctions pour les devis
export const getQuotes = (): Quote[] => {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(QUOTES_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Erreur lors de la lecture des devis:', error)
  }
  
  // Dashboard vierge par défaut
  return []
}

export const saveQuote = (quote: Omit<Quote, 'id' | 'createdAt' | 'status'>): Quote => {
  const quotes = getQuotes()
  
  const newQuote: Quote = {
    ...quote,
    id: Date.now().toString(),
    status: 'pending',
    createdAt: new Date().toISOString()
  }
  
  quotes.push(newQuote)
  
  if (typeof window !== 'undefined') {
    localStorage.setItem(QUOTES_KEY, JSON.stringify(quotes))
  }
  
  return newQuote
}

export const updateQuoteStatus = (id: string, status: Quote['status']): void => {
  const quotes = getQuotes()
  const index = quotes.findIndex(quote => quote.id === id)
  
  if (index !== -1) {
    quotes[index].status = status
    if (typeof window !== 'undefined') {
      localStorage.setItem(QUOTES_KEY, JSON.stringify(quotes))
    }
  }
}

// Fonction pour générer des statistiques
export const getStats = () => {
  const appointments = getAppointments()
  const quotes = getQuotes()
  
  return {
    totalAppointments: appointments.length,
    pendingAppointments: appointments.filter(a => a.status === 'pending').length,
    totalQuotes: quotes.length,
    pendingQuotes: quotes.filter(q => q.status === 'pending').length,
    todayAppointments: appointments.filter(a => a.date === new Date().toISOString().split('T')[0]).length,
    urgentRequests: [...appointments, ...quotes].filter(item => 
      item.urgency === 'urgente' || item.urgency === 'urgent'
    ).length
  }
}
