import { Link } from "react-router-dom";
import { MetaFunction, LoaderFunction, useLoaderData } from "remix";
import { ShowCase } from "~/components/Showcase";
import { getUserSession } from "~/lib/auth/session.server";

export const meta: MetaFunction = () => ({
  description: "A simple notes app to keep track of important things.",
  title: "Notey.app - Keep track of important things",
});

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUserSession(request);

  return user;
};

export default function Index() {
  const user = useLoaderData();

  return (
    <main className="flex items-center justify-center px-5 lg:px-0">
      <div className="flex flex-col w-full max-w-5xl bg-dark">
        <nav className="flex items-center justify-between h-16">
          <h1 className="text-2xl font-bold md:text-3xl">Notey.app</h1>

          <ul className="flex items-center space-x-4" role="list">
            {user ? (
              <>
                <Link className="link" to="/app">
                  Open app
                </Link>
              </>
            ) : (
              <>
                <Link className="cursor-pointer hover:underline" to="/auth/login">
                  Login
                </Link>
                <Link className="link" to="/auth/login">
                  Register
                </Link>
              </>
            )}
          </ul>
        </nav>

        <div
          className="flex flex-col w-full mt-10 md:justify-between md:flex-row md:items-center md:gap-2"
          id="hero"
        >
          <div className="md:w-1/2">
            <h1 className="mb-5 text-4xl font-bold md:font-black md:text-5xl lg:text-6xl">
              Keep track of important things
            </h1>
            <h3 className="mb-5 text-2xl font-normal text-gray-400">
              Notes app to keep track of the most important things securely and easily.
            </h3>

            {user ? (
              <Link className="text-lg link large" to="/app">
                Open app
              </Link>
            ) : (
              <Link className="text-lg link large" to="/auth/login">
                Login
              </Link>
            )}
          </div>

          <div className="md:w-1/2">
            <ShowCase className="w-full" />
          </div>
        </div>
      </div>
    </main>
  );
}
