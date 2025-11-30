import { useAuth } from '@/controllers/useAuth'

const Profile = () => {
  const { tokenData } = useAuth()

  if (!tokenData) {
    return null
  }

  return (
    <div className="flex items-center gap-4 p-4 bg-gray-700/50 rounded-lg border border-gray-700">
      {tokenData.picture && (
        <img 
          src={tokenData.picture as string} 
          alt={tokenData.name as string} 
          className="w-12 h-12 rounded-full border-2 border-blue-500" 
        />
      )}
      <div className="flex-1 min-w-0">
        <h2 className="text-white font-semibold truncate">{tokenData.name as string}</h2>
        <p className="text-gray-400 text-sm truncate">{tokenData.email as string}</p>
      </div>
    </div>
  )
}

export default Profile
