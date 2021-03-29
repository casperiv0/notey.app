import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";

class NoteyDoc extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Assistant:wght@200;300;400;600;700;800&display=swap"
            as="style"
            rel="preload"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Assistant:wght@200;300;400;600;700;800&display=swap"
            rel="stylesheet"
          />
          <meta charSet="utf-8" />
          <meta
            name="google-site-verification"
            content="6LqjGmq_LshCupZ3FdR3meDNGaWcBjRG2snvcRtclSc"
          />
          <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
          <meta name="theme-color" content="#1D1E2C" />
          <meta property="og:color" content="#1D1E2C" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://notey.caspertheghost.me" />
          <meta property="og:title" content="Notey.app - Keep track of important things" />
          <meta property="og:image" content="/icons/notey-app-128.svg" />
          <meta property="og:description" content="Notey.app - Keep track of important things" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:creator" content="@casper124578" />
          <meta name="twitter:description" content="Notey.app - Keep track of important things" />
          <meta name="twitter:title" content="Notey.app" />
          <meta property="og:site_name" content="notey.caspertheghost.me" />
          <meta name="description" content="Simple notes app to keep track of important things." />
          <meta
            name="keywords"
            content="Dev-CasperTheGhost, caspertheghost, notes, note, note.app, app, notey.app"
          />
          <link rel="shortcut icon" href="/icons/notey-app-144.png" type="image/x-icon" />
          <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default NoteyDoc;
