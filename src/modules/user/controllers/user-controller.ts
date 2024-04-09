import { Request, Response } from 'express'
import { z } from 'zod'

import { makeCreateUser } from '../use-cases/factories/make-create-user'
import { makeUpdateUser } from '../use-cases/factories/make-update-user'

export class UserController {
  static async create(request: Request, response: Response) {
    const createUserBodySchema = z.object({
      name: z.string({
        required_error: 'É necessário informar o campo nome.',
      }),
      email: z.string({
        required_error: 'É necessário informar o campo email.',
      }),
      password: z.string({
        required_error: 'É necessário informar o campo senha.',
      }),
    })

    const { name, email, password } = createUserBodySchema.parse(request.body)

    const createUser = makeCreateUser()

    const output = await createUser.execute({ name, email, password })

    return response.json(output)
  }

  static async update(request: Request, response: Response) {
    const updateUserParamsSchema = z.object({
      id: z.coerce.number(),
    })

    const updateUserBodySchema = z.object({
      name: z.string().optional(),
    })

    const { id } = updateUserParamsSchema.parse(request.params)

    const { name } = updateUserBodySchema.parse(request.body)

    const updateUser = makeUpdateUser()

    const output = await updateUser.execute({ id, name })

    return response.json(output)
  }
}
