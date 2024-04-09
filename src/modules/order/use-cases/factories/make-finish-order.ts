import { PrismaOrdersRepository } from '../../repositories/implementations/prisma-orders-repository'
import { FinishOrder } from '../finish-order'

export function makeFinishOrder(): FinishOrder {
  const ordersRepository = new PrismaOrdersRepository()

  return new FinishOrder(ordersRepository)
}
