import { redirect } from "remix";
import type { LoaderFunction, ActionFunction } from "remix";
import { prisma } from "~/lib/prisma.server";

export const action: ActionFunction = async ({ request }) => {
  const body = new URLSearchParams(await request.text());

  const id = body.get("id");
  const title = body.get("title");
  const rawCategoryId = body.get("categoryId");
  const categoryId = rawCategoryId && rawCategoryId === "null" ? null : rawCategoryId;

  if (id && title) {
    const note = await prisma.note.update({
      where: { id },
      data: { title, categoryId },
    });

    return redirect(`/app/${note.id}`);
  }

  const userId = await prisma.user.findUnique({
    where: { username: "CasperTheGhost" },
  });

  if (title) {
    const note = await prisma.note.create({
      data: {
        title,
        categoryId,
        body: "Hello world",
        userId: userId?.id!,
      },
    });

    return redirect(`/app/${note.id}`);
  }

  return null;
};

export const loader: LoaderFunction = async () => {
  return redirect("/app");
};

export default function Note() {
  return null;
}
