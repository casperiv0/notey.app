import { redirect } from "@remix-run/node";

export function handleNext(request: Request, forceApp = false) {
  const urlSearch = new URL(request.url).searchParams;
  const next = urlSearch.get("next");

  if (next && !forceApp) {
    return redirect(next);
  }

  return redirect("/app");
}
