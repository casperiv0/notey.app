import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient({ errorFormat: "pretty", log: ["error", "info", "warn"] });

// @ts-expect-error ignore
export const prisma: typeof prismaClient = (global.prisma ??= prismaClient);
