import axios from 'axios'
import type { Repo } from '@/models/Repo'

export class GitLabService {
  private static API_URL = import.meta.env.VITE_GITLAB_API_URL

  static async getRepositories(
    token: string,
    page: number = 1,
    perPage: number = 6
  ): Promise<{ data: Repo[]; total: number }> {
    const response = await axios.get<Repo[]>(`${this.API_URL}/projects`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        membership: true,
        simple: true,
        page,
        per_page: perPage,
      },
    })

    // GitLab sends pagination info in headers
    const total = parseInt(response.headers['x-total'] || '0', 10)

    return { data: response.data, total }
  }

  static async createProject(
    token: string,
    name: string,
    description: string,
    initializeWithReadme: boolean = false
  ): Promise<Repo> {
    if (!name) {
      throw new Error('Project name is required')
    }
    const response = await axios.post<Repo>(
      `${this.API_URL}/projects`,
      {
        name,
        path: name.toLowerCase().replace(/\s+/g, '-'), // Slugify name for path
        description,
        visibility: 'private', // Default to private for security
        initialize_with_readme: initializeWithReadme,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
    return response.data
  }

  static async getUser(token: string): Promise<any> {
    const response = await axios.get(`${this.API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  }
}
