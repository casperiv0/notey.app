import * as React from "react";
import { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import type { Note, User } from ".prisma/client";
import { prisma } from "~/lib/prisma.server";

import { getUserSession } from "~/lib/auth/session.server";
import { Editor } from "~/components/editor/Editor";
import { useUser } from "~/lib/auth/user";

export const meta: MetaFunction = ({ data }) => {
  const note = data?.note;

  const title = note?.title ? `${note?.title} - Notey.app` : "Notey.app";
  const description = "A simple notes app to keep track of important things.";

  return {
    title,
    description,
  };
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const id = params.id;
  const note = id
    ? await prisma.note.findFirst({
        where: { id, public: true, pinCodeLocked: false },
      })
    : null;

  const user = await getUserSession(request);

  return { note, user };
};

export default function SharedNote() {
  const { setUser } = useUser();
  const { user, note } = useLoaderData<unknown>() as { note: Note | null; user: User | null };

  React.useEffect(() => {
    user && setUser(user);
  }, [user]); // eslint-disable-line

  const appLink = user?.id === note?.userId && user && note ? `/app/${note.id}` : "/app";

  return (
    <main>
      <header className="border-b-[1.5px] bg-gray-100 dark:bg-dark border-dark-4 p-3 sticky top-0 flex flex-col sm:flex-row gap-2 items-center justify-between">
        <div className="space-x-2">
          {user ? (
            <Link to={appLink} className="link">
              Return to app
            </Link>
          ) : (
            <>
              <Link to="/auth/login" className="link">
                Login
              </Link>

              <Link to="/auth/register" className="link">
                Register
              </Link>
            </>
          )}
        </div>

        <div>
          Notey.app created by{" "}
          <a className="underline" href="https://caspertheghost.me">
            CasperTheGhost
          </a>
        </div>
      </header>

      {note ? (
        <Editor isShare overwrite={{ note, editMode: false }} />
      ) : (
        <p className="mt-10 text-lg font-medium text-center">Note not found.</p>
      )}
    </main>
  );
}

export function CatchBoundary() {
  return <div>oh no!</div>;
}
