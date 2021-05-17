import * as React from "react";
import Head from "next/head";

interface Props {
  title?: string;
  description?: string;
  keywords?: string[];
  url?: string;
}

// these should be displayed on all pages.
const DEFAULT_KEYWORDS = [
  "Dev-CasperTheGhost",
  "caspertheghost",
  "notes",
  "notes app",
  "notey.app",
];

const defaults: Props = {
  title: "Notey.app - Keep track of important things",
  url: "https://notey.caspertheghost.me",
  description: "A simple notes app to keep track of important things.",
  keywords: [],
};

const Seo: React.FC<Props> = (props) => {
  const tags = {
    ...defaults,
    ...props,
  };

  return (
    <Head>
      <title>{tags.title}</title>
      <meta name="twitter:title" content={tags.title} />
      <meta property="og:site_name" content={tags.title} />
      <meta property="og:title" content={tags.title} />

      <meta name="description" content={tags.description} />
      <meta property="og:description" content={tags.description} />
      <meta name="twitter:description" content={tags.description} />

      <link rel="canonical" href={tags.url} />
      <meta property="og:url" content={tags.url} />
      <meta property="og:site_name" content="notey.caspertheghost.me" />

      <meta property="og:color" content="#1D1E2C" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content="@casper124578" />
      <meta property="twitter:domain" content="notey.caspertheghost.me" />
      <meta property="twitter:url" content="https://notey.caspertheghost.me" />
      <meta
        name="twitter:image"
        content="https://notey.caspertheghost.me/icons/notey-app-144.png"
      />

      <meta name="keywords" content={[...DEFAULT_KEYWORDS, ...(tags?.keywords ?? [])].join(", ")} />
    </Head>
  );
};

export default Seo;
