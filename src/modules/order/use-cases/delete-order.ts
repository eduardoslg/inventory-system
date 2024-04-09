import AppError from '@/errors/AppError'

import { OrdersRepository } from '../repositories/orders-repository'

export class DeleteOrder {
  /**
   *
   */
  constructor(private readonly ordersRepository: OrdersRepository) {}

  public async execute(id: number): Promise<boolean> {
    const findOrder = await this.ordersRepository.findById(id)

    if (!findOrder) {
      throw new AppError(
        'Nenhum pedido encontrado com o identificador informado.',
      )
    }

    await this.ordersRepository.delete(id)

    return true
  }
}
