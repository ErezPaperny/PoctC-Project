import { Button, Space, Tooltip } from 'antd'
import { CloseOutlined, EditOutlined, CheckOutlined } from '@ant-design/icons'

interface UsersListActionsEditableProps {
  onConfirmClicked: () => void
  onCancelClicked: () => void
}

export const UsersListActionsEditable: React.FC<
  UsersListActionsEditableProps
> = ({ onConfirmClicked, onCancelClicked }) => {
  return (
    <Space>
      <Tooltip title="Confirm Edit">
        <Button
          shape="circle"
          icon={<CheckOutlined />}
          onClick={onConfirmClicked}
        />
      </Tooltip>
      <Tooltip title="Cancel Edit">
        <Button
          shape="circle"
          icon={<CloseOutlined />}
          onClick={onCancelClicked}
        />
      </Tooltip>
    </Space>
  )
}

interface UsersListActionsEditProps {
  onEditClicked: () => void
}

export const UsersListActionsEdit: React.FC<UsersListActionsEditProps> = ({
  onEditClicked,
}) => {
  return (
    <Space>
      <Tooltip title="Change User Type">
        <Button
          onClick={onEditClicked}
          shape="circle"
          icon={<EditOutlined />}
        />
      </Tooltip>
    </Space>
  )
}
