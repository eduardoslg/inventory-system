import { Request, Response } from 'express'
import { z } from 'zod'

import { getOneRequestSchema } from '@/shared/controllers/get-one-request-schema'

import { makeCreateItem } from '../use-cases/factories/make-create-item'
import { makeDeleteItem } from '../use-cases/factories/make-delete-item'
import { makeListItems } from '../use-cases/factories/make-list-items'
import {
  createItemSchema,
  listItemSchema,
} from '../validations/item-validation'

export class ItemController {
  static async create(request: Request, response: Response) {
    const { name, suggestedValue } = createItemSchema.parse(request.body)

    const createItem = makeCreateItem()

    const output = await createItem.execute({
      name,
      suggestedValue,
    })

    return response.json(output)
  }

  static async list(request: Request, response: Response) {
    const { page, limit } = listItemSchema.parse(request.params)

    const listItems = makeListItems()

    const output = await listItems.execute({ page, limit })

    return response.json(output)
  }

  static async listForDropdown(request: Request, response: Response) {
    const listItems = makeListItems()

    const output = await listItems.execute()

    return response.json(output)
  }

  static async delete(request: Request, response: Response) {
    const { id } = getOneRequestSchema.parse(request.params)

    const deleteOrder = makeDeleteItem()

    const output = await deleteOrder.execute(id)

    return response.json(output)
  }
}
