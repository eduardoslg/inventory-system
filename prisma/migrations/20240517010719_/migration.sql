/*
  Warnings:

  - You are about to drop the column `requester_id` on the `isys_requester_address` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "isys_requester_address" DROP CONSTRAINT "isys_requester_address_requester_id_fkey";

-- AlterTable
ALTER TABLE "isys_requester_address" DROP COLUMN "requester_id";

-- AddForeignKey
ALTER TABLE "isys_requester" ADD CONSTRAINT "isys_requester_id_fkey" FOREIGN KEY ("id") REFERENCES "isys_requester_address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
