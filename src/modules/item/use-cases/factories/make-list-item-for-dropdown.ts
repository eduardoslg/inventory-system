import { PrismaItemRepository } from '../../repositories/implementations/prisma-item-repository'
import { ListItemsForDropdown } from '../list-items-for-dropdown'

export function makeListItemsForDropdown(): ListItemsForDropdown {
  const itemsRepository = new PrismaItemRepository()

  return new ListItemsForDropdown(itemsRepository)
}
