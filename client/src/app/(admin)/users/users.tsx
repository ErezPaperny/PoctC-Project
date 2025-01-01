import { Divider, Layout, Menu } from 'antd'
import { AppHeader } from '@/components/appHeader'
import { PageHeader } from '@/components/pageHeader'
import { UsersFilter } from './usersFilter'

export const Users = () => {
  const { Content, Sider } = Layout

  return (
    <Layout>
      <AppHeader />
      <Layout>
        <Sider
          width={200}
          style={{
            background: 'black',
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{
              height: '100%',
              borderRight: 0,
            }}
            items={[
              { key: '1', label: 'Users' },
              { key: '2', label: 'Categories' },
              { key: '3', label: 'Stores' },
            ]}
          />
        </Sider>
        <Layout
          style={{
            padding: '0 24px 24px',
          }}
        >
          <PageHeader
            items={[{ title: 'Users' }]}
            actionText="Add User"
            actionCallback={() => alert('OK')}
          />
          <Content
            style={{
              padding: 24,
              margin: 0,
              height: 'calc(100vh - 142px)',
              background: 'white',
              borderRadius: '8px',
            }}
          >
            <UsersFilter
              callback={(formOutput) => console.log({ formOutput })}
            />
            <Divider />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}
