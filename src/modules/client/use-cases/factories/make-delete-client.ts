import { PrismaClientRepository } from '../../repositories/implementations/prisma-client-repository'
import { DeleteClient } from '../delete-client'

export function makeDeleteClient(): DeleteClient {
  const clientRepository = new PrismaClientRepository()

  return new DeleteClient(clientRepository)
}
