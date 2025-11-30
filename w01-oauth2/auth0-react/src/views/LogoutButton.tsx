import { useAuth } from '@/controllers/useAuth'

const LogoutButton = () => {
  const { logOut } = useAuth()

  return (
    <div onClick={() => logOut()} style={{ cursor: 'pointer', width: '100%' }}>
      Log Out
    </div>
  )
}

export default LogoutButton
