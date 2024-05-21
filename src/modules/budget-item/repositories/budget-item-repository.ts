import { Item } from '@prisma/client'

import { CreateBudgetItemInput } from '../validations/budget-item-validation'

export type ItemDTO = {
  orderId: number
  productId: number
  amount: number
}

export type ListItemDTO = {
  count: number
  data: Item[]
}

export interface BudgetItemRepository {
  findById(id: number): Promise<Item>
  create(input: CreateBudgetItemInput): Promise<void>
  delete(id: number): Promise<void>
}
