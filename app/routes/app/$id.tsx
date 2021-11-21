import { redirect } from "remix";
import type { LinksFunction, MetaFunction, LoaderFunction } from "remix";
import { Navbar } from "~/components/navbar/Navbar";
import { prisma } from "~/lib/prisma.server";
import { Editor } from "~/components/editor/Editor";

import previewStyles from "~/styles/preview-styles.css";
import { UnsavedChangesModal } from "~/components/modal/UnsavedChangesModal";
import { withLockedNotes } from "~/lib/utils/note.server";

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
  return (
    <div>
      <Navbar />
      <Editor />

      <UnsavedChangesModal />
    </div>
  );
}
