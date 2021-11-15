import type { JsonValue } from "type-fest";

export async function getBody<T extends JsonValue = JsonValue>(request: Request): Promise<T> {
  if (request.headers.get("content-type") === "application/json") {
    return request.json();
  }

  return Object.fromEntries(new URLSearchParams(await request.text())) as T;
}
