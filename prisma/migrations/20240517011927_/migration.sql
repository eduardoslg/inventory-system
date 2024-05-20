-- DropForeignKey
ALTER TABLE "isys_requester" DROP CONSTRAINT "isys_requester_id_fkey";

-- AddForeignKey
ALTER TABLE "isys_requester" ADD CONSTRAINT "isys_requester_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "isys_requester_address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
