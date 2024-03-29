import * as React from "react";
import { json, LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  useCatch,
  useLoaderData,
  useTransition,
} from "@remix-run/react";
import { Link, Outlet } from "react-router-dom";
import { SSRProvider } from "@react-aria/ssr";
import NProgress from "nprogress";
import classNames from "classnames";

import tailwindStyles from "./styles/tailwind.css";
import globalStyles from "./styles/global.css";
import NProgressStyles from "./styles/nprogress.css";
import responsiveStyles from "./styles/responsive.css";
import { getUserSession } from "./lib/auth/session.server";
import { User, UserPreferences } from "@prisma/client";

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
  return json({ user });
};

export const meta: MetaFunction = () => ({
  viewport: "width=device-width, initial-scale=1",
  "google-site-verification": "6LqjGmq_LshCupZ3FdR3meDNGaWcBjRG2snvcRtclSc",
  "og:image": "https://notey.caspertheghost.me/icons/notey-app-144.png",
});

export interface DefaultLoaderReturn<UserNullable = true> {
  user: UserNullable extends true
    ? (User & { preferences?: UserPreferences }) | null
    : User & { preferences?: UserPreferences };
}

function Document({
  children,
  title,
  user,
}: {
  user: DefaultLoaderReturn["user"];
  children: React.ReactNode;
  title?: string;
}) {
  const transition = useTransition();

  const showCursorPointers = !user || !!user.preferences?.cursorPointers;
  const isDarkTheme = !user || !!user.preferences?.darkTheme;

  React.useEffect(() => {
    if (transition.state === "idle") {
      NProgress.done();
    } else {
      NProgress.start();
    }
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
          showCursorPointers ? "cursors-pointer" : "cursors-default",
          isDarkTheme && "dark",
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
  const { user } = useLoaderData() as DefaultLoaderReturn;

  return (
    <Document user={user}>
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
        <Document user={null} title={`${caught.status} ${caught.statusText}`}>
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
    <Document user={null} title="Uh-oh!">
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
