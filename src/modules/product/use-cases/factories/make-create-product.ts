import { PrismaProductsRepository } from '../../repositories/implementations/prisma-products-repository'
import { CreateProduct } from '../create-product'

export function makeCreateProduct(): CreateProduct {
  const productsRepository = new PrismaProductsRepository()

  return new CreateProduct(productsRepository)
}
