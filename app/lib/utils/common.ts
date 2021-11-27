import type { JsonValue } from "type-fest";

export async function getBody<T extends JsonValue = JsonValue>(request: Request): Promise<T> {
  if (request.headers.get("content-type") === "application/json") {
    return request.json();
  }

  return Object.fromEntries(new URLSearchParams(await request.text())) as T;
}

export function exclude<Obj extends object, Values extends keyof Obj>(
  object: Obj,
  values: Array<Values>,
): Omit<Obj, Values> {
  const newObj = { ...object } as Obj;

  values.map((value) => {
    delete newObj[value];
  });

  return newObj;
}
