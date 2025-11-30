import { useContext } from 'react'
import { AuthContext } from 'react-oauth2-code-pkce'

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
