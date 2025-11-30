import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // Importing the main CSS file
import App from '@/App'
import { AuthProvider, type TAuthConfig } from 'react-oauth2-code-pkce'

const authConfig: TAuthConfig = {
  clientId: import.meta.env.VITE_GITLAB_CLIENT_ID,
  authorizationEndpoint: import.meta.env.VITE_GITLAB_AUTH_URL,
  tokenEndpoint: import.meta.env.VITE_GITLAB_TOKEN_URL,
  redirectUri: import.meta.env.VITE_GITLAB_REDIRECT_URI,
  scope: 'read_user read_api',
  autoLogin: false,
  storage: 'session',
  // decodeToken: false,
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider authConfig={authConfig}>
      <App />
    </AuthProvider>
  </StrictMode>
)
