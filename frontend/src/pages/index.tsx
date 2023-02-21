import Head from 'next/head';
import { Button } from 'antd';

export default function Home() {
  return (
    <>
      <Head>
        <title>Spring Next.js Gcash Demo</title>
        <meta name='description' content='Spring Next.js Gcash Demo' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div>
        <Button type='primary'>testButton</Button>
      </div>
    </>
  );
}
