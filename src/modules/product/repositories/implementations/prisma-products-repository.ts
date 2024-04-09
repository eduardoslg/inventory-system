import { prisma } from '@/prisma'

import {
  ProductDTO,
  ProductsRepository,
  UpdateProductDTO,
} from '../products-repository'

export class PrismaProductsRepository implements ProductsRepository {
  async create({
    name,
    price,
    description,
    banner,
    categoryId,
  }: ProductDTO): Promise<number> {
    const output = await prisma.product.create({
      data: {
        name,
        price,
        description,
        banner,
        category_id: categoryId,
      },
      select: {
        id: true,
      },
    })

    return output.id
  }

  async update({
    id,
    name,
    description,
    price,
    banner,
  }: UpdateProductDTO): Promise<number> {
    const output = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        price,
        banner,
      },
      select: {
        id: true,
      },
    })

    return output.id
  }

  async delete(id: number): Promise<void> {
    await prisma.product.update({
      where: {
        id,
      },
      data: {
        deleted_at: new Date(),
      },
    })
  }

  async findById(id: number): Promise<ProductDTO> {
    const output = await prisma.$queryRaw<ProductDTO[]>`
      SELECT 
        p.id,
        p.name,
        p.price,
        p.description,
        p.banner,
        c.id as category_id,
        c."name" as category,
        p.created_at,
        p.updated_at,
        p.deleted_at
      FROM 
        products p
      JOIN categories c ON c.id = p."category_id"
      WHERE p.id = ${id};
   `

    return output[0]
  }
}
