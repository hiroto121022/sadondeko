import { AppProps } from "next/app";
import { ThirdwebProvider } from "thirdweb/react";
import { AnimatePresence } from 'framer-motion'
import "../styles/index.css";
import Script from "next/script";
import Head from "next/head";
import * as gtag from "../lib/gtag";
import { useRouter } from "next/router";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const handleRouterChange = (url: any) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouterChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouterChange);
    };
  }, [router.events]);

  return (
    <ThirdwebProvider>
      <AnimatePresence mode="wait">
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_MEASUREMENT_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${gtag.GA_MEASUREMENT_ID}');
            `,
          }}
        />
        <Component key={router.asPath} {...pageProps} />
      </AnimatePresence>
    </ThirdwebProvider>
  )
}

export default MyApp;
