import { Avatar, Image, Layout, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useUser } from '@auth0/nextjs-auth0/client'

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
          <Typography.Title
            level={4}
            style={{
              color: 'white',
              textWrap: 'nowrap',
              alignContent: 'start',
              textAlign: 'center',
            }}
          >
            Hello: {!isLoading && user ? user.name : 'Loading ...'}
          </Typography.Title>
          <Avatar
            style={{
              backgroundColor: '#87d068',
            }}
            icon={isLoading || !user ? <UserOutlined /> : undefined}
            src={!isLoading && user ? (user.picture as string) : undefined}
          />
        </div>
      </div>
    </Header>
  )
}
