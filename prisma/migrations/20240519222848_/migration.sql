-- DropForeignKey
ALTER TABLE "isys_product" DROP CONSTRAINT "isys_product_category_id_fkey";

-- DropForeignKey
ALTER TABLE "isys_product" DROP CONSTRAINT "isys_product_client_id_fkey";

-- AlterTable
ALTER TABLE "isys_product" ADD COLUMN     "categoryId" INTEGER,
ADD COLUMN     "clientId" INTEGER;

-- AddForeignKey
ALTER TABLE "isys_product" ADD CONSTRAINT "isys_product_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "isys_client"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "isys_product" ADD CONSTRAINT "isys_product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "isys_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
