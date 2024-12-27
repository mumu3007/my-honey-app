/*
  Warnings:

  - You are about to drop the column `name` on the `Country` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Password` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Username` table. All the data in the column will be lost.
  - Added the required column `ip_attacker` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Password` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Username` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Country" DROP COLUMN "name",
ADD COLUMN     "ip_attacker" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Password" DROP COLUMN "name",
ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Username" DROP COLUMN "name",
ADD COLUMN     "username" TEXT NOT NULL;
