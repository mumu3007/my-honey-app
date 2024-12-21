-- CreateTable
CREATE TABLE "Protocol" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "Protocol_pkey" PRIMARY KEY ("id")
);
