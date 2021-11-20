import { redirect } from "remix";
import type { MetaFunction, LoaderFunction } from "remix";
import { Navbar } from "~/components/navbar/Navbar";
import { prisma } from "~/lib/prisma.server";

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

  return { note };
};

export default function App() {
  return (
    <div>
      <Navbar />
    </div>
  );
}