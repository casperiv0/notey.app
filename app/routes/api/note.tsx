import { redirect } from "remix";
import type { LoaderFunction, ActionFunction } from "remix";
import { prisma } from "~/lib/prisma.server";
import { handleMethods } from "~/lib/utils/handleMethods";
import { getBodySafe } from "~/lib/utils/body";
import { z } from "zod";
import { badRequest, unauthorized, notFound } from "remix-utils";
import { getUserSession } from "~/lib/auth/session.server";
import { idSchema } from "./category";
import { sanitizeUserMarkdown } from "~/lib/utils/markdown";

const updateSchema = z.object({
  id: z.string().min(10),
  title: z.string().min(2).max(40),
  categoryId: z.string().optional(),
  body: z.string().optional(),
  pinCodeLocked: z
    .string()
    .regex(/true|false/)
    .optional()
    .default("false"),
});

const createSchema = z.object({
  title: z.string().min(2).max(40),
  categoryId: z.string().optional(),
  body: z.string().optional(),
});

export const action: ActionFunction = async ({ request }) => {
  const user = await getUserSession(request);
  if (!user) {
    return unauthorized("Must be authenticated");
  }

  return handleMethods(request, {
    async put() {
      const [{ title, id, categoryId, body, pinCodeLocked }, error] = await getBodySafe(
        request,
        updateSchema,
      );
      console.log({ pinCodeLocked });

      if (error) {
        return badRequest(error);
      }

      const note = await prisma.note.findUnique({
        where: { id },
      });

      if (!note) {
        return notFound("note not found");
      }

      const markdown = sanitizeUserMarkdown(body ?? note.body);

      return prisma.note.update({
        where: { id },
        data: {
          title,
          categoryId: parseCategoryId(categoryId),
          body,
          markdown,
          pinCodeLocked: pinCodeLocked === "true",
        },
      });
    },
    async post() {
      const [{ title, categoryId, body }, error] = await getBodySafe(request, createSchema);

      if (error) {
        return badRequest(error);
      }

      const markdown = sanitizeUserMarkdown(body ?? "");

      return prisma.note.create({
        data: {
          title,
          categoryId: parseCategoryId(categoryId),
          body: "Hello world",
          userId: user.id,
          markdown,
        },
      });
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
