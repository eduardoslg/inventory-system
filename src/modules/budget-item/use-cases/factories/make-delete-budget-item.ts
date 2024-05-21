import { PrismaBudgetItemRepository } from '../../repositories/implementations/prisma-budget-item-repository'
import { DeleteBudgetItem } from '../delete-budget-item'

export function makeDeleteBudgetItem(): DeleteBudgetItem {
  const budgetItemRepository = new PrismaBudgetItemRepository()

  return new DeleteBudgetItem(budgetItemRepository)
}
