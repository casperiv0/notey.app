import { redirect, type LoaderFunction, type ActionFunction } from "remix";
import { prisma } from "~/lib/prisma.server";
import { z } from "zod";
import { getBodySafe } from "~/lib/utils/body";
import { badRequest, unauthorized } from "remix-utils";
import { getUserSession } from "~/lib/auth/session.server";
import { handleMethods } from "~/lib/utils/handleMethods";
import { hashPassword, validateUserPassword } from "~/lib/auth/auth.server";

const userSchema = z.object({
  prev_password: z.string().min(8),
  new_password: z.string().min(8),
  confirm_password: z.string().min(8),
});

export const action: ActionFunction = async ({ request }) => {
  const user = await getUserSession(request, { passwordHash: true });
  if (!user) {
    return unauthorized("Must be authenticated");
  }

  return handleMethods(request, {
    async patch() {
      const [{ prev_password, new_password, confirm_password }, error] = await getBodySafe(
        request,
        userSchema,
      );

      if (error) {
        return badRequest({ error });
      }

      if (new_password !== confirm_password) {
        return badRequest({ error: "New passwords do not match" });
      }

      const isPrevPasswordCorrect = validateUserPassword(
        prev_password,
        (user as any).passwordHash.hash,
      );

      if (!isPrevPasswordCorrect) {
        return badRequest({ error: "Previous password does not match" });
      }

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          passwordHash: {
            update: {
              hash: hashPassword(new_password),
            },
          },
        },
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

export default function User() {
  return null;
}
