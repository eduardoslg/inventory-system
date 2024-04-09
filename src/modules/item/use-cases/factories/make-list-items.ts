import { PrismaOrdersRepository } from '@/modules/order/repositories/implementations/prisma-orders-repository'

import { PrismaItemsRepository } from '../../repositories/implementations/prisma-items-repository'
import { ListItems } from '../list-items'

export function makeListItems(): ListItems {
  const itemsRepository = new PrismaItemsRepository()
  const ordersRepository = new PrismaOrdersRepository()

  return new ListItems(itemsRepository, ordersRepository)
}
