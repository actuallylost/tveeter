/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `TempUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `TempUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TempUser" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TempUser_email_key" ON "TempUser"("email");
