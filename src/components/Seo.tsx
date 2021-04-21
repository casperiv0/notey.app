import * as React from "react";
import Head from "next/head";
import { OGP } from "react-ogp";

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
      <OGP
        title={tags.title!}
        description={tags.description!}
        url={tags.url!}
        siteName="notey.app"
        type="website"
        locale="en-US"
        image="/icons/notey-app-128.svg"
      />

      <meta name="twitter:title" content={tags.title} />
      <meta name="description" content={tags.description} />
      <meta name="twitter:description" content={tags.description} />

      <link rel="canonical" href={tags.url} />
      <title>{tags.title}</title>
      <meta name="keywords" content={[...DEFAULT_KEYWORDS, ...(tags?.keywords ?? [])].join(", ")} />
    </Head>
  );
};

export default Seo;
