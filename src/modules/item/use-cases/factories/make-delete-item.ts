import { PrismaItemsRepository } from '../../repositories/implementations/prisma-items-repository'
import { DeleteItem } from '../delete-item'

export function makeDeleteItem(): DeleteItem {
  const itemsRepository = new PrismaItemsRepository()

  return new DeleteItem(itemsRepository)
}
