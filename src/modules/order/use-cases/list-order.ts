import { Order } from '@prisma/client'

import {
  ListOrderDTO,
  OrdersRepository,
} from '../repositories/orders-repository'

export class ListOrder {
  /**
   *
   */
  constructor(private readonly ordersRepository: OrdersRepository) {}

  public async execute({
    page,
    limit,
    search,
  }: ListOrderDTO): Promise<{ count: number; rows: Order[] }> {
    const output = await this.ordersRepository.list({ page, limit, search })

    const count = await this.ordersRepository.count(search)

    return {
      count,
      rows: output,
    }
  }
}
