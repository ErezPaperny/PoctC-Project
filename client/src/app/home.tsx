import { Button, Flex, Layout } from 'antd'
import { HomeHeader } from './homeHeader'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'

export function Home() {
  const [message, setMessage] = useState('Loading...')
  const { Header, Footer, Content } = Layout
  const { user, error, isLoading } = useUser()

  useEffect(() => {
    fetch('http://localhost:5000')
      .then((data) => data.text())
      .then((dataText) => setMessage(JSON.parse(dataText).message))
  })

  return (
    <Layout style={{ height: '100vh' }}>
      <Header></Header>
      <Content>
        <div style={{ height: '300px' }}>
          <Flex vertical gap={'space-between'}>
            <HomeHeader />
            {message}
            <Button>
              <Link href="./users">User List</Link>
            </Button>
            <br/>
            {isLoading ? <>Auth0 Loading</> : error ? <>Error - {error.message}</> : user ? <>Welcome {user.name}</> : <>Not logged in</>}
            <br/>
            {!isLoading && !user ? (
              <Button>
                <Link href="./api/auth/login">Login</Link>
              </Button>
            ) : (
              <Button>
                <Link href="./api/auth/logout">Logout</Link>
              </Button>
            )}
          </Flex>
        </div>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  )
}
