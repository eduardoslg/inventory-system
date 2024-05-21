import { PrismaClientRepository } from '../../repositories/implementations/prisma-client-repository'
import { ListClient } from '../list-client'

export function makeListClient(): ListClient {
  const clientRepository = new PrismaClientRepository()

  return new ListClient(clientRepository)
}
