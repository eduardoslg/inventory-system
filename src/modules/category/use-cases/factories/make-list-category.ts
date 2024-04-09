import { PrismaCategoriesRepository } from '../../repositories/implementations/prisma-categories-repository'
import { ListCategory } from '../list-category'

export function makeListCategory(): ListCategory {
  const categoriesRepository = new PrismaCategoriesRepository()

  return new ListCategory(categoriesRepository)
}
