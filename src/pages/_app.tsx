import { AppProps } from 'next/app';
import Head from 'next/head';

import '@/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{`Dégustation à l'aveugle`}</title>
      </Head>
      <Component {...pageProps} />
      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div {
          min-height: 100%;
        }
      `}</style>
    </>
  );
}

export default MyApp;
