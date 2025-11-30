import { useState, useEffect, useContext } from 'react'
import { AuthContext } from 'react-oauth2-code-pkce'
import { GitLabService } from '@/services/GitLabService'
import type { Repo } from '@/models/Repo'

export const useRepoList = () => {
  const { token } = useContext(AuthContext)
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (token) {
      setLoading(true)
      GitLabService.getRepositories(token)
        .then(setRepos)
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false))
    }
  }, [token])

  return { repos, loading, error }
}
