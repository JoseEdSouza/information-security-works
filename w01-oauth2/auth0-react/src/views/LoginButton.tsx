import { useAuth } from '@/controllers/useAuth'

interface LoginButtonProps {
  scope?: string
  label?: string
}

const LoginButton = ({ scope, label }: LoginButtonProps) => {
  const { logIn } = useAuth()

  const handleLogin = () => {
    if (scope) {
      logIn(undefined, { scope: scope as string })
    } else {
      logIn()
    }
  }

  return (
    <button 
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2" 
      onClick={handleLogin}
    >
      {label || 'Log In with GitLab'}
    </button>
  )
}

export default LoginButton
