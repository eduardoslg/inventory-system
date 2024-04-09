import { getEnvConfig } from '@/config/env'

import {
  ProductDTO,
  ProductsRepository,
} from '../repositories/products-repository'

export class CreateProduct {
  /**
   *
   */
  constructor(private readonly productsRepository: ProductsRepository) {}

  public async execute({
    name,
    price,
    description,
    banner,
    categoryId,
  }: ProductDTO) {
    const id = await this.productsRepository.create({
      name,
      price,
      description,
      banner,
      categoryId,
    })

    const output = await this.productsRepository.findById(id)

    return {
      ...output,
      route: `${getEnvConfig('ENV')}/medias/${output.banner}`,
    }
  }
}
