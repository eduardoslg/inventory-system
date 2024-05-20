/*
  Warnings:

  - You are about to drop the column `value` on the `isys_budget_item_type` table. All the data in the column will be lost.
  - Added the required column `value` to the `isys_budget_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `suggested_value` to the `isys_budget_item_type` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "isys_budget_item" ADD COLUMN     "value" DECIMAL(10,2) NOT NULL;

-- AlterTable
ALTER TABLE "isys_budget_item_type" DROP COLUMN "value",
ADD COLUMN     "suggested_value" DECIMAL(10,2) NOT NULL;
