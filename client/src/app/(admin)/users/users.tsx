import { getSession } from '@auth0/nextjs-auth0'
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Image } from 'antd'

async function _Users() {
  const session = await getSession();
  const user = session ? session.user : null;

  return (
    <div style={{ height: '100vh' }}>
      <header>Header of Users</header>
      <main>
        Main area of the Users:
        <br />
        Welcome -
        <br />
        {user && (
          <div>
            <Image src={user.picture} alt={user.name} />
            <h2>Name : {user.name}</h2>
            <p>Email : {user.email}</p>
          </div>
        )}
      </main>
      <footer>Footer of Users</footer>
    </div>
  )
}

export const Users = withPageAuthRequired(_Users, { returnTo: './error' });
