import { useState, useContext } from 'react'
import { AuthContext } from 'react-oauth2-code-pkce'
import { GitLabService } from '@/services/GitLabService'

export const useCreateRepo = (onSuccess?: () => void) => {
  const { token } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createRepo = async (
    name: string,
    description: string,
    initializeWithReadme: boolean = false
  ) => {
    if (!token) {
      setError('Not authenticated')
      return
    }

    setLoading(true)
    setError(null)

    try {
      await GitLabService.createProject(
        token,
        name,
        description,
        initializeWithReadme
      )
      if (onSuccess) onSuccess()
    } catch (err: any) {
      setError(err.message || 'Failed to create repository')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return { createRepo, loading, error }
}
