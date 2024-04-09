import { PrismaOrdersRepository } from '../../repositories/implementations/prisma-orders-repository'
import { CreateOrder } from '../create-order'

export function makeCreateOrder(): CreateOrder {
  const ordersRepository = new PrismaOrdersRepository()

  return new CreateOrder(ordersRepository)
}
