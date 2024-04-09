import { prisma } from '@/prisma'
import { Item } from '@prisma/client'

import { ItemDTO, ItemsRepository } from '../items-repository'

export class PrismaItemsRepository implements ItemsRepository {
  async create({ orderId, productId, amount }: ItemDTO): Promise<number> {
    const output = await prisma.item.create({
      data: {
        orderId,
        product_id: productId,
        amount,
      },
      select: {
        id: true,
      },
    })

    return output.id
  }

  async delete(id: number): Promise<void> {
    await prisma.item.update({
      where: {
        id,
      },
      data: {
        deleted_at: new Date(),
      },
    })
  }

  async list(orderId: number): Promise<Item[]> {
    const output = await prisma.$queryRaw<Item[]>`
      SELECT
        i.id,
        i.amount,
        i."orderId",
        i.product_id,
        p."name",
        p.description,
        p.price,
        p.banner 
      FROM 
        items i
      JOIN 
        products p on p.id = i.product_id
      WHERE i."orderId" = ${orderId}`

    return output
  }

  async findById(id: number): Promise<Item> {
    const output = await prisma.$queryRaw<Item[]>`
      SELECT
        i.id,
        i.amount,
        i."orderId",
        i.product_id,
        p."name",
        p.description,
        p.price,
        p.banner 
      FROM 
        items i
      JOIN 
        products p on p.id = i.product_id
      WHERE i.id = ${id}`

    return output[0]
  }
}
