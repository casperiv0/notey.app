import process from "node:process";
import { redirect, type LinksFunction, type MetaFunction, type LoaderFunction } from "remix";
import { Navbar } from "~/components/navbar/Navbar";
import { prisma } from "~/lib/prisma.server";
import { Editor } from "~/components/editor/Editor";

import previewStyles from "~/styles/preview-styles.css";
import { UnsavedChangesModal } from "~/components/modal/UnsavedChangesModal";
import { withLockedNotes } from "~/lib/utils/note.server";
import { useShortcuts } from "~/lib/useShortcuts";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: previewStyles }];

export const meta: MetaFunction = ({ data }) => {
  const note = data?.note;

  const title = note?.title ? `${note.title} - Notey.app` : "Notey.app";
  const description = "A simple notes app to keep track of important things.";

  return {
    title,
    description,
  };
};

export const loader: LoaderFunction = async ({ params }) => {
  const id = params.id;
  const note = id
    ? await prisma.note.findUnique({
        where: { id },
      })
    : null;

  if (!note) {
    return redirect("/app");
  }

  return { note: withLockedNotes(note) };
};

export default function App() {
  useShortcuts();

  return (
    <div>
      <Navbar />
      <Editor />

      <UnsavedChangesModal />
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  const isDev = process.env.NODE_ENV === "development";

  return (
    <main className="p-5">
      <h1 className="mb-5 text-3xl font-bold">Whoops!</h1>

      <span className="text-lg">
        {isDev ? (
          <pre className="px-4 p-1.5 mb-2 dark:bg-dark-2 bg-gray-300 rounded-md font-mono">
            {error.message}
          </pre>
        ) : null}

        <p>Could not load the editor. Please reload the page or try again later.</p>
      </span>
    </main>
  );
}
