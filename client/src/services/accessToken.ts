import axios from 'axios'

export const getAccessToken = async (): Promise<string | undefined> => {
  const options = {
    method: 'POST',
    url: 'https://dev-twmpec4n6uralfn2.us.auth0.com/oauth/token',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || '',
      client_secret: process.env.NEXT_PUBLIC_AUTH0_CLIENT_SECRET || '',
      audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE || '',
    }),
  }

  const response = await axios.request(options)

  return response?.data.access_token
}
