-- AlterTable
ALTER TABLE "Country" ADD COLUMN     "honeypotId" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Password" ADD COLUMN     "honeypotId" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Port" ADD COLUMN     "honeypotId" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Protocol" ADD COLUMN     "honeypotId" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Username" ADD COLUMN     "honeypotId" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "Protocol" ADD CONSTRAINT "Protocol_honeypotId_fkey" FOREIGN KEY ("honeypotId") REFERENCES "Honeypots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Country" ADD CONSTRAINT "Country_honeypotId_fkey" FOREIGN KEY ("honeypotId") REFERENCES "Honeypots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Username" ADD CONSTRAINT "Username_honeypotId_fkey" FOREIGN KEY ("honeypotId") REFERENCES "Honeypots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Password" ADD CONSTRAINT "Password_honeypotId_fkey" FOREIGN KEY ("honeypotId") REFERENCES "Honeypots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Port" ADD CONSTRAINT "Port_honeypotId_fkey" FOREIGN KEY ("honeypotId") REFERENCES "Honeypots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
