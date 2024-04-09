import AppError from '@/errors/AppError'

import {
  OrdersRepository,
  UpdateOrderDTO,
} from '../repositories/orders-repository'

export class UpdateOrder {
  /**
   *
   */
  constructor(private readonly ordersRepository: OrdersRepository) {}

  public async execute({ id, table, name }: UpdateOrderDTO) {
    const findCategory = await this.ordersRepository.findById(id)

    if (!findCategory) {
      throw new AppError(
        'Nenhum pedido encontrado com o identificador informado.',
      )
    }

    const orderId = await this.ordersRepository.update({
      id,
      table,
      name,
    })

    const output = await this.ordersRepository.findById(orderId)

    return output
  }
}
