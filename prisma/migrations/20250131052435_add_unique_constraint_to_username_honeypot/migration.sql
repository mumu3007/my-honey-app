/*
  Warnings:

  - A unique constraint covering the columns `[username,honeypotId]` on the table `Username` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Username_username_honeypotId_key" ON "Username"("username", "honeypotId");
