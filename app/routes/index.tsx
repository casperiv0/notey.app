import classNames from "classnames";
import * as React from "react";
import { Link } from "react-router-dom";
import { redirect, json, LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ShowCase } from "~/components/Showcase";
import { useUser } from "~/lib/auth/user";
import { getUserSession } from "~/lib/auth/session.server";
import type { DefaultLoaderReturn } from "~/root";

export const meta: MetaFunction = () => ({
  description: "A simple notes app to keep track of important things.",
  title: "Notey.app - Keep track of important things",
});

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUserSession(request);
  if (!user) {
    return redirect("/auth/login");
  }

  return json({ user });
};

export default function Index() {
  const { user } = useLoaderData() as DefaultLoaderReturn;
  const { setUser } = useUser();

  const minHeight = user ? "calc(100vh - 5rem - 6.5rem)" : "calc(100vh - 5rem - 9.5rem)";

  React.useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [setUser, user]);

  return (
    <main className="flex items-center justify-center px-5 lg:px-0">
      <div id="content" className="flex flex-col w-full max-w-5xl dark:bg-dark">
        <nav className="flex items-center justify-between h-16">
          <h1 className="text-2xl font-bold md:text-3xl">Notey.app</h1>

          <ul className="flex items-center space-x-4">
            {user ? (
              <Link
                className="p-1 px-3 transition-colors rounded-md cursor-default bg-gray-400/50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-dark-3 hover:bg-gray-400 dark:hover:bg-dark-4"
                to="/app"
              >
                Open app
              </Link>
            ) : (
              <>
                <Link className="hover:underline" to="/auth/login">
                  Login
                </Link>
                <Link
                  className="p-1 px-3 transition-colors rounded-md cursor-default bg-gray-400/50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-dark-3 hover:bg-gray-400 dark:hover:bg-dark-4"
                  to="/auth/register"
                >
                  Register
                </Link>
              </>
            )}
          </ul>
        </nav>

        <div
          style={{ minHeight }}
          className="flex flex-col w-full mt-10 md:justify-between md:flex-row md:items-center md:gap-2"
          id="hero"
        >
          <div className="md:w-1/2">
            <h1 className="mb-5 text-4xl font-bold md:font-black md:text-5xl lg:text-6xl">
              Keep track of important things
            </h1>
            <h2 className="mb-5 text-2xl font-normal text-dark-4 dark:text-gray-400">
              Notes app to keep track of the most important things securely and easily.
            </h2>

            {user ? (
              <Link
                className="text-lg p-1 px-3 transition-colors rounded-md cursor-default bg-gray-400/50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-dark-3 hover:bg-gray-400 dark:hover:bg-dark-4"
                to="/app"
              >
                Open app
              </Link>
            ) : (
              <Link
                className="text-lg p-1 px-3 transition-colors rounded-md cursor-default bg-gray-400/50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-dark-3 hover:bg-gray-400 dark:hover:bg-dark-4"
                to="/auth/login"
              >
                Login
              </Link>
            )}
          </div>

          <div className="md:w-1/2">
            <ShowCase className="w-full" />
          </div>
        </div>

        <footer
          className={classNames(
            "flex items-center justify-between text-lg",
            user ? "h-20" : "h-32",
          )}
        >
          <p>
            Created by{" "}
            <a href="https://caspertheghost.me" className="underline">
              CasperTheGhost
            </a>{" "}
            with{" "}
            <a href="https://remix.run" className="underline">
              Remix.run
            </a>
          </p>

          <ul>
            {user ? (
              <li>
                <Link className="underline" to="/app">
                  Open App
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link className="underline" to="/auth/login">
                    Login
                  </Link>
                </li>
                <li>
                  <Link className="underline" to="/auth/register">
                    Register
                  </Link>
                </li>
              </>
            )}
            <li>
              <a href="https://github.com/dev-caspertheghost/notey.app" className="underline ">
                GitHub
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </main>
  );
}
