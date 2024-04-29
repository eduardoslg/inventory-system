import { PrismaClientRepository } from '../../repositories/implementations/prisma-client-repository'
import { UpdateClient } from '../update-client'

export function makeUpdateClient(): UpdateClient {
  const clientRepository = new PrismaClientRepository()

  return new UpdateClient(clientRepository)
}
