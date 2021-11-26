import * as React from "react";
import type { MetaFunction, LoaderFunction } from "remix";
import type { Note } from ".prisma/client";
import { Outlet, useLoaderData, redirect } from "remix";
import { Layout } from "~/components/Layout";
import { CreditsModal } from "~/components/modal/CreditsModal";
import { useUser } from "~/lib/auth/auth";
import { getUserSession } from "~/lib/auth/session.server";
import { prisma } from "~/lib/prisma.server";

export const meta: MetaFunction = () => ({
  description: "A simple notes app to keep track of important things.",
  title: "Notey.app - Keep track of important things",
});

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUserSession(request);
  if (!user) {
    return redirect("/auth/login");
  }

  const [categories, noCategoryNotes] = await Promise.all([
    await prisma.category.findMany({
      where: {
        userId: user.id,
      },
      include: {
        notes: true,
      },
    }),

    await prisma.note.findMany({
      where: {
        categoryId: null,
        userId: user.id,
      },
    }),
  ]);

  const [firstNote] = getNotesFromCategories([...categories, { notes: noCategoryNotes }]);
  const url = new URL(request.url);

  if (firstNote && url.pathname === "/app") {
    return redirect(`/app/${firstNote.id}`);
  }

  return { user, categories, noCategoryNotes };
};

export default function App() {
  const { user } = useLoaderData();
  const { setUser, user: stateUser } = useUser();

  React.useEffect(() => {
    setUser(user);
  }, [setUser, user]);

  if (!stateUser?.id) {
    return null;
  }

  return (
    <Layout>
      <div className="responsive-app">
        <Outlet />
      </div>

      <CreditsModal />
    </Layout>
  );
}

function getNotesFromCategories(categories: { notes: Note[] }[]) {
  return categories.reduce((ac, cv) => [...ac, ...cv.notes], [] as Note[]);
}
