// Système d'authentification pour l'admin
export const checkAdminAuth = (): boolean => {
  if (typeof window === 'undefined') return false
  
  try {
    const authData = localStorage.getItem('vsg_admin_auth')
    if (!authData) return false
    
    const auth = JSON.parse(authData)
    const now = Date.now()
    
    // Vérifier si la session n'a pas expiré
    if (now > auth.expires) {
      localStorage.removeItem('vsg_admin_auth')
      return false
    }
    
    return auth.authenticated === true
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'authentification:', error)
    return false
  }
}

export const logout = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('vsg_admin_auth')
  }
}

export const extendSession = (): void => {
  if (typeof window === 'undefined') return
  
  try {
    const authData = localStorage.getItem('vsg_admin_auth')
    if (authData) {
      const auth = JSON.parse(authData)
      if (auth.authenticated) {
        // Étendre la session de 4 heures
        auth.expires = Date.now() + (4 * 60 * 60 * 1000)
        localStorage.setItem('vsg_admin_auth', JSON.stringify(auth))
      }
    }
  } catch (error) {
    console.error('Erreur lors de l\'extension de session:', error)
  }
}
