-- CreateTable
CREATE TABLE "Honeypots" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Honeypots_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Honeypots" ADD CONSTRAINT "Honeypots_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
