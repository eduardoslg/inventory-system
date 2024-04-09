import { PrismaCategoriesRepository } from '../../repositories/implementations/prisma-categories-repository'
import { DeleteCategory } from '../delete-category'

export function makeDeleteCategory(): DeleteCategory {
  const categoriesRepository = new PrismaCategoriesRepository()

  return new DeleteCategory(categoriesRepository)
}
