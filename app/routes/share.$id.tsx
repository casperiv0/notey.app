import { Link, redirect, useLoaderData } from "remix";
import type { Note, User } from ".prisma/client";
import type { LinksFunction, MetaFunction, LoaderFunction } from "remix";
import { prisma } from "~/lib/prisma.server";

import previewStyles from "~/styles/preview-styles.css";
import { getUserSession } from "~/lib/auth/session.server";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: previewStyles }];

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

  if (!note) {
    return redirect("/app");
  }

  const user = await getUserSession(request);

  return { note, user };
};

export default function SharedNote() {
  const { user, note } = useLoaderData<{ note: Note; user: User | null }>();

  return (
    <main>
      <header className="border-b-[1.5px] border-dark-4 p-3 sticky top-0 flex items-center justify-between">
        <div className="space-x-2">
          {user ? (
            <Link to="/app" className="link">
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

      <div
        style={{ maxHeight: "calc(100vh - 3.55rem)", overflowY: "auto" }}
        className="w-full px-4 py-2 text-lg bg-dark preview-styles"
        id="note-preview-area"
        dangerouslySetInnerHTML={{ __html: note?.markdown as string }}
      />
    </main>
  );
}

export function CatchBoundary() {
  return <div>oh no!</div>;
}
