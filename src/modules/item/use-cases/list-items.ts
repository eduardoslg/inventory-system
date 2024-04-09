import AppError from '@/errors/AppError'
import { OrdersRepository } from '@/modules/order/repositories/orders-repository'
import { Item } from '@prisma/client'

import { ItemsRepository } from '../repositories/items-repository'

export class ListItems {
  /**
   *
   */
  constructor(
    private readonly itemsRepository: ItemsRepository,
    private readonly ordersRepository: OrdersRepository,
  ) {}

  public async execute(orderId: number): Promise<Item[]> {
    const findOrder = await this.ordersRepository.findById(orderId)

    if (!findOrder) {
      throw new AppError(
        'Nenhum pedido encontrado com o identificador informado.',
      )
    }

    const output = await this.itemsRepository.list(orderId)

    return output
  }
}
