import { Button, Flex, Layout } from 'antd'
import { HomeHeader } from './homeHeader'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import axios from 'axios'

export function Home() {
  const [message, setMessage] = useState('Loading...')
  const [messagePrivate, setMessagePrivate] = useState('Loading...')
  const [messagePrivatePre, setMessagePrivatePre] = useState('Loading...')
  const [accessToken, setAccessToken] = useState()
  const { Header, Footer, Content } = Layout
  const { user, error, isLoading } = useUser()
  const client_id = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || ''
  const client_secret = process.env.NEXT_PUBLIC_AUTH0_CLIENT_SECRET || ''
  const audience = process.env.NEXT_PUBLIC_AUTH0_AUDIENCE || ''

  useEffect(() => {
    const options = {
      method: 'POST',
      url: 'https://dev-twmpec4n6uralfn2.us.auth0.com/oauth/token',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id,
        client_secret,
        audience,
      }),
    }

    if (user) {
      axios
        .request(options)
        .then((response) => setAccessToken(response.data.access_token))
    }
  }, [user])

  useEffect(() => {
    axios
      .get('http://localhost:5000')
      .then((dataText) => setMessage(dataText.data.message))
  }, [])

  useEffect(() => {
    if (accessToken) {
      const optionsGet = {
        method: 'GET',
        url: 'http://localhost:5000/private',
        headers: { authorization: `Bearer ${accessToken}` },
      }

      axios
        .request(optionsGet)
        .then((dataText) => setMessagePrivate(dataText.data.message))
    }
  }, [accessToken])

  useEffect(() => {
    if (accessToken) {
      const optionsGet = {
        method: 'GET',
        url: 'http://localhost:5000/private-scope',
        headers: {
          authorization: `Bearer ${accessToken}`,
          scope: 'read:messages',
        },
      }

      axios
        .request(optionsGet)
        .then((dataText) => setMessagePrivatePre(dataText.data.message))
    }
  }, [accessToken])

  return (
    <Layout style={{ height: '100vh' }}>
      <Header></Header>
      <Content>
        <div style={{ height: '300px' }}>
          <Flex vertical gap={'space-between'}>
            <HomeHeader />
            Public : {message}
            <br />
            Private : {messagePrivate}
            <br />
            Private With Premission : {messagePrivatePre}
            <Button>
              <Link href="./users">User List</Link>
            </Button>
            <br />
            {isLoading ? (
              <>Auth0 Loading</>
            ) : error ? (
              <>Error - {error.message}</>
            ) : user ? (
              <>Welcome {user.name}</>
            ) : (
              <>Not logged in</>
            )}
            <br />
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
