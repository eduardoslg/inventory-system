import { PrismaOrdersRepository } from '@/modules/order/repositories/implementations/prisma-orders-repository'
import { PrismaProductsRepository } from '@/modules/product/repositories/implementations/prisma-products-repository'

import { PrismaItemsRepository } from '../../repositories/implementations/prisma-items-repository'
import { CreateItem } from '../create-item'

export function makeCreateItem(): CreateItem {
  const itemsRepository = new PrismaItemsRepository()
  const ordersRepository = new PrismaOrdersRepository()
  const productsRepository = new PrismaProductsRepository()

  return new CreateItem(itemsRepository, ordersRepository, productsRepository)
}
