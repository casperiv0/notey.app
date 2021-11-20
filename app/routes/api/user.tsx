import { redirect } from "remix";
import type { LoaderFunction, ActionFunction } from "remix";
import { prisma } from "~/lib/prisma.server";
import { z } from "zod";
import { getBodySafe } from "~/lib/utils/body";
import { badRequest, notFound, unauthorized } from "remix-utils";
import { getUserSession } from "~/lib/auth/session.server";
import { handleMethods } from "~/lib/utils/handleMethods";

const userSchema = z.object({
  username: z.string().min(2).max(40),
  show_cursor_pointers: z.string().optional(),
  dark_theme: z.string().optional(),
});

export const action: ActionFunction = async ({ request }) => {
  const user = await getUserSession(request);
  if (!user) {
    return unauthorized("Must be authenticated");
  }

  return handleMethods(request, {
    async patch() {
      const [{ username, show_cursor_pointers, dark_theme }, error] = await getBodySafe(
        request,
        userSchema,
      );

      if (error) {
        return badRequest(error);
      }

      const cursorPointers = show_cursor_pointers
        ? show_cursor_pointers === "true"
        : !user.preferences?.cursorPointers;

      const darkTheme = dark_theme ? dark_theme === "true" : !user.preferences?.darkTheme;

      await prisma.userPreferences.upsert({
        where: {
          id: user.userPreferencesId ?? "not_found",
        },
        create: {
          cursorPointers,
          users: { connect: { id: user.id } },
        },
        update: {
          cursorPointers,
        },
      });

      return prisma.user.update({
        where: { id: user.id },
        data: { username },
        include: { preferences: true },
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

export default function User() {
  return null;
}
