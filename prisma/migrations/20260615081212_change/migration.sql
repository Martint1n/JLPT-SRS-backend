/*
  Warnings:

  - You are about to drop the column `dateAReviser` on the `Progress` table. All the data in the column will be lost.
  - You are about to drop the column `dateSuivante` on the `Progress` table. All the data in the column will be lost.
  - Added the required column `reviewDate` to the `Progress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Progress" DROP COLUMN "dateAReviser",
DROP COLUMN "dateSuivante",
ADD COLUMN     "reviewDate" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "repetitions" SET DEFAULT 1;
