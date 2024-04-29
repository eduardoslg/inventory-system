import {
  MovementTypeDTO,
  MovementTypeRepository,
} from '../repositories/movement-type-repository'

export class CreateMovementType {
  /**
   *
   */
  constructor(
    private readonly movementTypeRepository: MovementTypeRepository,
  ) {}

  public async execute({ name }: MovementTypeDTO) {
    const output = await this.movementTypeRepository.create({
      name,
    })

    return output
  }
}
