import { z } from 'zod'

export const getOneRequestSchema = z.object({
  id: z.coerce.number({
    required_error: 'O parâmetro ID não foi informado.',
  }),
})

export type GetOneRequest = z.infer<typeof getOneRequestSchema>
