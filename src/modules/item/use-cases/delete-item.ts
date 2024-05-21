import AppError from '@/errors/AppError'

import { ItemRepository } from '../repositories/item-repository'

export class DeleteItem {
  /**
   *
   */
  constructor(private readonly itemsRepository: ItemRepository) {}

  public async execute(id: number): Promise<boolean> {
    const findItem = await this.itemsRepository.findById(id)

    if (!findItem) {
      throw new AppError(
        'Nenhuma item encontrado com o identificador informado.',
      )
    }

    await this.itemsRepository.delete(id)

    return true
  }
}
