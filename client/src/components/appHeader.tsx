import { Avatar, Image, Layout } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useUser } from '@auth0/nextjs-auth0/client'
import { AppHeaderText } from './appHeaderText'

export const AppHeader = () => {
  const { Header } = Layout
  const { user, isLoading } = useUser()

  return (
    <Header>
      <div
        style={{
          display: 'flex',
          gap: 'space-between',
          width: '100%',
          height: '100%',
        }}
      >
        <div>
          <Image
            src={'/papaBayLogo.svg'}
            alt="logo"
            width={'80px'}
            height={'50px'}
          />
        </div>
        <div style={{ flex: '1 1' }}></div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <AppHeaderText>
            Hello: {!isLoading && user ? user.name : 'Loading ...'}
          </AppHeaderText>
          <Avatar
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.65)',
            }}
            icon={isLoading || !user ? <UserOutlined /> : undefined}
            src={!isLoading && user ? (user.picture as string) : undefined}
          />
        </div>
      </div>
    </Header>
  )
}
