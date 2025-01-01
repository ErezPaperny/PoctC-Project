import { Button, Checkbox, Col, Form, Input, Row, Select, Space } from 'antd'

export const UsersFilter = ({
  callback,
}: Readonly<{
  callback: (formOutput: {
    name: string
    type: string
    active: boolean
  }) => void
}>) => {
  const [form] = Form.useForm()
  const { Option } = Select

  const formStyle: React.CSSProperties = {
    maxWidth: 'none',
    background: 'white',
    padding: 0,
  }

  const handleCallback = ({
    name = '',
    type = '',
    active = true,
  }: {
    name: string
    type: string
    active?: boolean
  }) => {
    callback({ name, type, active })
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
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: false,
              },
            ]}
            style={{ marginBottom: 0 }}
          >
            <Input placeholder="User name" />
          </Form.Item>
        </Col>
        <Col span={6} key={2}>
          <Form.Item
            name="type"
            label="Type"
            rules={[
              {
                required: false,
              },
            ]}
            style={{ marginBottom: 0 }}
          >
            <Select>
              <Option value="admin">Admin</Option>
              <Option value="employee">Employee</Option>
              <Option value="buyer">Buyer</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={4} key={3}>
          <Form.Item
            label="Active"
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
