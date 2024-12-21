-- CreateTable
CREATE TABLE "Cowrie" (
    "id" SERIAL NOT NULL,
    "attacks" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cowrie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dionaea" (
    "id" SERIAL NOT NULL,
    "attacks" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Dionaea_pkey" PRIMARY KEY ("id")
);
