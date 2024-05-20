/*
  Warnings:

  - You are about to drop the column `item_type_id` on the `isys_budget_item` table. All the data in the column will be lost.
  - You are about to drop the `isys_budget_item_type` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `item_id` to the `isys_budget_item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "isys_budget_item" DROP CONSTRAINT "isys_budget_item_item_type_id_fkey";

-- AlterTable
ALTER TABLE "isys_budget_item" DROP COLUMN "item_type_id",
ADD COLUMN     "item_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "isys_budget_item_type";

-- CreateTable
CREATE TABLE "isys_item" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "suggested_value" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "isys_item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "isys_budget_item" ADD CONSTRAINT "isys_budget_item_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "isys_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
