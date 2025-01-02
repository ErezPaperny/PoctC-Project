import { notification } from 'antd'

type NotificationStatus = 'success' | 'error' | 'warning'

interface NotifyUserParams {
  status: NotificationStatus
  message: string
  description?: string
}

export const notifyUser = ({
  status,
  message,
  description,
}: NotifyUserParams): void => {
  return status === 'success'
    ? notification.success({
        message,
        description,
        placement: 'topRight',
        duration: 3,
      })
    : status === 'error'
    ? notification.error({
        message,
        description,
        placement: 'top',
        duration: 6,
      })
    : notification.warning({
        message,
        description,
        placement: 'topRight',
        duration: 3,
      })
}
