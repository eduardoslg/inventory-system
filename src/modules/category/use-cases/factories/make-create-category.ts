import { PrismaCategoriesRepository } from '../../repositories/implementations/prisma-categories-repository'
import { CreateCategory } from '../create-category'

export function makeCreateCategory(): CreateCategory {
  const categoriesRepository = new PrismaCategoriesRepository()

  return new CreateCategory(categoriesRepository)
}
