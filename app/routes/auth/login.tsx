import type { ActionFunction, LoaderFunction, MetaFunction } from "remix";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { z } from "zod";
import { redirect, useActionData, Form } from "remix";
import { badRequest } from "remix-utils";
import { Input } from "~/components/form/Input";
import { Button } from "~/components/Button";
import { FormField } from "~/components/form/FormField";
import { handleMethods } from "~/lib/utils/handleMethods";
import { loginUser } from "~/lib/auth/auth.server";
import { getBodySafe } from "~/lib/utils/body";
import { createSession, getUserSession } from "~/lib/auth/session.server";

export const meta: MetaFunction = () => ({
  title: "Login - Notey.app",
});

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUserSession(request);

  return user ? redirect("/app") : null;
};

export const action: ActionFunction = ({ request }) => {
  return handleMethods(request, {
    async post() {
      const [body, error] = await getBodySafe(
        request,
        z.object({
          username: z.string().min(3).max(255),
          password: z.string().min(6).max(255),
        }),
      );

      if (error) {
        return error;
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

  return (
    <main className="flex items-center justify-center min-w-full min-h-screen">
      <Formik onSubmit={() => undefined} initialValues={{ username: "", password: "" }}>
        {({ handleChange, values, errors }) => (
          <Form method="post" className="flex flex-col p-4 bg-gray-200 rounded-md w-96">
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
              <Input
                autoFocus
                autoComplete="username"
                value={values.username}
                onChange={handleChange}
                name="username"
                id="username"
                required
              />
            </FormField>

            <FormField label="Password">
              <Input
                autoComplete="password"
                value={values.password}
                onChange={handleChange}
                name="password"
                id="password"
                type="password"
                required
              />
            </FormField>

            <Link className="mb-3 underline" to="/auth/register">
              {"Don't have an account? Register here."}
            </Link>

            <Button>Login</Button>
          </Form>
        )}
      </Formik>
    </main>
  );
}
