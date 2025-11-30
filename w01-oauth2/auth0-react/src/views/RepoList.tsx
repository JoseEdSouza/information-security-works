import { useRepoList } from '@/controllers/useRepoList'

const RepoList = () => {
  const { repos, loading, error } = useRepoList()

  if (loading) return <div className="text-gray-400 text-center py-8">Loading repositories...</div>
  if (error) return <div className="text-red-400 text-center py-8 bg-red-500/10 rounded-lg border border-red-500/20">Error loading repositories: {error}</div>

  return (
    <div className="w-full mt-8">
      <h2 className="text-xl font-semibold text-white mb-6 border-l-4 border-blue-500 pl-4">Your Repositories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {repos.map((repo) => (
          <div key={repo.id} className="bg-white/5 border border-white/10 rounded-lg p-6 hover:-translate-y-1 hover:shadow-lg hover:bg-white/10 transition-all duration-200">
            <a
              href={repo.web_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <h3 className="text-xl font-medium text-blue-400 group-hover:text-blue-300 mb-2">{repo.name}</h3>
            </a>
            <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
              {repo.description || 'No description'}
            </p>
            <div className="flex items-center text-gray-500 text-sm">
              <span className="flex items-center gap-1">⭐ {repo.star_count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RepoList
