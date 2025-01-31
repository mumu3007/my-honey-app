-- DropForeignKey
ALTER TABLE "Attacks" DROP CONSTRAINT "Attacks_honeypotId_fkey";

-- DropForeignKey
ALTER TABLE "Country" DROP CONSTRAINT "Country_honeypotId_fkey";

-- DropForeignKey
ALTER TABLE "Honeypots" DROP CONSTRAINT "Honeypots_userId_fkey";

-- DropForeignKey
ALTER TABLE "Password" DROP CONSTRAINT "Password_honeypotId_fkey";

-- DropForeignKey
ALTER TABLE "Port" DROP CONSTRAINT "Port_honeypotId_fkey";

-- DropForeignKey
ALTER TABLE "Protocol" DROP CONSTRAINT "Protocol_honeypotId_fkey";

-- DropForeignKey
ALTER TABLE "Username" DROP CONSTRAINT "Username_honeypotId_fkey";

-- AddForeignKey
ALTER TABLE "Honeypots" ADD CONSTRAINT "Honeypots_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attacks" ADD CONSTRAINT "Attacks_honeypotId_fkey" FOREIGN KEY ("honeypotId") REFERENCES "Honeypots"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Protocol" ADD CONSTRAINT "Protocol_honeypotId_fkey" FOREIGN KEY ("honeypotId") REFERENCES "Honeypots"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Country" ADD CONSTRAINT "Country_honeypotId_fkey" FOREIGN KEY ("honeypotId") REFERENCES "Honeypots"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Username" ADD CONSTRAINT "Username_honeypotId_fkey" FOREIGN KEY ("honeypotId") REFERENCES "Honeypots"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Password" ADD CONSTRAINT "Password_honeypotId_fkey" FOREIGN KEY ("honeypotId") REFERENCES "Honeypots"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Port" ADD CONSTRAINT "Port_honeypotId_fkey" FOREIGN KEY ("honeypotId") REFERENCES "Honeypots"("id") ON DELETE CASCADE ON UPDATE CASCADE;
