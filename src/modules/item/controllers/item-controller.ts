import { Request, Response } from 'express'
import { z } from 'zod'

import { getOneRequestSchema } from '@/shared/controllers/get-one-request-schema'

import { makeCreateItem } from '../use-cases/factories/make-create-item'
import { makeDeleteItem } from '../use-cases/factories/make-delete-item'
import { makeListItems } from '../use-cases/factories/make-list-items'

export class ItemController {
  static async create(request: Request, response: Response) {
    const createItemBodySchema = z.object({
      orderId: z.number({
        required_error: 'É necessário informar a mesa.',
      }),
      productId: z.number({
        required_error: 'É necessário informar o produto.',
      }),
      amount: z.number({
        required_error: 'É necessário informar a quantidade.',
      }),
    })

    const { orderId, productId, amount } = createItemBodySchema.parse(
      request.body,
    )

    const createItem = makeCreateItem()

    const output = await createItem.execute({
      orderId,
      productId,
      amount,
    })

    return response.json(output)
  }

  static async list(request: Request, response: Response) {
    const { id } = getOneRequestSchema.parse(request.params)

    const listItems = makeListItems()

    const output = await listItems.execute(id)

    return response.json(output)
  }

  static async delete(request: Request, response: Response) {
    const { id } = getOneRequestSchema.parse(request.params)

    const deleteOrder = makeDeleteItem()

    const output = await deleteOrder.execute(id)

    return response.json(output)
  }
}
