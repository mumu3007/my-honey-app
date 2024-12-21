/*
  Warnings:

  - You are about to drop the `Cowrie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Dionaea` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Cowrie";

-- DropTable
DROP TABLE "Dionaea";

-- CreateTable
CREATE TABLE "Honeypot" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "alert" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ip_attacker" TEXT NOT NULL,
    "protocol" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Honeypot_pkey" PRIMARY KEY ("id")
);
