import AppError from '@/errors/AppError'

import { MovementTypeRepository } from '../repositories/movement-type-repository'

export class DeleteMovementType {
  /**
   *
   */
  constructor(
    private readonly movementTypeRepository: MovementTypeRepository,
  ) {}

  public async execute(id: number): Promise<boolean> {
    const findMovementType = await this.movementTypeRepository.findById(id)

    if (!findMovementType) {
      throw new AppError(
        'Nenhum tipo de movimentação encontrado com o identificador informado.',
      )
    }

    await this.movementTypeRepository.delete(id)

    return true
  }
}
