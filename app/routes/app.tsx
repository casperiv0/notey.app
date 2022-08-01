import * as React from "react";
import { json, LoaderFunction, MetaFunction, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import type { Category, Note } from "@prisma/client";
import { Layout } from "~/components/Layout";
import { CreditsModal } from "~/components/modal/CreditsModal";
import { useUser } from "~/lib/auth/user";
import { getUserSession } from "~/lib/auth/session.server";
import { prisma } from "~/lib/prisma.server";
import { KeyboardShortcutsModal } from "~/components/modal/KeyboardShortcuts";
import { DefaultLoaderReturn } from "~/root";

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

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (firstNote && url.pathname === "/app") {
    return redirect(`/app/${firstNote.id}`);
  }

  return json({ user, categories, noCategoryNotes });
};

interface AppLoaderReturn extends DefaultLoaderReturn<false> {
  categories: (Category & { notes: Note[] })[];
  noCategoryNotes: Note[];
}

export default function App() {
  const { user } = useLoaderData<unknown>() as AppLoaderReturn;
  const { setUser, user: stateUser } = useUser();

  React.useEffect(() => {
    setUser(user);
  }, [setUser, user]);

  if (!stateUser.id) {
    return null;
  }

  return (
    <Layout>
      <Outlet />

      <CreditsModal />
      <KeyboardShortcutsModal />
    </Layout>
  );
}

export function getNotesFromCategories(categories: { notes: Note[] }[]) {
  return categories.reduce((ac, cv) => [...ac, ...cv.notes], [] as Note[]);
}
