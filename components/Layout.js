import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from './ui/Navbar';
import Footer from './ui/Footer';

export default function Layout({
  children,
  meta: pageMeta,
  useNavbar = true,
  useFooter = true
}) {
  const router = useRouter();
  const meta = {
    title: 'Plz DM Me',
    description: `Don't miss another important DM. Some of your most important conversations happen in direct
    messages. Manage your DMs like a power user.`,
    ...pageMeta
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta charSet="utf-8" />
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="robots" content="follow, index" />
        <link href="/favicon.ico" rel="shortcut icon" />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`https://bettertwitterdms.com${router.asPath}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta
          property="og:image"
          content={`https://bettertwitterdms.com/api/thumbnail?path=${router.asPath}`}
        />
        <meta
          property="twitter:image"
          content={`https://bettertwitterdms.com/api/thumbnail?path=${router.asPath}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@getBetterDMs" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta
          name="twitter:image"
          content={`https://bettertwitterdms.com/api/thumbnail?path=${router.asPath}`}
        />
      </Head>
      {useNavbar && <Navbar />}

      <div id="skip">{children}</div>
      {useFooter && <Footer />}
    </>
  );
}
