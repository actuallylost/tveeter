-- CreateTable
CREATE TABLE "TempUser" (
    "username" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TempUser_username_key" ON "TempUser"("username");
