import { PrismaCategoriesRepository } from '../../repositories/implementations/prisma-categories-repository'
import { UpdateCategory } from '../update-category'

export function makeUpdateCategory(): UpdateCategory {
  const categoriesRepository = new PrismaCategoriesRepository()

  return new UpdateCategory(categoriesRepository)
}
