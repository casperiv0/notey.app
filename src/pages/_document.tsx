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
          <meta charSet="utf-8" />
          <meta
            name="google-site-verification"
            content="6LqjGmq_LshCupZ3FdR3meDNGaWcBjRG2snvcRtclSc"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="https://notey.caspertheghost.me/icons/apple-touch-icon.png"
          />
          <meta name="theme-color" content="#1D1E2C" />
          <meta
            property="og:image"
            content="https://notey.caspertheghost.me/icons/notey-app-144.png"
          />

          <link
            rel="shortcut icon"
            href="https://notey.caspertheghost.me/icons/notey-app-144.png"
            type="image/x-icon"
          />
          <link rel="manifest" href="https://notey.caspertheghost.me/manifest.json" />
        </Head>

        <body>
          {/* "fix" FOUC */}
          <script>0</script>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default NoteyDoc;
