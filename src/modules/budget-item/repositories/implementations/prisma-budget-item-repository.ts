import { prisma } from '@/prisma'
import { Item } from '@prisma/client'

import { CreateBudgetItemInput } from '../../validations/budget-item-validation'
import { BudgetItemRepository } from '../budget-item-repository'

export class PrismaBudgetItemRepository implements BudgetItemRepository {
  async create({
    budgetId,
    itemId,
    value,
  }: CreateBudgetItemInput): Promise<void> {
    await prisma.budgetItem.create({
      data: {
        budget_id: budgetId,
        item_id: itemId,
        value,
      },
      select: {
        id: true,
      },
    })
  }

  async delete(id: number): Promise<void> {
    await prisma.budgetItem.update({
      where: {
        id,
      },
      data: {
        deleted_at: new Date(),
      },
    })
  }

  async findById(id: number): Promise<Item> {
    const output = await prisma.$queryRaw<Item[]>`
      select BI.id
        from isys_budget_item BI
       where BI.id = ${id}
         and BI.deleted_at is null`

    return output[0]
  }
}
