/*
  Warnings:

  - Made the column `ip_honeypot` on table `Honeypots` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Honeypots" ALTER COLUMN "ip_honeypot" SET NOT NULL;
