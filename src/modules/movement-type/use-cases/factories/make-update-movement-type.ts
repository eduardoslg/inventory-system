import { PrismaMovementTypeRepository } from '../../repositories/implementations/prisma-movement-type-repository'
import { UpdateMovementType } from '../update-movement-type'

export function makeUpdateMovementType(): UpdateMovementType {
  const movementTypeRepository = new PrismaMovementTypeRepository()

  return new UpdateMovementType(movementTypeRepository)
}
