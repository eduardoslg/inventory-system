import { PrismaProductsRepository } from '../../repositories/implementations/prisma-products-repository'
import { DeleteProduct } from '../delete-product'

export function makeDeleteProduct(): DeleteProduct {
  const productsRepository = new PrismaProductsRepository()

  return new DeleteProduct(productsRepository)
}
