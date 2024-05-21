import { PrismaItemRepository } from '../../repositories/implementations/prisma-item-repository'
import { UpdateItem } from '../update-item'

export function makeUpdateItem(): UpdateItem {
  const itemsRepository = new PrismaItemRepository()

  return new UpdateItem(itemsRepository)
}
