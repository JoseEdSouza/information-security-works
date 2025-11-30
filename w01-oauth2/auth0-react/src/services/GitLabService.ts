import axios from 'axios'
import type { Repo } from '@/models/Repo'

export class GitLabService {
  private static API_URL = import.meta.env.VITE_GITLAB_API_URL

  static async getRepositories(token: string): Promise<Repo[]> {
    const response = await axios.get<Repo[]>(
      `${this.API_URL}/projects?membership=true&simple=true&order_by=updated_at`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    return response.data
  }
}
