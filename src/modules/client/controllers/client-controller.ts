import { Request, Response } from 'express'

import { listItemSchema } from '@/modules/item/validations/item-validation'
import { getOneRequestSchema } from '@/shared/controllers/get-one-request-schema'

import { makeListClientForDropdown } from '../use-cases/factories/make-client-for-dropdown'
import { makeCreateClient } from '../use-cases/factories/make-create-client'
import { makeDeleteClient } from '../use-cases/factories/make-delete-client'
import { makeListClient } from '../use-cases/factories/make-list-client'
import { makeUpdateClient } from '../use-cases/factories/make-update-client'
import {
  createClientSchema,
  updateClientSchema,
} from '../validations/client-validation'

export class ClientController {
  static async create(request: Request, response: Response) {
    const { businessName, cnpj } = createClientSchema.parse(request.body)

    const createClient = makeCreateClient()

    const output = await createClient.execute({
      businessName,
      cnpj,
    })

    return response.json(output)
  }

  static async update(request: Request, response: Response) {
    const { id } = getOneRequestSchema.parse(request.params)

    const { businessName, cnpj } = updateClientSchema.parse(request.body)

    const updateClient = makeUpdateClient()

    const output = await updateClient.execute({
      id,
      businessName,
      cnpj,
    })

    return response.json(output)
  }

  static async list(request: Request, response: Response) {
    const { page, limit } = listItemSchema.parse(request.params)

    const listClient = makeListClient()

    const output = await listClient.execute({ page, limit })

    return response.json(output)
  }

  static async listForDropdown(request: Request, response: Response) {
    const listClientForDropdown = makeListClientForDropdown()

    const output = await listClientForDropdown.execute()

    return response.json(output)
  }

  static async delete(request: Request, response: Response) {
    const { id } = getOneRequestSchema.parse(request.params)

    const deleteClient = makeDeleteClient()

    const output = await deleteClient.execute(id)

    return response.json(output)
  }
}
