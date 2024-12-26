import { Button, Layout } from 'antd'
import { HomeHeader } from './homeHeader';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function Home() {
  const [message, setMessage] = useState('Loading...');
  useEffect(() => { 
    fetch('http://localhost:5000').
      then((data) => data.text()).
      then((dataText) => setMessage(JSON.parse(dataText).message));
  });

  const { Header, Footer, Content } = Layout;

  return (
    <Layout>
      <Header></Header>
      <Content>
        <HomeHeader />
        <h1>{message}</h1>
        <Button><Link href='./users'>User List</Link></Button>
      </Content>
    <Footer>Footer</Footer>
  </Layout>
  )
}
