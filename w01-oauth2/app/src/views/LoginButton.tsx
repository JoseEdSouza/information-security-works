import { useAuth } from '@/controllers/useAuth'
import { Button } from 'antd'
import { GitlabOutlined } from '@ant-design/icons'

interface LoginButtonProps {
  scope?: string
  label?: string
}

const LoginButton = ({ scope, label }: LoginButtonProps) => {
  const { logIn } = useAuth()

  const handleLogin = () => {
    if (scope) {
      sessionStorage.setItem('auth_scope', scope || '')
    }
    logIn(undefined, scope ? { scope } : undefined)
  }

  return (
    <Button
      type="primary"
      size="large"
      icon={<GitlabOutlined />}
      onClick={handleLogin}
      block
    >
      {label || 'Log In with GitLab'}
    </Button>
  )
}

export default LoginButton
