import { Request, Response } from 'express'
import { z } from 'zod'

import { getOneRequestSchema } from '@/shared/controllers/get-one-request-schema'

import { makeCreateMovementType } from '../use-cases/factories/make-create-movement-type'
import { makeDeleteMovementType } from '../use-cases/factories/make-delete-movement-type'
import { makeListMovementTypeForDropdown } from '../use-cases/factories/make-list-movement-type-for-dropdown'
import { makeUpdateMovementType } from '../use-cases/factories/make-update-movement-type'

export class MovementTypeController {
  static async create(request: Request, response: Response) {
    const createItemBodySchema = z.object({
      name: z.string({
        required_error: 'É necessário informar o nome.',
      }),
    })

    const { name } = createItemBodySchema.parse(request.body)

    const createMovementType = makeCreateMovementType()

    const output = await createMovementType.execute({
      name,
    })

    return response.json(output)
  }

  static async update(request: Request, response: Response) {
    const createItemBodySchema = z.object({
      name: z.string({
        required_error: 'É necessário informar o nome.',
      }),
    })

    const { id } = getOneRequestSchema.parse(request.params)

    const { name } = createItemBodySchema.parse(request.body)

    const updateMovementType = makeUpdateMovementType()

    const output = await updateMovementType.execute({
      id,
      name,
    })

    return response.json(output)
  }

  static async listForDropdown(request: Request, response: Response) {
    const listMovementTypeForDropdown = makeListMovementTypeForDropdown()

    const output = await listMovementTypeForDropdown.execute()

    return response.json(output)
  }

  static async delete(request: Request, response: Response) {
    const { id } = getOneRequestSchema.parse(request.params)

    const deleteMovementType = makeDeleteMovementType()

    const output = await deleteMovementType.execute(id)

    return response.json(output)
  }
}
