import { Response, Request, NextFunction } from 'express'
import { ZodError } from 'zod'

import AppError from '../errors/AppError'
export default function errorHandler(
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'Error',
      message: err.message,
    })
  }

  if (err instanceof ZodError) {
    return response.status(400).send({
      status: 'Validation error',
      message: err.errors[0],
    })
  }

  console.log(err)

  return response.status(500).json({
    status: 'Error',
    message: 'Internal server error',
    error: JSON.stringify(err),
  })
}
