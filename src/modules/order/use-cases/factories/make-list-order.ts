import { PrismaOrdersRepository } from '../../repositories/implementations/prisma-orders-repository'
import { ListOrder } from '../list-order'

export function makeListOrder(): ListOrder {
  const ordersRepository = new PrismaOrdersRepository()

  return new ListOrder(ordersRepository)
}
