import { getEnvConfig } from '@/config/env'
import AppError from '@/errors/AppError'

import {
  ProductsRepository,
  UpdateProductDTO,
} from '../repositories/products-repository'

export class UpdateProduct {
  /**
   *
   */
  constructor(private readonly productsRepository: ProductsRepository) {}

  public async execute({
    id,
    name,
    price,
    description,
    banner,
  }: UpdateProductDTO) {
    const findProduct = await this.productsRepository.findById(id)

    if (!findProduct) {
      throw new AppError(
        'Nenhum produto encontrado com o identificador informado.',
      )
    }

    const productId = await this.productsRepository.update({
      id,
      name,
      price,
      description,
      banner,
    })

    const output = await this.productsRepository.findById(productId)

    return {
      ...output,
      route: `${getEnvConfig('ENV')}/medias/${output.banner}`,
    }
  }
}
