import { z } from 'zod'

export const createItemSchema = z.object({
  name: z.string({
    required_error: 'É necessário informar o nome.',
  }),
  suggestedValue: z.number({
    required_error: 'É necessário informar o preço sugerido.',
  }),
})

export const updateItemSchema = createItemSchema.extend({
  id: z
    .string()
    .optional()
    .transform((id) => Number(id)),
})

export const listItemSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((page) => Number(page || 1)),
  limit: z
    .number()
    .optional()
    .transform((limit) => Number(limit || 20)),
})

export type CreateItemInput = z.infer<typeof createItemSchema>
export type UpdateItemInput = z.infer<typeof updateItemSchema>

export type ListItemSchema = z.infer<typeof listItemSchema>
