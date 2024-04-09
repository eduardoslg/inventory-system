import AppError from '@/errors/AppError'
import { OrdersRepository } from '@/modules/order/repositories/orders-repository'
import { ProductsRepository } from '@/modules/product/repositories/products-repository'

import { ItemDTO, ItemsRepository } from '../repositories/items-repository'

export class CreateItem {
  /**
   *
   */
  constructor(
    private readonly itemsRepository: ItemsRepository,
    private readonly ordersRepository: OrdersRepository,
    private readonly productsRepository: ProductsRepository,
  ) {}

  public async execute({ orderId, productId, amount }: ItemDTO) {
    const order = await this.ordersRepository.findById(orderId)
    const product = await this.productsRepository.findById(productId)

    if (!order) {
      throw new AppError(
        'Nenhuma mesa encontrada com o identificador informado.',
      )
    }

    if (!product) {
      throw new AppError(
        'Nenhum produto encontrado com o identificador informado.',
      )
    }

    const id = await this.itemsRepository.create({
      orderId,
      productId,
      amount,
    })

    const output = await this.itemsRepository.findById(id)

    return output
  }
}
