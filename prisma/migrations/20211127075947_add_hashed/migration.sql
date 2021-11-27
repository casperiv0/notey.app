/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - Added the required column `passwordHashId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
ADD COLUMN     "passwordHashId" TEXT NOT NULL,
ADD COLUMN     "pinCodeHashId" TEXT;

-- CreateTable
CREATE TABLE "Hashed" (
    "id" TEXT NOT NULL,
    "hash" TEXT NOT NULL,

    CONSTRAINT "Hashed_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_pinCodeHashId_fkey" FOREIGN KEY ("pinCodeHashId") REFERENCES "Hashed"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_passwordHashId_fkey" FOREIGN KEY ("passwordHashId") REFERENCES "Hashed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
