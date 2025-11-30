import { useAuth } from '@/controllers/useAuth'
import LoginButton from '@/views/LoginButton'
import LogoutButton from '@/views/LogoutButton'
import Profile from '@/views/Profile'
import RepoList from '@/views/RepoList'

function App() {
  const { token, loginInProgress, error } = useAuth()

  if (loginInProgress) {
    return (
      <div className="app-container">
        <div className="loading-state">
          <div className="loading-text">Loading authentication...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="app-container">
        <div className="error-state">
          <div className="error-title">Auth Error</div>
          <div className="error-message">{error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
        <h1 className="text-3xl font-bold text-center text-white py-8 border-b border-gray-700 bg-gray-800/50">
          GitLab Repo Viewer
        </h1>
        
        {token ? (
          <div className="p-6 space-y-6">
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-green-400 text-center font-medium flex items-center justify-center gap-2">
              ✅ Successfully authenticated!
            </div>
            <Profile />
            <LogoutButton />
            <RepoList />
          </div>
        ) : (
          <div className="p-8 space-y-8">
            <p className="text-gray-400 text-center text-lg">
              Sign in to view your repositories
            </p>
            <div className="space-y-4">
              <LoginButton 
                label="Login as Viewer (Read Only)" 
                scope="read_api read_user" 
              />
              <LoginButton 
                label="Login as Manager (Full Access)" 
                scope="api" 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
