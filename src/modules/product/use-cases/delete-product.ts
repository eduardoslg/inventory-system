import AppError from '@/errors/AppError'

import { ProductsRepository } from '../repositories/products-repository'

export class DeleteProduct {
  /**
   *
   */
  constructor(private readonly productsRepository: ProductsRepository) {}

  public async execute(id: number): Promise<boolean> {
    const findProduct = await this.productsRepository.findById(id)

    if (!findProduct) {
      throw new AppError(
        'Nenhum produto encontrado com o identificador informado.',
      )
    }

    await this.productsRepository.delete(id)

    return true
  }
}
