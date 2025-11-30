import { Modal, Avatar, Descriptions, Button, Typography, Space } from 'antd'
import { UserOutlined, GitlabOutlined, MailOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

interface UserProfileModalProps {
  isOpen: boolean
  onClose: () => void
  userData: any
}

const UserProfileModal = ({
  isOpen,
  onClose,
  userData,
}: UserProfileModalProps) => {
  if (!userData) return null

  return (
    <Modal
      title={
        <Space>
          <GitlabOutlined style={{ color: '#FC6D26' }} />
          <span>User Profile</span>
        </Space>
      }
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
      width={600}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: 24,
        }}
      >
        <Avatar
          size={100}
          src={userData.avatar_url}
          icon={<UserOutlined />}
          style={{ marginBottom: 16 }}
        />
        <Title level={3} style={{ margin: 0 }}>
          {userData.name}
        </Title>
        <Text type="secondary">@{userData.username}</Text>
      </div>

      <Descriptions bordered column={1}>
        <Descriptions.Item label="Name">{userData.name}</Descriptions.Item>
        <Descriptions.Item label="Username">
          {userData.username}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <Space>
              <MailOutlined /> Email
            </Space>
          }
        >
          {userData.email || 'Not public'}
        </Descriptions.Item>
        <Descriptions.Item label="GitLab Profile">
          <a href={userData.web_url} target="_blank" rel="noopener noreferrer">
            {userData.web_url}
          </a>
        </Descriptions.Item>
        <Descriptions.Item label="ID">{userData.id}</Descriptions.Item>
      </Descriptions>
    </Modal>
  )
}

export default UserProfileModal
