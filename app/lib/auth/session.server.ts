import { createCookie } from "@remix-run/node";
import { sign, verify } from "jsonwebtoken";
import type { Prisma, User } from ".prisma/client";
import { prisma } from "../prisma.server";

const SECRET = process.env.JWT_SECRET as string;
const SESSION_MAX_AGE = 60 * 60 * 1000 * 24 * 7; // 1week
const SESSION_NAME = "notey-app-session";
const session = createCookie(SESSION_NAME, {
  httpOnly: true,
  maxAge: SESSION_MAX_AGE,
  path: "/",
  sameSite: "lax",
});

export async function getUserSession(request: Request, extraInclude: Prisma.UserInclude = {}) {
  const header = request.headers.get("cookie");
  const token = await session.parse(header);

  const userId = verifyToken(token);
  if (!userId) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { preferences: true, ...extraInclude },
  });

  return user;
}

export async function logout() {
  return {
    "Set-Cookie": await session.serialize("", { expires: new Date() }),
  };
}

export async function createSession(user: Pick<User, "id">) {
  const jwtToken = signToken(user.id);

  return {
    "Set-Cookie": await session.serialize(jwtToken),
  };
}

function signToken(userId: string) {
  return sign({ userId }, SECRET, { expiresIn: SESSION_MAX_AGE / 1000 });
}

function verifyToken(token: string) {
  try {
    const data = verify(token, SECRET) as { userId: string };
    return data.userId;
  } catch {
    return null;
  }
}
