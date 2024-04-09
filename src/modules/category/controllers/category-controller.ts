import { Request, Response } from 'express'
import { z } from 'zod'

import { getOneRequestSchema } from '@/shared/controllers/get-one-request-schema'
import { listRequestSchema } from '@/shared/controllers/list-request-schema'

import { makeCreateCategory } from '../use-cases/factories/make-create-category'
import { makeDeleteCategory } from '../use-cases/factories/make-delete-category'
import { makeListCategory } from '../use-cases/factories/make-list-category'
import { makeListForSelect } from '../use-cases/factories/make-list-for-select'
import { makeUpdateCategory } from '../use-cases/factories/make-update-category'

export class CategoryController {
  static async create(request: Request, response: Response) {
    const createCategoryBodySchema = z.object({
      name: z.string({
        required_error: 'É necessário informar o campo nome.',
      }),
    })

    const { name } = createCategoryBodySchema.parse(request.body)

    const createCategory = makeCreateCategory()

    const output = await createCategory.execute({
      name,
    })

    return response.json(output)
  }

  static async list(request: Request, response: Response) {
    const { page, limit, search } = listRequestSchema.parse(request.query)

    const listCategory = makeListCategory()

    const output = await listCategory.execute({ limit, page, search })

    return response.json(output)
  }

  static async update(request: Request, response: Response) {
    const updateCategoryBodySchema = z.object({
      name: z.string({
        required_error: 'É necessário informar o campo nome.',
      }),
    })

    const { id } = getOneRequestSchema.parse(request.params)
    const { name } = updateCategoryBodySchema.parse(request.body)

    const updateCategory = makeUpdateCategory()

    const output = await updateCategory.execute({
      id,
      name,
    })

    return response.json(output)
  }

  static async delete(request: Request, response: Response) {
    const { id } = getOneRequestSchema.parse(request.params)

    const deleteCategory = makeDeleteCategory()

    const output = await deleteCategory.execute(id)

    return response.json(output)
  }

  static async listForSelect(request: Request, response: Response) {
    const listForSelect = makeListForSelect()

    const output = await listForSelect.execute()

    return response.json(output)
  }
}
