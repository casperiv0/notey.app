import { redirect, type LoaderFunction, type ActionFunction } from "remix";
import { prisma } from "~/lib/prisma.server";
import { handleMethods } from "~/lib/utils/handleMethods";
import { getBodySafe } from "~/lib/utils/body";
import { z } from "zod";
import { badRequest, unauthorized, notFound } from "remix-utils";
import { getUserSession } from "~/lib/auth/session.server";
import { idSchema } from "./category";

export const booleanLike = z
  .string()
  .regex(/true|false/)
  .optional()
  .default("false");

const updateSchema = z.object({
  id: z.string().min(10),
  title: z.string().min(2).max(40),
  categoryId: z.string().optional(),
  body: z.string().optional(),
  isPublic: booleanLike,
  pinCodeLocked: booleanLike,
});

const createSchema = z.object({
  title: z.string().min(2).max(40),
  categoryId: z.string().optional(),
  body: z.string().optional(),
  isPublic: booleanLike,
});

export const action: ActionFunction = async ({ request }) => {
  const user = await getUserSession(request);
  if (!user) {
    return unauthorized("Must be authenticated");
  }

  return handleMethods(request, {
    async put() {
      const [{ title, id, categoryId, body, pinCodeLocked, isPublic }, error] = await getBodySafe(
        request,
        updateSchema,
      );

      if (error) {
        return badRequest(error);
      }

      const note = await prisma.note.findUnique({
        where: { id },
      });

      if (!note) {
        return notFound("note not found");
      }

      const parsedBody = typeof body === "string" ? JSON.parse(body) : body;

      return prisma.note.update({
        where: { id },
        data: {
          title,
          categoryId: parseCategoryId(categoryId),
          body: parsedBody,
          pinCodeLocked: pinCodeLocked === "true",
          public: isPublic === "true",
        },
      });
    },
    async post() {
      const url = new URL(request.url);
      const isClone = Boolean(url.searchParams.get("is-clone"));
      const [{ title, categoryId, body, isPublic }, error] = await getBodySafe(
        request,
        createSchema,
      );

      if (error) {
        return badRequest(error);
      }

      const parsedBody = typeof body === "string" ? JSON.parse(body) : body;
      let newTitle = title;

      if (isClone) {
        const count = await prisma.note.count({
          where: { title },
        });

        if (count > 0) {
          newTitle = `${title} ${count + 1}`;
        }
      }

      const note = await prisma.note.create({
        data: {
          title: newTitle,
          categoryId: parseCategoryId(categoryId),
          body: parsedBody,
          userId: user.id,
          public: isPublic === "true",
        },
      });

      return redirect(`/app/${note.id}`);
    },
    async delete() {
      const [{ id }, error] = await getBodySafe(request, idSchema);

      if (error) {
        return badRequest(error);
      }

      await prisma.note.delete({
        where: { id },
      });

      return redirect("/app");
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
