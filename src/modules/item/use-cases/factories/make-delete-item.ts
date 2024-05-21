import { PrismaItemRepository } from '../../repositories/implementations/prisma-item-repository'
import { DeleteItem } from '../delete-item'

export function makeDeleteItem(): DeleteItem {
  const itemsRepository = new PrismaItemRepository()

  return new DeleteItem(itemsRepository)
}
