import { compareSync, genSaltSync, hashSync } from "bcrypt";
import { prisma } from "../prisma.server";

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

export async function registerUser({ username, password }: { username: string; password: string }) {
  const user = await prisma.user.findUnique({
    where: { username: username },
  });

  if (user) {
    return { error: "Username is already in use" };
  }

  const createdUser = await prisma.user.create({
    data: {
      username,
      password: hashSync(password, genSaltSync()),
      preferences: {
        create: {
          cursorPointers: false,
          darkTheme: true,
        },
      },
    },
  });

  return createdUser;
}
