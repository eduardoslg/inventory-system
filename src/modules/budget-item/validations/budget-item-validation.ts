import { z } from 'zod'

export const createBudgetItemSchema = z.object({
  budgetId: z.number(),
  itemId: z.number(),
  value: z.number(),
})

export type CreateBudgetItemInput = z.infer<typeof createBudgetItemSchema>
