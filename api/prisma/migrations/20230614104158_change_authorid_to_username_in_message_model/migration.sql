/*
  Warnings:

  - You are about to drop the column `authorId` on the `Message` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `Message` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_authorId_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "authorId",
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Message_username_key" ON "Message"("username");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
