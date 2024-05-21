import { PrismaItemRepository } from '../../repositories/implementations/prisma-item-repository'
import { CreateItem } from '../create-item'

export function makeCreateItem(): CreateItem {
  const itemsRepository = new PrismaItemRepository()

  return new CreateItem(itemsRepository)
}
