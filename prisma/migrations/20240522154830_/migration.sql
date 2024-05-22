/*
  Warnings:

  - The `energiaCompensada` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `energiaEletrica` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `energiaSCEEE` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "energiaCompensada",
ADD COLUMN     "energiaCompensada" JSONB[],
DROP COLUMN "energiaEletrica",
ADD COLUMN     "energiaEletrica" JSONB[],
DROP COLUMN "energiaSCEEE",
ADD COLUMN     "energiaSCEEE" JSONB[];
