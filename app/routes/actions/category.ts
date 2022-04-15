import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { prisma } from "~/lib/prisma.server";
import { z } from "zod";
import { getBodySafe } from "~/lib/utils/body";
import { badRequest, notFound, unauthorized } from "remix-utils";
import { getUserSession } from "~/lib/auth/session.server";
import { handleMethods } from "~/lib/utils/handleMethods";
import { handleNext } from "~/lib/utils/handleNext.server";

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

      await prisma.category.create({
        data: { name, userId: user.id },
      });

      return handleNext(request);
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

      await prisma.category.update({
        where: { id },
        data: { name },
      });

      return handleNext(request);
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

      await prisma.category.update({
        where: { id },
        data: { folded: !category.folded },
      });

      return handleNext(request);
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

      return handleNext(request);
    },
  });
};

export const loader: LoaderFunction = async ({ request }) => handleNext(request);
