import { Request, Response } from 'express'
import { z } from 'zod'

import { getOneRequestSchema } from '@/shared/controllers/get-one-request-schema'
import { listRequestSchema } from '@/shared/controllers/list-request-schema'

import { makeCreateOrder } from '../use-cases/factories/make-create-order'
import { makeDeleteOrder } from '../use-cases/factories/make-delete-order'
import { makeFinishOrder } from '../use-cases/factories/make-finish-order'
import { makeListOrder } from '../use-cases/factories/make-list-order'
import { makeUpdateOrder } from '../use-cases/factories/make-update-order'

export class OrderController {
  static async create(request: Request, response: Response) {
    const createOrderBodySchema = z.object({
      table: z.number({
        required_error: 'É necessário informar o campo table.',
      }),
      name: z.string({
        required_error: 'É necessário informar o campo nome.',
      }),
    })

    const { table, name } = createOrderBodySchema.parse(request.body)

    const createOrder = makeCreateOrder()

    const output = await createOrder.execute({
      table,
      name,
    })

    return response.json(output)
  }

  static async list(request: Request, response: Response) {
    const { page, limit, search } = listRequestSchema.parse(request.query)

    const listOrder = makeListOrder()

    const output = await listOrder.execute({ limit, page, search })

    return response.json(output)
  }

  static async update(request: Request, response: Response) {
    const updateOrderBodySchema = z.object({
      table: z.number({
        required_error: 'É necessário informar o campo table.',
      }),
      name: z.string({
        required_error: 'É necessário informar o campo nome.',
      }),
    })

    const { id } = getOneRequestSchema.parse(request.params)
    const { table, name } = updateOrderBodySchema.parse(request.body)

    const updateOrder = makeUpdateOrder()

    const output = await updateOrder.execute({
      id,
      table,
      name,
    })

    return response.json(output)
  }

  static async finish(request: Request, response: Response) {
    const { id } = getOneRequestSchema.parse(request.params)

    const finishOrder = makeFinishOrder()

    const output = await finishOrder.execute(id)

    return response.json(output)
  }

  static async delete(request: Request, response: Response) {
    const { id } = getOneRequestSchema.parse(request.params)

    const deleteOrder = makeDeleteOrder()

    const output = await deleteOrder.execute(id)

    return response.json(output)
  }
}
