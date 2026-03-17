import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    
    // Récupérer le mot de passe depuis les variables d'environnement côté serveur
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
    
    if (!ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Configuration serveur manquante' },
        { status: 500 }
      )
    }
    
    if (!password) {
      return NextResponse.json(
        { error: 'Mot de passe requis' },
        { status: 400 }
      )
    }
    
    // Vérifier le mot de passe
    if (password === ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: true, message: 'Authentification réussie' },
        { status: 200 }
      )
    } else {
      return NextResponse.json(
        { error: 'Mot de passe incorrect' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Erreur lors de l\'authentification:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
