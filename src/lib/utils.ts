// eslint-disable-next-line eqeqeq
export const isTrue = (v: string): boolean => v == "true";

export function errorObj(err: string): { error: typeof err; status: "error" } {
  return {
    error: err,
    status: "error",
  };
}
