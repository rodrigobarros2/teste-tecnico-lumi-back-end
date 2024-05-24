/*
  Warnings:

  - You are about to drop the column `fileName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `filePath` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "fileName",
DROP COLUMN "filePath";
