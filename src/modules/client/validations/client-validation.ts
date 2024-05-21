import { z } from 'zod'

export const createClientSchema = z.object({
  businessName: z.string({
    required_error: 'É necessário informar o nome do cliente.',
  }),
  cnpj: z.string({
    required_error: 'É necessário informar o cnpj do cliente.',
  }),
})

export const updateClientSchema = createClientSchema.extend({
  id: z
    .string()
    .optional()
    .transform((id) => Number(id)),
})

export const listClientSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((page) => Number(page || 1)),
  limit: z
    .number()
    .optional()
    .transform((limit) => Number(limit || 20)),
})

export type CreateClientInput = z.infer<typeof createClientSchema>
export type UpdateClientInput = z.infer<typeof updateClientSchema>

export type ListClientSchema = z.infer<typeof listClientSchema>
