import { z } from 'zod'

import removeInvalidSearchChars from '@/utils/remove-invalid-search-chars'

export const listRequestSchema = z.object({
  page: z.coerce
    .number()
    .default(1)
    .transform((arg) => arg || 1),
  limit: z.coerce
    .number()
    .default(20)
    .transform((arg) => arg || 20),
  search: z.coerce
    .string()
    .nullish()
    .transform((arg) => (arg ? `%${removeInvalidSearchChars(arg)}%` : '%%')),
})

export type ListRequest = z.infer<typeof listRequestSchema>
