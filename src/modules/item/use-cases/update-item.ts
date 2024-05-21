import AppError from '@/errors/AppError'

import { ItemRepository } from '../repositories/item-repository'
import { UpdateItemInput } from '../validations/item-validation'

export class UpdateItem {
  /**
   *
   */
  constructor(private readonly itemsRepository: ItemRepository) {}

  public async execute({ id, name, suggestedValue }: UpdateItemInput) {
    const itemExists = await this.itemsRepository.findById(id)

    if (!itemExists)
      throw new AppError(
        'Nenhum item encontrado com o identificador informado.',
      )

    const itemId = await this.itemsRepository.update({
      id,
      name,
      suggestedValue,
    })

    const output = await this.itemsRepository.findById(itemId)

    return output
  }
}
