import { useState, useEffect } from 'react'
import { useAuth } from '@/controllers/useAuth'
import LoginButton from '@/views/LoginButton'
import RepoList from '@/views/RepoList'
import CreateRepoModal from '@/views/CreateRepoModal'
import Navbar from '@/views/Navbar'
import {
  Layout,
  Spin,
  Alert,
  Button,
  Typography,
  Card,
  Divider,
  Space,
  ConfigProvider,
  theme,
} from 'antd'
import {
  PlusOutlined,
  GitlabOutlined,
  BulbOutlined,
  BulbFilled,
} from '@ant-design/icons'

const { Content, Footer } = Layout
const { Title, Text } = Typography

function App() {
  const { token, loginInProgress, error } = useAuth()
  const [showCreateRepo, setShowCreateRepo] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const scope = sessionStorage.getItem('auth_scope')
  const isManager = scope?.split(' ').includes('api')

  useEffect(() => {
    // Apply body background based on theme
    document.body.style.backgroundColor = isDarkMode ? '#1f1e24' : '#f0f2f5'
  }, [isDarkMode])

  const gitlabTheme = {
    token: {
      colorPrimary: '#FC6D26', // GitLab Orange
      colorLink: '#1068BF',
      colorInfo: '#1068BF',
      colorSuccess: '#108548',
      colorWarning: '#D97706',
      colorError: '#DB3B21',
    },
    algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
  }

  if (loginInProgress) {
    return (
      <ConfigProvider theme={gitlabTheme}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: isDarkMode ? '#1f1e24' : '#f0f2f5',
          }}
        >
          <Spin size="large" tip="Authenticating..." />
        </div>
      </ConfigProvider>
    )
  }

  if (error) {
    return (
      <ConfigProvider theme={gitlabTheme}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: isDarkMode ? '#1f1e24' : '#f0f2f5',
          }}
        >
          <Alert
            message="Authentication Error"
            description={error}
            type="error"
            showIcon
            style={{ maxWidth: 400 }}
          />
        </div>
      </ConfigProvider>
    )
  }

  return (
    <ConfigProvider theme={gitlabTheme}>
      <Layout style={{ height: '100vh' }}>
        {token ? (
          <>
            <Navbar
              isDarkMode={isDarkMode}
              toggleTheme={() => setIsDarkMode(!isDarkMode)}
            />
            <Content
              style={{
                padding: '24px 50px',
                maxWidth: 1200,
                margin: '0 auto',
                width: '100%',
                overflowY: 'auto', // Ensure scrolling
                flex: 1,
                scrollbarWidth: 'thin', // Firefox
                scrollbarColor: 'transparent transparent', // Firefox hover effect handled by CSS if possible, or just thin
              }}
              className="custom-scrollbar"
            >
              {isManager && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginBottom: 24,
                  }}
                >
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    size="large"
                    onClick={() => setShowCreateRepo(true)}
                  >
                    New Project
                  </Button>
                </div>
              )}

              <CreateRepoModal
                isOpen={showCreateRepo}
                onClose={() => setShowCreateRepo(false)}
                onSuccess={() => {
                  setShowCreateRepo(false)
                  window.location.reload()
                }}
              />

              <RepoList isDarkMode={isDarkMode} />
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              GitLab Viewer ©{new Date().getFullYear()} Created with Ant Design
            </Footer>
          </>
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              background: isDarkMode ? '#1f1e24' : '#f0f2f5',
            }}
          >
            <Card
              style={{
                width: 400,
                textAlign: 'center',
                borderRadius: 12,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}
            >
              <div style={{ position: 'absolute', top: 16, right: 16 }}>
                <Button
                  type="text"
                  icon={isDarkMode ? <BulbFilled /> : <BulbOutlined />}
                  onClick={() => setIsDarkMode(!isDarkMode)}
                />
              </div>
              <div style={{ marginBottom: 24 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: 16,
                  }}
                >
                  <GitlabOutlined style={{ fontSize: 64, color: '#FC6D26' }} />
                </div>
                <Title level={2} style={{ margin: '12px 0 0' }}>
                  GitLab Viewer
                </Title>
                <Text type="secondary">Securely access your repositories</Text>
              </div>

              <Space
                direction="vertical"
                style={{ width: '100%' }}
                size="large"
              >
                <LoginButton
                  label="Login as Viewer"
                  scope="openid profile email read_user read_api"
                />
                <Divider plain>OR</Divider>
                <LoginButton
                  label="Login as Manager"
                  scope="openid profile email read_user api"
                />
              </Space>
            </Card>
          </div>
        )}
      </Layout>
    </ConfigProvider>
  )
}

export default App
