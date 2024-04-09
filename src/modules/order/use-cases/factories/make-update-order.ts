import { PrismaOrdersRepository } from '../../repositories/implementations/prisma-orders-repository'
import { UpdateOrder } from '../update-order'

export function makeUpdateOrder(): UpdateOrder {
  const ordersRepository = new PrismaOrdersRepository()

  return new UpdateOrder(ordersRepository)
}
