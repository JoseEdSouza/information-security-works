import { useState, useEffect } from 'react'
import { useAuth } from '@/controllers/useAuth'
import LogoutButton from './LogoutButton'
import UserProfileModal from './UserProfileModal'
import { GitLabService } from '@/services/GitLabService'
import {
  Layout,
  Dropdown,
  Avatar,
  Tag,
  Space,
  Typography,
  Button,
  Spin,
} from 'antd'
import {
  UserOutlined,
  LogoutOutlined,
  DownOutlined,
  GitlabOutlined,
  BulbOutlined,
  BulbFilled,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'

const { Header } = Layout
const { Text } = Typography

interface NavbarProps {
  isDarkMode: boolean
  toggleTheme: () => void
}

const Navbar = ({ isDarkMode, toggleTheme }: NavbarProps) => {
  const { token } = useAuth()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const scope = sessionStorage.getItem('auth_scope')
  const isManager = scope?.includes('api')

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const user = await GitLabService.getUser(token)
          setUserData(user)
        } catch (error) {
          console.error('Failed to fetch user data', error)
        } finally {
          setLoading(false)
        }
      }
    }
    fetchUser()
  }, [token])

  const menuItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: 'My Profile',
      icon: <UserOutlined />,
      onClick: () => setIsProfileOpen(true),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: <LogoutButton />,
      icon: <LogoutOutlined />,
    },
  ]

  return (
    <>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          background: isDarkMode ? '#292961' : '#ffffff', // GitLab Dark Blue / White
          borderBottom: isDarkMode ? 'none' : '1px solid #e5e5e5',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              color: isDarkMode ? 'white' : '#292961',
              fontSize: 20,
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <GitlabOutlined style={{ fontSize: 24, color: '#FC6D26' }} />
            GitLab <span style={{ color: '#FC6D26' }}>Viewer</span>
          </div>
          {isManager && <Tag color="blue">MANAGER</Tag>}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Button
            type="text"
            icon={
              isDarkMode ? (
                <BulbFilled style={{ color: 'white' }} />
              ) : (
                <BulbOutlined />
              )
            }
            onClick={toggleTheme}
          />

          <Dropdown menu={{ items: menuItems }} trigger={['click']}>
            <Button
              type="text"
              style={{
                height: 64,
                color: isDarkMode ? 'white' : 'rgba(0, 0, 0, 0.85)',
                display: 'flex',
                alignItems: 'center',
                padding: '0 12px',
              }}
            >
              <Space>
                {loading ? (
                  <Spin size="small" />
                ) : (
                  <>
                    <Avatar
                      src={userData?.avatar_url}
                      icon={<UserOutlined />}
                    />
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        lineHeight: 1.2,
                        marginRight: 4,
                      }}
                    >
                      <Text
                        style={{
                          color: isDarkMode ? 'white' : 'rgba(0, 0, 0, 0.85)',
                          fontWeight: 500,
                        }}
                      >
                        {userData?.name || 'User'}
                      </Text>
                      <Text
                        type="secondary"
                        style={{
                          color: isDarkMode
                            ? 'rgba(255,255,255,0.65)'
                            : 'rgba(0, 0, 0, 0.45)',
                          fontSize: 12,
                        }}
                      >
                        {userData?.email || 'No email'}
                      </Text>
                    </div>
                    <DownOutlined
                      style={{
                        fontSize: 12,
                        color: isDarkMode
                          ? 'rgba(255,255,255,0.65)'
                          : 'rgba(0, 0, 0, 0.45)',
                      }}
                    />
                  </>
                )}
              </Space>
            </Button>
          </Dropdown>
        </div>
      </Header>

      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userData={userData}
      />
    </>
  )
}

export default Navbar
