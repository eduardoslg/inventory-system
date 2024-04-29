import { PrismaClientRepository } from '../../repositories/implementations/prisma-client-repository'
import { ListClientForDropdown } from '../list-client-for-dropdown'

export function makeListClientForDropdown(): ListClientForDropdown {
  const clientRepository = new PrismaClientRepository()

  return new ListClientForDropdown(clientRepository)
}
