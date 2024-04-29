import { PrismaMovementTypeRepository } from '../../repositories/implementations/prisma-movement-type-repository'
import { DeleteMovementType } from '../delete-movement-type'

export function makeDeleteMovementType(): DeleteMovementType {
  const movementTypeRepository = new PrismaMovementTypeRepository()

  return new DeleteMovementType(movementTypeRepository)
}
