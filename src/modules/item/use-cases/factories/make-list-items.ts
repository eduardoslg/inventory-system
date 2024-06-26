import { PrismaItemRepository } from '../../repositories/implementations/prisma-item-repository'
import { ListItems } from '../list-items'

export function makeListItems(): ListItems {
  const itemsRepository = new PrismaItemRepository()

  return new ListItems(itemsRepository)
}
