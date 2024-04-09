import { getEnvConfig } from '@/config/env'
import { prisma } from '@/prisma'
import { Order } from '@prisma/client'

import {
  ListOrderDTO,
  OrderDTO,
  OrdersRepository,
  UpdateOrderDTO,
} from '../orders-repository'

export class PrismaOrdersRepository implements OrdersRepository {
  async create({ table, name }: OrderDTO): Promise<number> {
    const output = await prisma.order.create({
      data: {
        table,
        name,
      },
      select: {
        id: true,
      },
    })

    return output.id
  }

  async list({ limit, search, page }: ListOrderDTO): Promise<Order[]> {
    const offset = (page - 1) * limit

    const output = await prisma.$queryRaw<Order[]>`
      select 
        o.*,
        (select coalesce(
          json_agg(
            json_build_object(
              'id', i.id,
              'productId', p.id,
              'productName', p."name",
              'mediaURL', CONCAT(${getEnvConfig('ENV')}, '/medias/', p.banner)
            )
          ), '[]'
        )  from items i
           join products p on p.id = i.product_id
          where i."orderId" = o.id) as items
      from orders o
      where 
        o.deleted_at is null
      and 
        o.name like ${search}
      group by 
        o.id
      limit
        ${limit}
      offset 
        ${offset}
   `

    return output
  }

  async count(search?: string): Promise<number> {
    const output = await prisma.$queryRaw<{ count: number }[]>`
      SELECT
        COUNT(id)::integer
      from
        orders o
      where 
        o.deleted_at is null
      and 
        o.name like ${search}
      `

    return output[0].count
  }

  async update({ id, table, name }: UpdateOrderDTO): Promise<number> {
    const output = await prisma.order.update({
      where: {
        id,
      },
      data: {
        table,
        name,
        draft: false,
      },
      select: {
        id: true,
      },
    })

    return output.id
  }

  async finish(id: number): Promise<void> {
    await prisma.order.update({
      where: {
        id,
      },
      data: {
        status: true,
      },
    })
  }

  async delete(id: number): Promise<void> {
    await prisma.order.update({
      where: {
        id,
      },
      data: {
        deleted_at: new Date(),
      },
    })
  }

  async findById(id: number): Promise<Order> {
    const output = await prisma.$queryRaw<Order[]>`
      SELECT 
        id,
        "table",
        name,
        status,
        draft,
        created_at,
        updated_at,
        deleted_at
      FROM 
        orders
      where id = ${id}
   `

    return output[0]
  }
}
