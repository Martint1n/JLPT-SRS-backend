/*
  Warnings:

  - You are about to drop the column `Hiragana` on the `Hiragana` table. All the data in the column will be lost.
  - You are about to drop the column `Romaji` on the `Hiragana` table. All the data in the column will be lost.
  - You are about to drop the column `data_a_reviser` on the `Progress` table. All the data in the column will be lost.
  - You are about to drop the column `date_suivante` on the `Progress` table. All the data in the column will be lost.
  - Added the required column `hiragana` to the `Hiragana` table without a default value. This is not possible if the table is not empty.
  - Added the required column `romaji` to the `Hiragana` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateAReviser` to the `Progress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateSuivante` to the `Progress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `repetitions` to the `Progress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hiragana" DROP COLUMN "Hiragana",
DROP COLUMN "Romaji",
ADD COLUMN     "hiragana" TEXT NOT NULL,
ADD COLUMN     "romaji" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Progress" DROP COLUMN "data_a_reviser",
DROP COLUMN "date_suivante",
ADD COLUMN     "dateAReviser" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dateSuivante" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "repetitions" INTEGER NOT NULL;
