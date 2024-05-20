import { ItemsRepository } from '../repositories/items-repository'
import { CreateItemInput } from '../validations/item-validation'

export class CreateItem {
  /**
   *
   */
  constructor(private readonly itemsRepository: ItemsRepository) {}

  public async execute({ name, suggestedValue }: CreateItemInput) {
    const id = await this.itemsRepository.create({
      name,
      suggestedValue,
    })

    const output = await this.itemsRepository.findById(id)

    return output
  }
}
