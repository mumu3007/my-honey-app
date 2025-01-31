-- DropForeignKey
ALTER TABLE "Username" DROP CONSTRAINT "Username_honeypotId_fkey";

-- AddForeignKey
ALTER TABLE "Username" ADD CONSTRAINT "Username_honeypotId_fkey" FOREIGN KEY ("honeypotId") REFERENCES "Honeypots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
