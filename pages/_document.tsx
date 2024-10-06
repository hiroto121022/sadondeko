import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Zen+Antique+Soft&display=swap"/>
        <script defer src="https://use.fontawesome.com/releases/v5.15.4/js/all.js"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
