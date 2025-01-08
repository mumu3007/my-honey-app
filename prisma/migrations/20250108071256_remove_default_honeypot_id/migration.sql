-- AlterTable
ALTER TABLE "Country" ALTER COLUMN "honeypotId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Password" ALTER COLUMN "honeypotId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Port" ALTER COLUMN "honeypotId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Protocol" ALTER COLUMN "honeypotId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Username" ALTER COLUMN "honeypotId" DROP DEFAULT;
