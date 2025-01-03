-- CreateTable
CREATE TABLE "Port" (
    "id" SERIAL NOT NULL,
    "destinationPort" TEXT NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "Port_pkey" PRIMARY KEY ("id")
);
