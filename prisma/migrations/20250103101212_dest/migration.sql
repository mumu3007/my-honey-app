/*
  Warnings:

  - Added the required column `destinationPort` to the `Honeypot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Honeypot" ADD COLUMN "destinationPort" INTEGER;
UPDATE "Honeypot" SET "destinationPort" = 1234 WHERE "destinationPort" IS NULL;
ALTER TABLE "Honeypot" ALTER COLUMN "destinationPort" SET NOT NULL;
