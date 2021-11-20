import { redirect } from "remix";
import type { LoaderFunction, ActionFunction } from "remix";
import { prisma } from "~/lib/prisma.server";
import { handleMethods } from "~/lib/utils/handleMethods";
import { getBodySafe } from "~/lib/utils/body";
import { z } from "zod";
import { badRequest, unauthorized } from "remix-utils";
import { getUserSession } from "~/lib/auth/session.server";
import { idSchema } from "./category";

const updateSchema = z.object({
  id: z.string().min(10),
  title: z.string().min(2).max(40),
  categoryId: z.string().optional(),
});

const createSchema = z.object({
  title: z.string().min(2).max(40),
  categoryId: z.string().optional(),
});

export const action: ActionFunction = async ({ request }) => {
  const user = await getUserSession(request);
  if (!user) {
    return unauthorized("Must be authenticated");
  }

  return handleMethods(request, {
    async put() {
      const [{ title, id, categoryId }, error] = await getBodySafe(request, updateSchema);

      if (error) {
        return badRequest(error);
      }

      return prisma.note.update({
        where: { id },
        data: { title, categoryId: parseCategoryId(categoryId) },
      });
    },
    async post() {
      const [{ title, categoryId }, error] = await getBodySafe(request, createSchema);

      if (error) {
        return badRequest(error);
      }

      return prisma.note.create({
        data: {
          title,
          categoryId: parseCategoryId(categoryId),
          body: "Hello world",
          userId: user.id,
        },
      });
    },
    async delete() {
      const [{ id }, error] = await getBodySafe(request, idSchema);

      if (error) {
        return badRequest(error);
      }

      return prisma.note.delete({
        where: { id },
      });
    },
  });
};

export const loader: LoaderFunction = async ({ request }) => {
  const urlSearch = new URL(request.url).searchParams;
  const next = urlSearch.get("next");

  if (next) {
    return redirect(next);
  }

  return redirect("/app");
};

export default function Note() {
  return null;
}

function parseCategoryId(id: "null" | (string & {}) | undefined) {
  return id === "null" ? null : id;
}
