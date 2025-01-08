/*
  Warnings:

  - Added the required column `honeypotId` to the `Attacks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attacks" ADD COLUMN     "honeypotId" INTEGER;
UPDATE "Attacks" SET "honeypotId" = 1 WHERE "honeypotId" IS NULL;
ALTER TABLE "Attacks" ALTER COLUMN "honeypotId" SET NOT NULL;
-- AddForeignKey
ALTER TABLE "Attacks" ADD CONSTRAINT "Attacks_honeypotId_fkey" FOREIGN KEY ("honeypotId") REFERENCES "Honeypots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
