import '../assets/main.css';
import '../assets/chrome-bug.css';

import { useEffect } from 'react';
import Layout from '../components/Layout';
import { UserContextProvider } from '../components/UserContext';
import Head from 'next/head';
import { useRouter } from 'next/router';

import LogRocket from 'logrocket';
LogRocket.init('tsvmer/twitter-dms');

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    document.body.classList?.remove('loading');
  }, []);

  return (
    <>
      <Head>
        <script
          async
          defer
          data-website-id="eecb8cae-de75-4d09-ab0a-0a6af7c82e99"
          src="https://data.drew.tech/umami.js"
        ></script>
      </Head>
      <div className="bg-primary">
        <UserContextProvider>
          <Layout useFooter={true} useNavbar={true}>
            <Component {...pageProps} />
          </Layout>
        </UserContextProvider>
      </div>
    </>
  );
}
