import { PrismaProductsRepository } from '../../repositories/implementations/prisma-products-repository'
import { UpdateProduct } from '../update-product'

export function makeUpdateProduct(): UpdateProduct {
  const productsRepository = new PrismaProductsRepository()

  return new UpdateProduct(productsRepository)
}
