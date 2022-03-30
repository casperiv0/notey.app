import { redirect, type LoaderFunction, type ActionFunction, json } from "remix";
import { prisma } from "~/lib/prisma.server";
import { z } from "zod";
import { getBodySafe } from "~/lib/utils/body";
import { badRequest, notFound, unauthorized } from "remix-utils";
import { getUserSession } from "~/lib/auth/session.server";
import { handleMethods } from "~/lib/utils/handleMethods";

const createSchema = z.object({
  name: z.string().min(2).max(40),
});

export const idSchema = z.object({
  id: z.string().min(10),
});

const updateSchema = createSchema.extend({
  id: z.string().min(10),
});

export const action: ActionFunction = async ({ request }) => {
  const user = await getUserSession(request);
  if (!user) {
    return unauthorized("Must be authenticated");
  }

  return handleMethods(request, {
    async post() {
      const [{ name }, error] = await getBodySafe(request, createSchema);

      if (error) {
        return badRequest(error);
      }

      const category = await prisma.category.create({
        data: { name, userId: user.id },
      });

      return json(category);
    },
    async put() {
      const [{ id, name }, error] = await getBodySafe(request, updateSchema);

      if (error) {
        return badRequest(error);
      }

      const category = await prisma.category.findFirst({
        where: { id, userId: user.id },
      });

      if (!category) {
        return notFound("Category not found");
      }

      const updated = prisma.category.update({
        where: { id },
        data: { name },
      });

      return json(updated);
    },
    async patch() {
      const [{ id }, error] = await getBodySafe(request, idSchema);

      if (error) {
        return badRequest(error);
      }

      const category = await prisma.category.findFirst({
        where: { id, userId: user.id },
      });

      if (!category) {
        return notFound("Category not found");
      }

      const updated = prisma.category.update({
        where: { id },
        data: { folded: !category.folded },
      });

      return json(updated);
    },
    async delete() {
      const [{ id }, error] = await getBodySafe(request, idSchema);

      if (error) {
        return badRequest(error);
      }

      const category = await prisma.category.findFirst({
        where: { id, userId: user.id },
      });

      if (!category) {
        return notFound("Category not found");
      }

      await prisma.category.delete({
        where: { id },
      });

      return json(true);
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

export default function Category() {
  return null;
}
