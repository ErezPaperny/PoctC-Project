import { UserTypeSelectionFormItem } from '@/components/userType'
import { Button, Checkbox, Col, Form, Input, Row, Space } from 'antd'

export const UsersFilter = ({
  callback,
}: Readonly<{
  callback: (formOutput: {
    userName: string
    userType: string
    active: boolean
  }) => void
}>) => {
  const [form] = Form.useForm()

  const formStyle: React.CSSProperties = {
    maxWidth: 'none',
    background: 'white',
    padding: 0,
  }

  const handleCallback = ({
    userName = '',
    userType = '',
    active = true,
  }: {
    userName: string
    userType: string
    active?: boolean
  }) => {
    callback({ userName, userType, active })
  }

  return (
    <Form
      form={form}
      name="searchLine"
      style={formStyle}
      onFinish={handleCallback}
    >
      <Row gutter={25}>
        <Col span={6} key={1}>
          <Form.Item name="userName" label="Name" style={{ marginBottom: 0 }}>
            <Input placeholder="User name" />
          </Form.Item>
        </Col>
        <Col span={6} key={2}>
          <UserTypeSelectionFormItem label="Type" />
        </Col>
        <Col span={4} key={3}>
          <Form.Item
            label="Active Only"
            name="active"
            valuePropName="checked"
            style={{ marginBottom: 0 }}
          >
            <Checkbox defaultChecked />
          </Form.Item>
        </Col>
        <Col span={8} key={4} style={{ textAlign: 'right' }}>
          <Space size="small">
            <Button type="primary" htmlType="submit">
              Search
            </Button>
            <Button
              onClick={() => {
                form.resetFields()
              }}
            >
              Clear
            </Button>
          </Space>
        </Col>
      </Row>
    </Form>
  )
}
