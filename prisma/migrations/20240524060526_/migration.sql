/*
  Warnings:

  - Added the required column `fileName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filePath` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "fileName" TEXT NOT NULL,
ADD COLUMN     "filePath" TEXT NOT NULL;
