-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hiragana" (
    "id" SERIAL NOT NULL,
    "Hiragana" TEXT NOT NULL,
    "Romaji" TEXT NOT NULL,

    CONSTRAINT "Hiragana_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Progress" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "hiraganaId" INTEGER NOT NULL,
    "data_a_reviser" TIMESTAMP(3) NOT NULL,
    "date_suivante" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Progress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_hiraganaId_fkey" FOREIGN KEY ("hiraganaId") REFERENCES "Hiragana"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
