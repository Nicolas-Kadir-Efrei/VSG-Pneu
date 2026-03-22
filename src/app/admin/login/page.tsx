'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { checkAdminAuth, logout } from '@/lib/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isAlreadyLoggedIn, setIsAlreadyLoggedIn] = useState(false)
  const router = useRouter()

  // Vérifier si l'utilisateur est déjà connecté
  useEffect(() => {
    const isAuthenticated = checkAdminAuth()
    setIsAlreadyLoggedIn(isAuthenticated)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Appeler l'API route pour vérifier le mot de passe côté serveur
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Stocker l'authentification dans le localStorage avec expiration
        const authData = {
          authenticated: true,
          timestamp: Date.now(),
          expires: Date.now() + (4 * 60 * 60 * 1000) // 4 heures
        }
        localStorage.setItem('vsg_admin_auth', JSON.stringify(authData))
        
        // Rediriger vers le dashboard
        router.push('/admin')
      } else {
        setError(data.error || 'Erreur lors de la connexion')
        setPassword('')
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error)
      setError('Erreur de connexion au serveur')
    }
    
    setIsLoading(false)
  }

  const handleLogout = () => {
    logout()
    setIsAlreadyLoggedIn(false)
    setPassword('')
    setError('')
  }

  const goToDashboard = () => {
    router.push('/admin')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center">
            <Lock className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Administration VSG PNEUS
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Accès sécurisé au dashboard administrateur
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {isAlreadyLoggedIn ? 'Session Active' : 'Connexion Admin'}
            </CardTitle>
            <CardDescription>
              {isAlreadyLoggedIn 
                ? 'Vous êtes déjà connecté au dashboard administrateur'
                : 'Entrez le mot de passe administrateur pour accéder au dashboard'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isAlreadyLoggedIn ? (
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 text-green-800">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">Session active</span>
                  </div>
                  <p className="text-sm text-green-700 mt-1">
                    Vous êtes connecté en tant qu'administrateur
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <Button onClick={goToDashboard} className="flex-1">
                    Accéder au Dashboard
                  </Button>
                  <Button onClick={handleLogout} variant="outline">
                    Se déconnecter
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="password">Mot de passe administrateur</Label>
                  <div className="mt-1 relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pr-10"
                      placeholder="Entrez le mot de passe"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-red-600 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading || !password}
                >
                  {isLoading ? 'Vérification...' : 'Se connecter'}
                </Button>
              </form>
            )}

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="text-sm font-semibold text-blue-800 mb-2">
                Informations de sécurité
              </h4>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Session valide pendant 4 heures</li>
                <li>• Déconnexion automatique après inactivité</li>
                <li>• Accès restreint aux données sensibles</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            VSG PNEUS - Dashboard Administrateur Sécurisé
          </p>
        </div>
      </div>
    </div>
  )
}
