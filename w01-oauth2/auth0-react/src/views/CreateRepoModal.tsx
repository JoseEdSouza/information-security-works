import { useState } from 'react'
import {
  Modal,
  Steps,
  Form,
  Input,
  Button,
  Switch,
  Typography,
  Alert,
  theme,
  message,
} from 'antd'
import { useCreateRepo } from '@/controllers/useCreateRepo'
import { ProjectOutlined, SettingOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

interface CreateRepoModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

const CreateRepoModal = ({
  isOpen,
  onClose,
  onSuccess,
}: CreateRepoModalProps) => {
  const { createRepo, loading, error } = useCreateRepo(onSuccess)
  const [currentStep, setCurrentStep] = useState(0)
  const [form] = Form.useForm()
  const { token } = theme.useToken()

  const handleNext = async () => {
    try {
      // Validate fields only for the current step's form items
      if (currentStep === 0) {
        await form.validateFields(['name', 'description'])
      }
      setCurrentStep(currentStep + 1)
    } catch (error) {
      // Form validation failed, error message will be displayed by Ant Design Form.Item
    }
  }

  const handlePrev = () => setCurrentStep(currentStep - 1)

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      await createRepo(values.name, values.description, values.initReadme)
      // Reset is handled by onSuccess usually, but we can do it here too
      form.resetFields()
      setCurrentStep(0)
    } catch (error: any) {
      message.error(error.message || 'Failed to create project')
    }
  }

  const steps = [
    {
      title: 'Details',
      icon: <ProjectOutlined />,
    },
    {
      title: 'Settings',
      icon: <SettingOutlined />,
    },
  ]

  return (
    <Modal
      title="Create New Project"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <Steps current={currentStep} items={steps} />

      <div style={{ marginTop: 24, minHeight: 200 }}>
        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}

        <Form
          form={form}
          layout="vertical"
          initialValues={{ initReadme: false }}
        >
          <div style={{ display: currentStep === 0 ? 'block' : 'none' }}>
            <Form.Item
              name="name"
              label="Project Name"
              rules={[
                { required: true, message: 'Please enter a project name' },
              ]}
            >
              <Input placeholder="my-awesome-project" autoFocus />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea
                placeholder="What is this project about?"
                rows={4}
              />
            </Form.Item>
          </div>

          <div style={{ display: currentStep === 1 ? 'block' : 'none' }}>
            <div style={{ marginTop: 20 }}>
              <Title level={5}>Review & Configure</Title>
              <Form.Item noStyle shouldUpdate>
                {() => (
                  <div
                    style={{
                      background: token.colorFillAlter,
                      padding: 16,
                      borderRadius: 8,
                      marginBottom: 24,
                      border: `1px solid ${token.colorBorder}`,
                    }}
                  >
                    <Text strong>Name: </Text>
                    <Text>{form.getFieldValue('name')}</Text>
                    <br />
                    <Text strong>Description: </Text>
                    <Text>{form.getFieldValue('description') || 'None'}</Text>
                  </div>
                )}
              </Form.Item>

              <Form.Item
                name="initReadme"
                label="Initialize with README"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <Text type="secondary">
                This will create a main branch with an initial README.md file.
              </Text>
            </div>
          </div>
        </Form>
      </div>

      <div
        style={{
          marginTop: 24,
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 8,
        }}
      >
        {currentStep > 0 && <Button onClick={handlePrev}>Previous</Button>}
        {currentStep < steps.length - 1 && (
          <Button type="primary" onClick={handleNext}>
            Next
          </Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button type="primary" onClick={handleSubmit} loading={loading}>
            Create Project
          </Button>
        )}
      </div>
    </Modal>
  )
}

export default CreateRepoModal
