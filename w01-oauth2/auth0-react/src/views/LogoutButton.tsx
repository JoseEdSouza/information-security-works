import { useAuth } from '@/controllers/useAuth'

const LogoutButton = () => {
  const { logOut } = useAuth()

  return (
    <button 
      className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 font-medium py-2 px-4 rounded-lg transition-colors duration-200 border border-red-500/20" 
      onClick={() => logOut()}
    >
      Log Out
    </button>
  )
}

export default LogoutButton
