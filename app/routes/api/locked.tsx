import { redirect } from "remix";
import type { LoaderFunction, ActionFunction } from "remix";
import { prisma } from "~/lib/prisma.server";
import { handleMethods } from "~/lib/utils/handleMethods";
import { getBodySafe } from "~/lib/utils/body";
import { z } from "zod";
import { badRequest, unauthorized } from "remix-utils";
import { getUserSession } from "~/lib/auth/session.server";
import { validatePinCode } from "~/lib/auth/auth.server";

const lockedNoteSchema = z.object({
  pin_code: z.string().min(2),
  id: z.string().min(2),
});

export const action: ActionFunction = async ({ request }) => {
  const user = await getUserSession(request, { pinCodeHash: true });
  if (!user) {
    return unauthorized("Must be authenticated");
  }

  return handleMethods(request, {
    async post() {
      const [{ id, pin_code }, error] = await getBodySafe(request, lockedNoteSchema);

      if (error) {
        return badRequest({ error });
      }

      const pinCodeError = await validatePinCode(pin_code, user);

      if (pinCodeError) {
        return pinCodeError;
      }

      const note = await prisma.note.findUnique({
        where: { id },
      });

      return { note };
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

export default function Locked() {
  return null;
}
