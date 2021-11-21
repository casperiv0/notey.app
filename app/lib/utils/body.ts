import type { ZodType } from "zod";
import type { JsonValue } from "type-fest";
import { getBody } from "./common";

export async function getBodySafe<T extends JsonValue>(request: Request, schema: ZodType<T>) {
  const zResult = schema.safeParse(await getBody(request));

  if (zResult.success) {
    return [zResult.data, undefined] as [T, never];
  }

  const message = zResult.error.errors.map(({ message }) => message).join("\n");

  // object so it still allows to be destructured
  return [{}, message] as [never, string];
}
