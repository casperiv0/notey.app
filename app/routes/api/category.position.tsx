import { redirect } from "remix";
import type { LoaderFunction, ActionFunction } from "remix";
import { prisma } from "~/lib/prisma.server";
import { z } from "zod";
import { getBodySafe } from "~/lib/utils/body";
import { badRequest, unauthorized } from "remix-utils";
import { getUserSession } from "~/lib/auth/session.server";
import { handleMethods } from "~/lib/utils/handleMethods";

const schema = z.object({
  x: z.string(),
  y: z.string(),
});

export const action: ActionFunction = async ({ request }) => {
  const user = await getUserSession(request);
  if (!user) {
    return unauthorized("Must be authenticated");
  }

  return handleMethods(request, {
    async patch() {
      const [data, error] = await getBodySafe(request, schema);

      if (error) {
        return badRequest({ error });
      }

      const x = JSON.parse(data.x);
      const y = JSON.parse(data.y);

      await prisma.category.update({
        where: { id: x.id },
        data: { position: x.position },
      });

      await prisma.category.update({
        where: { id: y.id },
        data: { position: y.position },
      });

      return null;
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
