import AppError from '@/errors/AppError'

import {
  MovementTypeRepository,
  MovementTypeWithId,
} from '../repositories/movement-type-repository'

export class UpdateMovementType {
  /**
   *
   */
  constructor(
    private readonly movementTypeRepository: MovementTypeRepository,
  ) {}

  public async execute({ id, name }: MovementTypeWithId) {
    const findMovementType = await this.movementTypeRepository.findById(id)

    if (!findMovementType) {
      throw new AppError(
        'Nenhum tipo de movimentação encontrado com esse ID informado.',
      )
    }

    const output = await this.movementTypeRepository.update({
      id,
      name,
    })

    return output
  }
}
