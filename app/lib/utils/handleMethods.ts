type Func = () => Promise<Response | any>;
type Method = "get" | "post" | "put" | "delete" | "patch";

export async function handleMethods(request: Request, handlers: Partial<Record<Method, Func>>) {
  const method = request.method.toLowerCase() as Method;
  const handler = handlers[method] ?? methodNotAllowed;

  return handler();
}

async function methodNotAllowed() {
  return new Response("Method Not Allowed", { status: 405 });
}
