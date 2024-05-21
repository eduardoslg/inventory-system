import { ItemRepository, ListItemDTO } from '../repositories/item-repository'
import { ListItemSchema } from '../validations/item-validation'

export class ListItems {
  /**
   *
   */
  constructor(private readonly itemsRepository: ItemRepository) {}

  public async execute({ page, limit }: ListItemSchema): Promise<ListItemDTO> {
    const output = await this.itemsRepository.list({ page, limit })

    return output
  }
}
