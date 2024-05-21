import {
  ItemRepository,
  ListItemForDropdownDTO,
} from '../repositories/item-repository'

export class ListItemsForDropdown {
  /**
   *
   */
  constructor(private readonly itemsRepository: ItemRepository) {}

  public async execute(): Promise<ListItemForDropdownDTO[]> {
    const output = await this.itemsRepository.listForDropdown()

    return output
  }
}
