import { Button, Flex, Layout } from 'antd'
import { HomeHeader } from './homeHeader'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export function Home() {
  const [message, setMessage] = useState('Loading...')
  useEffect(() => {
    fetch('http://localhost:5000')
      .then((data) => data.text())
      .then((dataText) => setMessage(JSON.parse(dataText).message))
  })

  const { Header, Footer, Content } = Layout

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
          </Flex>
        </div>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  )
}
