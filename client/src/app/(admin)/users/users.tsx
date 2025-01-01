'use client'

import '@ant-design/v5-patch-for-react-19'
import { Breadcrumb, Layout, Menu } from 'antd'
import { AppHeader } from '@/components/appHeader'

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
            items={[{key: '1', label: 'Users'},{key: '2', label: 'Categories'},{key: '3', label: 'Stores'}]}
          />
        </Sider>
        <Layout
          style={{
            padding: '0 24px 24px',
          }}
        >
          <Breadcrumb
            items={[
              {
                title: 'Home',
              },
              {
                title: 'List',
              },
              {
                title: 'App',
              },
            ]}
            style={{
              margin: '16px 0',
            }}
          />
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: 'black',
              borderRadius: '8px',
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}
