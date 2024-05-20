import {
  ItemsRepository,
  ListItemForDropdownDTO,
} from '../repositories/items-repository'

export class ListItemsForDropdown {
  /**
   *
   */
  constructor(private readonly itemsRepository: ItemsRepository) {}

  public async execute(): Promise<ListItemForDropdownDTO[]> {
    const output = await this.itemsRepository.listForDropdown()

    return output
  }
}
