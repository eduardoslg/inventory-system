import { Request, Response } from 'express'

import { makeAuthUser } from '../use-cases/factories/make-auth-user'

export class SessionController {
  static async authenticate(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { email, password } = request.body

    const authUser = makeAuthUser()

    const user = await authUser.execute(email, password)

    return response.json(user)
  }
}
