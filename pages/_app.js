import Navbar from "../components/Navbar";
import Head from "next/head";
import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import { useEffect } from "react";
import { useRouter } from "next/router";
import * as ga from "../lib/ga.js";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <title>Federico James Platero</title>
        <meta
          name="description"
          content="Página oficial del Platero Federico James"
        />
        <link
          rel="icon"
          sizes="32x64"
          href="/images/logo.ico"
          type="image/png"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="og:description"
          key="description"
          content="Página oficial del Platero Federico James"
        />
        <meta
          property="og:title"
          content="Federico James Platero"
          key="title"
        />
        <meta property="og:image" content="/images/logo.png" />
      </Head>
      <NextNProgress
        color="#1e3a8a"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
        options={{ showSpinner: false }}
      />
      <Navbar />
      <Component {...pageProps} />
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        strategy="worker"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
        `}
      </Script>
    </>
  );
}

export default MyApp;
