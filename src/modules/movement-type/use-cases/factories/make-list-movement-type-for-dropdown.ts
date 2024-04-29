import { PrismaMovementTypeRepository } from '../../repositories/implementations/prisma-movement-type-repository'
import { ListMovementTypeForDropdown } from '../list-movement-type-for-dropdown'

export function makeListMovementTypeForDropdown(): ListMovementTypeForDropdown {
  const movementTypeRepository = new PrismaMovementTypeRepository()

  return new ListMovementTypeForDropdown(movementTypeRepository)
}
