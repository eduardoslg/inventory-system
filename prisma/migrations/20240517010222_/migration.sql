/*
  Warnings:

  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `movement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `movement_type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_client_id_fkey";

-- DropForeignKey
ALTER TABLE "movement" DROP CONSTRAINT "movement_movement_type_id_fkey";

-- DropForeignKey
ALTER TABLE "movement" DROP CONSTRAINT "movement_product_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_category_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_client_id_fkey";

-- DropTable
DROP TABLE "categories";

-- DropTable
DROP TABLE "client";

-- DropTable
DROP TABLE "movement";

-- DropTable
DROP TABLE "movement_type";

-- DropTable
DROP TABLE "products";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "isys_user" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "email" VARCHAR(120) NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "isys_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "isys_product" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "image" TEXT,
    "total" INTEGER NOT NULL,
    "maximum_quantity" INTEGER NOT NULL,
    "minimum_quantity" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "client_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "isys_product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "isys_category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "client_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "isys_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "isys_movement" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "movement_type_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "isys_movement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "isys_movement_type" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "isys_movement_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "isys_client" (
    "id" SERIAL NOT NULL,
    "businessName" VARCHAR(150) NOT NULL,
    "cnpj" CHAR(14),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "isys_client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "isys_budget" (
    "id" SERIAL NOT NULL,
    "status_id" INTEGER NOT NULL,
    "requester_id" INTEGER NOT NULL,
    "request_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "isys_budget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "isys_budget_status" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "isys_budget_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "isys_requester" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "email" VARCHAR(120),
    "cpf" CHAR(11),
    "address_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "isys_requester_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "isys_budget_item" (
    "id" SERIAL NOT NULL,
    "budget_id" INTEGER NOT NULL,
    "item_type_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "isys_budget_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "isys_budget_item_type" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "value" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "isys_budget_item_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "isys_requester_address" (
    "id" SERIAL NOT NULL,
    "requester_id" INTEGER NOT NULL,
    "uf" CHAR(2) NOT NULL,
    "zipCode" CHAR(8) NOT NULL,
    "number" VARCHAR(15),
    "neighborhood" VARCHAR(30) NOT NULL,
    "address" VARCHAR(50) NOT NULL,
    "city" VARCHAR(30) NOT NULL,
    "additionalAddressData" VARCHAR(30),
    "description" VARCHAR(150),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "isys_requester_address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "isys_user_email_key" ON "isys_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "isys_client_cnpj_key" ON "isys_client"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "isys_requester_email_key" ON "isys_requester"("email");

-- AddForeignKey
ALTER TABLE "isys_product" ADD CONSTRAINT "isys_product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "isys_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "isys_product" ADD CONSTRAINT "isys_product_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "isys_client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "isys_category" ADD CONSTRAINT "isys_category_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "isys_client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "isys_movement" ADD CONSTRAINT "isys_movement_movement_type_id_fkey" FOREIGN KEY ("movement_type_id") REFERENCES "isys_movement_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "isys_movement" ADD CONSTRAINT "isys_movement_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "isys_product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "isys_budget" ADD CONSTRAINT "isys_budget_requester_id_fkey" FOREIGN KEY ("requester_id") REFERENCES "isys_requester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "isys_budget" ADD CONSTRAINT "isys_budget_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "isys_budget_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "isys_budget_item" ADD CONSTRAINT "isys_budget_item_budget_id_fkey" FOREIGN KEY ("budget_id") REFERENCES "isys_budget"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "isys_budget_item" ADD CONSTRAINT "isys_budget_item_item_type_id_fkey" FOREIGN KEY ("item_type_id") REFERENCES "isys_budget_item_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "isys_requester_address" ADD CONSTRAINT "isys_requester_address_requester_id_fkey" FOREIGN KEY ("requester_id") REFERENCES "isys_requester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
