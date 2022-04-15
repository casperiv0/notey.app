import { ActionFunction, redirect } from "@remix-run/node";
import { logout } from "~/lib/auth/session.server";

export const loader: ActionFunction = async () => {
  const headers = await logout();

  return redirect("/auth/login", {
    headers,
  });
};

export default function Logout() {
  return <p>Logging you out...</p>;
}
