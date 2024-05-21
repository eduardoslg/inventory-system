import { PrismaItemRepository } from '@/modules/item/repositories/implementations/prisma-item-repository'

import { PrismaBudgetItemRepository } from '../../repositories/implementations/prisma-budget-item-repository'
import { CreateBudgetItem } from '../create-budget-item'

export function makeCreateBudgetItem(): CreateBudgetItem {
  const budgetItemRepository = new PrismaBudgetItemRepository()
  const itemRepository = new PrismaItemRepository()

  return new CreateBudgetItem(budgetItemRepository, itemRepository)
}
