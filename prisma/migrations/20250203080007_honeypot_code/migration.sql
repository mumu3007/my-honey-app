/*
  Warnings:

  - A unique constraint covering the columns `[honeypotCode]` on the table `Honeypots` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Honeypots" ADD COLUMN     "honeypotCode" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Honeypots_honeypotCode_key" ON "Honeypots"("honeypotCode");
