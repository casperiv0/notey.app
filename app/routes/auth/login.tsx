import type { ActionFunction, HeadersFunction, MetaFunction } from "remix";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useTransition, redirect, useActionData, Form } from "remix";
import { badRequest } from "remix-utils";
import { Input } from "~/components/form/Input";
import { Button } from "~/components/Button";
import { FormField } from "~/components/form/FormField";
import { handleMethods } from "~/lib/utils/handleMethods";
import { loginUser } from "~/lib/auth/auth.server";
import { getBodySafe } from "~/lib/utils/body";
import { createSession } from "~/lib/auth/session.server";

export const meta: MetaFunction = () => ({
  title: "Login - Notey.app",
});

export const headers: HeadersFunction = () => {
  const oneMonth = 60 * 60 * 24 * 30;

  return {
    "Cache-Control": `public, max-age=${60 * 10}, s-maxage=${oneMonth}`,
  };
};

export const action: ActionFunction = ({ request }) => {
  return handleMethods(request, {
    async post() {
      const [body, error] = await getBodySafe(
        request,
        z.object({
          username: z
            .string()
            .min(3)
            .max(255)
            .regex(/^([a-z_.\d]+)*[a-z\d]+$/i, "Username cannot contain special characters"),
          password: z.string().min(6).max(255),
        }),
      );

      if (error) {
        return badRequest({ error });
      }

      const user = await loginUser(body);
      if (!user) {
        return badRequest({ error: "invalid username or password" });
      }

      const headers = await createSession(user);

      return redirect("/app", {
        headers,
      });
    },
  });
};

export default function Login() {
  const { error } = useActionData() ?? {};
  const { state } = useTransition();

  return (
    <main className="flex items-center justify-center min-w-full min-h-screen">
      <Form
        method="post"
        className="flex flex-col p-4 rounded-md shadow-md bg-gray-300/50 dark:bg-dark-1 w-96"
      >
        <h1 className="mb-5 text-2xl font-semibold">Login to continue</h1>

        {error ? (
          <div
            className="p-1.5 px-2 mb-3 font-medium text-black bg-red-500 rounded-md shadow-md"
            role="alert"
          >
            <p>{error}</p>
          </div>
        ) : null}

        <FormField label="Username">
          <Input autoFocus autoComplete="username" name="username" id="username" required />
        </FormField>

        <FormField label="Password">
          <Input autoComplete="password" name="password" id="password" type="password" required />
        </FormField>

        <Link className="mb-3 underline" to="/auth/register">
          {"Don't have an account? Register here."}
        </Link>

        <Button loading={state === "submitting"}>Login</Button>
      </Form>
    </main>
  );
}
