import { PrismaMovementTypeRepository } from '../../repositories/implementations/prisma-movement-type-repository'
import { CreateMovementType } from '../create-movement-type'

export function makeCreateMovementType(): CreateMovementType {
  const movementTypeRepository = new PrismaMovementTypeRepository()

  return new CreateMovementType(movementTypeRepository)
}
