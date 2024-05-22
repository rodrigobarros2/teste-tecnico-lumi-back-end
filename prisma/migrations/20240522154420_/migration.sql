/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `contribuicaoIluminacaoPublica` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `energiaCompensada` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `energiaEletrica` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `energiaSCEEE` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mesDeReferencia` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numeroCliente` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
DROP COLUMN "name",
ADD COLUMN     "contribuicaoIluminacaoPublica" TEXT NOT NULL,
ADD COLUMN     "energiaCompensada" JSONB NOT NULL,
ADD COLUMN     "energiaEletrica" JSONB NOT NULL,
ADD COLUMN     "energiaSCEEE" JSONB NOT NULL,
ADD COLUMN     "mesDeReferencia" TEXT NOT NULL,
ADD COLUMN     "numeroCliente" TEXT NOT NULL;
