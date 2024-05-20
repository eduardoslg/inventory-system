import { PrismaItemsRepository } from '../../repositories/implementations/prisma-items-repository'
import { CreateItem } from '../create-item'

export function makeCreateItem(): CreateItem {
  const itemsRepository = new PrismaItemsRepository()

  return new CreateItem(itemsRepository)
}
