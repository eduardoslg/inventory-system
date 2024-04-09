import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import authConfig from '../../../config/auth'
import AppError from '../../../errors/AppError'

export function ensureAuthenticated(
  request: Request,
  _: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('Não autorizado.', 401)
  }

  const [bearer, token] = authHeader.split(' ')

  if (bearer !== 'Bearer') {
    throw new AppError('Não autorizado', 401)
  }

  try {
    const decoded = verify(token, authConfig.jwt.secret)
    const { sub } = decoded
    request.user = {
      id: Number(sub),
    }

    return next()
  } catch (error) {
    throw new AppError('Não autorizado', 401)
  }
}
