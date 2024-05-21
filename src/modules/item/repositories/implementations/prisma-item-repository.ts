import { prisma } from '@/prisma'
import { Item } from '@prisma/client'

import {
  CreateItemInput,
  ListItemSchema,
  UpdateItemInput,
} from '../../validations/item-validation'
import {
  ItemRepository,
  ListItemDTO,
  ListItemForDropdownDTO,
} from '../item-repository'

export class PrismaItemRepository implements ItemRepository {
  async create({ name, suggestedValue }: CreateItemInput): Promise<number> {
    const output = await prisma.item.create({
      data: {
        name,
        suggested_value: suggestedValue,
      },
      select: {
        id: true,
      },
    })

    return output.id
  }

  async update({ id, name, suggestedValue }: UpdateItemInput): Promise<number> {
    const output = await prisma.item.update({
      where: {
        id,
      },
      data: {
        name,
        suggested_value: suggestedValue,
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

  async list({ page, limit }: ListItemSchema): Promise<ListItemDTO> {
    const offset = (page - 1) * limit

    const count = await prisma.item.count({
      where: {
        deleted_at: null,
      },
    })

    const output = await prisma.$queryRaw<Item[]>`
      select I.id,
	           I."name" as name,
	           I.suggested_value as "suggestedValue"
        from isys_item I
       where I.deleted_at is null
       limit ${limit}
      offset ${offset}`

    return {
      count,
      data: output,
    }
  }

  async listForDropdown(): Promise<ListItemForDropdownDTO[]> {
    const output = await prisma.$queryRaw<ListItemForDropdownDTO[]>`
      select I.id as value,
	           I."name" as label,
	           I.suggested_value as "suggestedValue"
        from isys_item I
       where I.deleted_at is null
       order by I.name asc`

    return output
  }

  async findById(id: number): Promise<Item> {
    const output = await prisma.$queryRaw<Item[]>`
      select I.id,
	           I."name" as name,
	           I.suggested_value as "suggestedValue"
        from isys_item I
       where I.id = ${id}
         and I.deleted_at is null`

    return output[0]
  }
}
