import * as React from "react";
import {
  type LinksFunction,
  type LoaderFunction,
  type MetaFunction,
  useLoaderData,
  useTransition,
  Meta,
  Links,
  Scripts,
  LiveReload,
  useCatch,
} from "remix";
import { Link, Outlet } from "react-router-dom";
import { SSRProvider } from "@react-aria/ssr";
import NProgress from "nprogress";
import classNames from "classnames";

import tailwindStyles from "./styles/tailwind.css";
import globalStyles from "./styles/global.css";
import NProgressStyles from "./styles/nprogress.css";
import responsiveStyles from "./styles/responsive.css";
import { getUserSession } from "./lib/auth/session.server";

export const links: LinksFunction = () => {
  return [
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "https://notey.caspertheghost.me/icons/apple-touch-icon.png",
    },

    {
      rel: "shortcut icon",
      type: "image/x-icon",
      href: "https://notey.caspertheghost.me/icons/notey-app-144.png",
    },

    { rel: "manifest", href: "https://notey.caspertheghost.me/manifest.json" },
    { rel: "stylesheet", href: tailwindStyles },
    { rel: "stylesheet", href: globalStyles },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Assistant:wght@200;300;400;500;600;700;800&display=swap",
    },
    { rel: "stylesheet", href: NProgressStyles },
    { rel: "stylesheet", href: responsiveStyles },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUserSession(request);
  return { user };
};

export const meta: MetaFunction = () => ({
  viewport: "width=device-width, initial-scale=1",
  "google-site-verification": "6LqjGmq_LshCupZ3FdR3meDNGaWcBjRG2snvcRtclSc",
  "og:image": "https://notey.caspertheghost.me/icons/notey-app-144.png",
});

function Document({ children, title }: { children: React.ReactNode; title?: string }) {
  const { user } = useLoaderData() ?? {};
  const transition = useTransition();

  React.useEffect(() => {
    // when the state is idle then we can to complete the progress bar
    if (transition.state === "idle") NProgress.done();
    // and when it's something else it means it's either submitting a form or
    // waiting for the loaders of the next location so we start it
    else NProgress.start();
  }, [transition.state]);

  return (
    <html lang="en" dir="ltr">
      <head>
        <meta charSet="utf-8" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body
        className={classNames(
          !user?.id || user?.preferences?.cursorPointers ? "cursors-pointer" : "cursors-default",
          (!user?.id || user?.preferences?.darkTheme) && "dark",
        )}
      >
        <SSRProvider>{children}</SSRProvider>
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  switch (caught.status) {
    case 401:
    case 404:
      return (
        <Document title={`${caught.status} ${caught.statusText}`}>
          <main className="p-5">
            <h1>
              {caught.status} {caught.statusText}
            </h1>

            <Link className="underline" to="/app">
              Return to app
            </Link>
          </main>
        </Document>
      );

    default:
      throw new Error(`Unexpected caught response with status: ${caught.status}`);
  }
}

export function ErrorBoundary({ error }: { error: Error }) {
  const isDev = process.env.NODE_ENV === "development";

  return (
    <Document title="Uh-oh!">
      <main className="p-5">
        <h1 className="mb-5 text-3xl font-bold">App Error</h1>

        <span className="text-lg">
          {isDev ? (
            <pre>{error.message}</pre>
          ) : (
            <p>An unexpected error occurred. Please reload the page or try again later.</p>
          )}
        </span>
      </main>
    </Document>
  );
}
