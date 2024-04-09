import { OrderDTO, OrdersRepository } from '../repositories/orders-repository'

export class CreateOrder {
  /**
   *
   */
  constructor(private readonly ordersRepository: OrdersRepository) {}

  public async execute({ table, name }: OrderDTO) {
    const id = await this.ordersRepository.create({
      table,
      name,
    })

    const output = await this.ordersRepository.findById(id)

    return output
  }
}
