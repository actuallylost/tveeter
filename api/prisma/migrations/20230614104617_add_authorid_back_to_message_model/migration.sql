/*
  Warnings:

  - A unique constraint covering the columns `[username,id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authorId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_username_fkey";

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "authorId" BIGINT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_username_id_key" ON "User"("username", "id");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_username_authorId_fkey" FOREIGN KEY ("username", "authorId") REFERENCES "User"("username", "id") ON DELETE RESTRICT ON UPDATE CASCADE;
