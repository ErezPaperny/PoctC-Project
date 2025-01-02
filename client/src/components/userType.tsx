import { Form, Select } from 'antd'
import React from 'react'

interface UserTypeSelectionFormItemProps {
  label?: string
}

const typeSelectionMapping = [
  { value: 'admin', label: 'Admin' },
  { value: 'employee', label: 'Employee' },
  { value: 'buyer', label: 'Buyer' },
]

export const UserTypeSelectionFormItem: React.FC<
  UserTypeSelectionFormItemProps
> = ({ label }) => {
  const { Option } = Select

  return (
    <Form.Item
      name="userType"
      style={{ marginBottom: 0 }}
      label={label ? label : undefined}
    >
      <Select style={{ minWidth: '100px' }}>
        {typeSelectionMapping.map((item) => (
          <Option key={item.value} value={item.value}>
            {item.label}
          </Option>
        ))}
      </Select>
    </Form.Item>
  )
}

interface UserTypeDescriptionProps {
  value?: string
}

export const UserTypeListComponent: React.FC<UserTypeDescriptionProps> = ({
  value,
}) => typeSelectionMapping.find((item) => item.value === value)?.label || ''
