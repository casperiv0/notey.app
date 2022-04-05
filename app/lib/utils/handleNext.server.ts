import { redirect } from "remix";

export function handleNext(request: Request) {
  const urlSearch = new URL(request.url).searchParams;
  const next = urlSearch.get("next");

  if (next) {
    return redirect(next);
  }

  return redirect("/app");
}
