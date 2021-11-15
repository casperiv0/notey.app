import { compareSync } from "bcrypt";
import { prisma } from "../prisma.server";

export async function getUser(request: Request) {}

export async function loginUser({ username, password }: { username: string; password: string }) {
  const user = await prisma.user.findUnique({
    where: { username: username },
  });

  if (!user) {
    return null;
  }

  const isPasswordCorrect = compareSync(password, user.password);
  if (!isPasswordCorrect) return null;

  return user;
}
