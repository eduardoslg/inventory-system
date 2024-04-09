import * as dotenv from 'dotenv'

import AppError from '../errors/AppError'

dotenv.config()

export function getEnvConfig(option: string): any | number {
  const optionValue = process.env[option]

  if (!optionValue)
    throw new AppError(`Opção ${option} não configurada neste ambiente.`)

  return optionValue
}
