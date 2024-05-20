import { prisma } from '@/prisma'
import { Item } from '@prisma/client'

import {
  CreateItemInput,
  ListItemSchema,
} from '../../validations/item-validation'
import {
  ItemsRepository,
  ListItemDTO,
  ListItemForDropdownDTO,
} from '../items-repository'

export class PrismaItemsRepository implements ItemsRepository {
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

    const count = await prisma.$queryRaw<[count: number]>`
      select count(*)
        from isys_item I`

    const output = await prisma.$queryRaw<Item[]>`
      select I.id,
	           I."name" as name,
	           I.suggested_value as "suggestedValue"
        from isys_item I
       limit ${limit}
      offset ${offset}`

    return {
      count: count[0],
      data: output,
    }
  }

  async listForDropdown(): Promise<ListItemForDropdownDTO[]> {
    const output = await prisma.$queryRaw<ListItemForDropdownDTO[]>`
      select I.id as value,
	           I."name" as label,
	           I.suggested_value as "suggestedValue"
        from isys_item I`

    return output
  }

  async findById(id: number): Promise<Item> {
    const output = await prisma.$queryRaw<Item[]>`
      select I.id,
	           I."name" as name,
	           I.suggested_value as "suggestedValue"
        from isys_item I
       where I.id = ${id}`

    return output[0]
  }
}
