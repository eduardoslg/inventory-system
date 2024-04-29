import { MovementType } from '@prisma/client'

import { MovementTypeRepository } from '../repositories/movement-type-repository'

export class ListMovementTypeForDropdown {
  /**
   *
   */
  constructor(
    private readonly movementTypeRepository: MovementTypeRepository,
  ) {}

  public async execute(): Promise<MovementType[]> {
    const output = await this.movementTypeRepository.listForDropdown()

    return output
  }
}
