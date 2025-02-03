/*
  Warnings:

  - You are about to drop the column `honeypotCode` on the `Honeypots` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ip_honeypot]` on the table `Honeypots` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Honeypots_honeypotCode_key";

-- AlterTable
ALTER TABLE "Honeypots" DROP COLUMN "honeypotCode",
ADD COLUMN     "ip_honeypot" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Honeypots_ip_honeypot_key" ON "Honeypots"("ip_honeypot");
