/*
  Warnings:

  - You are about to drop the column `Description` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "Description",
ADD COLUMN     "description" TEXT NOT NULL DEFAULT 'Test';
