/*
  Warnings:

  - You are about to drop the column `stockId` on the `products` table. All the data in the column will be lost.
  - Changed the type of `product_id` on the `stock` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_stockId_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "stockId";

-- AlterTable
ALTER TABLE "stock" DROP COLUMN "product_id",
ADD COLUMN     "product_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "stock_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
