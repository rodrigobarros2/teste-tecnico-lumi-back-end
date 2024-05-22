/*
  Warnings:

  - You are about to drop the column `contribuicaoIluminacaoPublica` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `energiaCompensada` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `energiaEletrica` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `energiaSCEEE` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `mesDeReferencia` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `numeroCliente` on the `User` table. All the data in the column will be lost.
  - Added the required column `contributionPublicLighting` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerNumber` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referenceMonth` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "contribuicaoIluminacaoPublica",
DROP COLUMN "energiaCompensada",
DROP COLUMN "energiaEletrica",
DROP COLUMN "energiaSCEEE",
DROP COLUMN "mesDeReferencia",
DROP COLUMN "numeroCliente",
ADD COLUMN     "compensatedEnergy" JSONB[],
ADD COLUMN     "contributionPublicLighting" TEXT NOT NULL,
ADD COLUMN     "customerNumber" TEXT NOT NULL,
ADD COLUMN     "electricity" JSONB[],
ADD COLUMN     "injectedEnergy" JSONB[],
ADD COLUMN     "referenceMonth" TEXT NOT NULL;
