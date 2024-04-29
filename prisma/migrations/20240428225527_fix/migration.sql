/*
  Warnings:

  - You are about to drop the column `cpnj` on the `client` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "client" DROP COLUMN "cpnj",
ADD COLUMN     "cnpj" CHAR(14);
