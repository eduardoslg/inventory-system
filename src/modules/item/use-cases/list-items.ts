import { Item } from '@prisma/client'

import { ItemsRepository } from '../repositories/items-repository'
import { ListItemSchema } from '../validations/item-validation'

export class ListItems {
  /**
   *
   */
  constructor(private readonly itemsRepository: ItemsRepository) {}

  public async execute({ page, limit }: ListItemSchema): Promise<Item[]> {
    const output = await this.itemsRepository.list({ page, limit })

    return output
  }
}
