import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { prisma } from "~/lib/prisma.server";
import { z } from "zod";
import { getBodySafe } from "~/lib/utils/body";
import { badRequest, unauthorized } from "remix-utils";
import { getUserSession, logout } from "~/lib/auth/session.server";
import { handleMethods } from "~/lib/utils/handleMethods";
import { idSchema } from "./category";

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
    async delete() {
      const [{ id }, error] = await getBodySafe(request, idSchema);

      if (error) {
        return badRequest(error);
      }

      if (id !== user.id) {
        return badRequest("Invalid user id");
      }

      if (user.userPreferencesId) {
        await prisma.userPreferences.delete({
          where: { id: user.userPreferencesId },
        });
      }

      await prisma.user.delete({
        where: { id },
      });

      const headers = await logout();

      return new Response(null, { headers });
    },
    async patch() {
      const [{ username, show_cursor_pointers, dark_theme }, error] = await getBodySafe(
        request,
        userSchema,
      );

      if (error) {
        return badRequest(error);
      }

      const cursorPointers = typeof show_cursor_pointers !== "undefined";
      const darkTheme = typeof dark_theme !== "undefined";

      await prisma.userPreferences.upsert({
        where: {
          id: user.userPreferencesId ?? "not_found",
        },
        create: {
          cursorPointers,
          darkTheme,
          users: { connect: { id: user.id } },
        },
        update: {
          cursorPointers,
          darkTheme,
        },
      });

      const existingWithUsername = await prisma.user.findFirst({
        where: { username: { equals: username, mode: "insensitive" } },
      });

      if (existingWithUsername) {
        return badRequest({ error: "username in use" });
      }

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
