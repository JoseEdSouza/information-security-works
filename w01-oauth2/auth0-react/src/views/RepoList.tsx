import { useEffect, useState } from 'react'
import { useAuth } from '@/controllers/useAuth'
import { GitLabService } from '@/services/GitLabService'
import type { Repo } from '@/models/Repo'
import { List, Card, Typography, Alert, Tag, Space } from 'antd'
import {
  StarOutlined,
  ForkOutlined,
  EyeOutlined,
  CodeOutlined,
} from '@ant-design/icons'

const { Title, Paragraph } = Typography

interface RepoListProps {
  isDarkMode: boolean
}

const RepoList = ({ isDarkMode }: RepoListProps) => {
  const { token } = useAuth()
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Pagination state
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(12)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const fetchRepos = async () => {
      if (!token) return

      try {
        setLoading(true)
        const { data, total } = await GitLabService.getRepositories(
          token,
          page,
          pageSize
        )
        setRepos(data)
        setTotal(total)
        setError(null)
      } catch (err) {
        setError('Failed to fetch repositories')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
  }, [token, page, pageSize])

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />
  }

  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>
        Your Projects
      </Title>
      <List
        loading={loading}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 3,
          xxl: 3,
        }}
        dataSource={repos}
        pagination={{
          onChange: (page, pageSize) => {
            setPage(page)
            setPageSize(pageSize)
          },
          current: page,
          pageSize: pageSize,
          total: total,
          showSizeChanger: true,
          pageSizeOptions: ['6', '12', '24', '48'],
          align: 'center',
        }}
        renderItem={(repo) => (
          <List.Item>
            <Card
              title={repo.name}
              extra={
                <a
                  href={repo.web_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open
                </a>
              }
              hoverable
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
              bodyStyle={{ flex: 1, display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ marginBottom: 16 }}>
                <Tag color={repo.visibility === 'public' ? 'green' : 'orange'}>
                  {repo.visibility}
                </Tag>
                <Tag icon={<CodeOutlined />}>ID: {repo.id}</Tag>
              </div>

              <Paragraph
                ellipsis={{ rows: 2, expandable: false }}
                style={{ flex: 1, marginBottom: 16 }}
              >
                {repo.description || 'No description provided.'}
              </Paragraph>

              <Space
                size="large"
                style={{
                  color: isDarkMode
                    ? 'rgba(255, 255, 255, 0.65)'
                    : 'rgba(0, 0, 0, 0.45)',
                }}
              >
                <span>
                  <StarOutlined /> {repo.star_count}
                </span>
                <span>
                  <ForkOutlined /> {repo.forks_count}
                </span>
                <span>
                  <EyeOutlined /> Watch
                </span>
              </Space>
            </Card>
          </List.Item>
        )}
      />
    </div>
  )
}

export default RepoList
