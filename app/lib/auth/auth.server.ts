import type { Hashed } from ".prisma/client";
import { compareSync, genSaltSync, hashSync } from "bcrypt";
import { badRequest } from "remix-utils";
import { prisma } from "../prisma.server";
import { exclude } from "../utils/common";

export async function loginUser({ username, password }: { username: string; password: string }) {
  const user = await prisma.user.findUnique({
    where: { username },
    include: { passwordHash: true },
  });

  if (!user) {
    return null;
  }

  const isPasswordCorrect = compareSync(password, user.passwordHash.hash);
  if (!isPasswordCorrect) return null;

  return exclude(user, ["passwordHash", "passwordHashId"]);
}

export async function registerUser({ username, password }: { username: string; password: string }) {
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (user) {
    return { error: "Username is already in use" };
  }

  const createdUser = await prisma.user.create({
    data: {
      username,
      passwordHash: {
        create: { hash: hashSync(password, genSaltSync()) },
      },
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

export async function validatePinCode(pin_code: string, user: any) {
  const pinCodeHash = user.pinCodeHash as Hashed | null;

  if (!pinCodeHash) return null;

  const isPinCodeCorrect = compareSync(pin_code, pinCodeHash.hash);

  if (!isPinCodeCorrect) {
    return badRequest({ error: "incorrect pin-code" });
  }

  return null;
}
