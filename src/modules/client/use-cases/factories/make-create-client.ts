import { PrismaClientRepository } from '../../repositories/implementations/prisma-client-repository'
import { CreateClient } from '../create-client'

export function makeCreateClient(): CreateClient {
  const clientRepository = new PrismaClientRepository()

  return new CreateClient(clientRepository)
}
