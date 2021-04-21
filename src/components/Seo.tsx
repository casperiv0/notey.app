import * as React from "react";
import Head from "next/head";

interface Props {
  title?: string;
  description?: string;
  keywords?: string[];
  url?: string;
}

// These should be displayed on all pages.
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

      <meta name="keywords" content={[...DEFAULT_KEYWORDS, ...(tags?.keywords ?? [])].join(", ")} />
    </Head>
  );
};

export default Seo;
