/*
  Warnings:

  - You are about to alter the column `name` on the `categories` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to drop the column `banner` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `products` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(150)`.
  - You are about to alter the column `name` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(150)`.
  - You are about to alter the column `email` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(120)`.
  - You are about to drop the `stock` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `client_id` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Made the column `created_at` on table `categories` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `categories` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `client_id` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `products` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `price` on the `products` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `created_at` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "stock" DROP CONSTRAINT "stock_product_id_fkey";

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "client_id" INTEGER NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "banner",
DROP COLUMN "description",
ADD COLUMN     "client_id" INTEGER NOT NULL,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "total" INTEGER NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(150),
DROP COLUMN "price",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "name" SET DATA TYPE VARCHAR(150),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(120),
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- DropTable
DROP TABLE "stock";

-- CreateTable
CREATE TABLE "movement" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,
    "movement_type_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "movement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movement_type" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "movement_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client" (
    "id" SERIAL NOT NULL,
    "businessName" VARCHAR(150) NOT NULL,
    "cpnj" CHAR(14),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movement" ADD CONSTRAINT "movement_movement_type_id_fkey" FOREIGN KEY ("movement_type_id") REFERENCES "movement_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movement" ADD CONSTRAINT "movement_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
