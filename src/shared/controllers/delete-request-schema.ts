import { z } from 'zod'

export const deleteRequestSchema = z.object({
  id: z.coerce.number({
    required_error: 'O parâmetro ID não foi informado.',
  }),
})

export type DeleteRequest = z.infer<typeof deleteRequestSchema>
