import type { LinksFunction, MetaFunction } from "remix";
import { Meta, Links, Scripts, LiveReload, useCatch } from "remix";
import { Outlet } from "react-router-dom";
import { SSRProvider } from "@react-aria/ssr";
import { IdProvider } from "@radix-ui/react-id";

import tailwindStyles from "./styles/tailwind.css";
import globalStyles from "./styles/global.css";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStyles },
    { rel: "stylesheet", href: globalStyles },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Assistant:wght@200;300;400;500;600;700;800&display=swap",
    },
  ];
};

export const meta: MetaFunction = () => ({
  viewport: "width=device-width",
});

function Document({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        <IdProvider>
          <SSRProvider>{children}</SSRProvider>
        </IdProvider>
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
          <h1>
            {caught.status} {caught.statusText}
          </h1>
        </Document>
      );

    default:
      throw new Error(`Unexpected caught response with status: ${caught.status}`);
  }
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return (
    <Document title="Uh-oh!">
      <h1>App Error</h1>
      <pre>{error.message}</pre>
      <p>Replace this UI with what you want users to see when your app throws uncaught errors.</p>
    </Document>
  );
}
