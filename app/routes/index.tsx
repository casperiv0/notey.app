import { Link } from "react-router-dom";
import { MetaFunction, LoaderFunction, useLoaderData } from "remix";
import { useUser } from "~/lib/auth/auth";
import { getUserSession } from "~/lib/auth/session.server";

export let meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!",
  };
};

export let loader: LoaderFunction = async ({ request }) => {
  const user = await getUserSession(request);

  return user;
};

export default function Index() {
  const user = useLoaderData();

  return (
    <main>
      <nav className="flex items-center justify-between h-16 px-5 bg-dark">
        <h1 className="text-2xl font-semibold">Notey.app</h1>

        <ul className="flex items-center space-x-4" role="list">
          {user ? (
            <>
              <Link className="link" to="/app">
                Open app
              </Link>
            </>
          ) : (
            <>
              <Link className="cursor-pointer hover:underline" to="/auth/login">Login</Link>
              <Link className="link" to="/auth/login">
                Register
              </Link>
            </>
          )}
        </ul>
      </nav>

      <section id="hero"></section>
    </main>
  );
}
