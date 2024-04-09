import { PrismaOrdersRepository } from '../../repositories/implementations/prisma-orders-repository'
import { DeleteOrder } from '../delete-order'

export function makeDeleteOrder(): DeleteOrder {
  const ordersRepository = new PrismaOrdersRepository()

  return new DeleteOrder(ordersRepository)
}
