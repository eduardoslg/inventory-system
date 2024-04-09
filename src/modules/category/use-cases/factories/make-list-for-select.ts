import { PrismaCategoriesRepository } from '../../repositories/implementations/prisma-categories-repository'
import { ListForSelect } from '../list-for-select'

export function makeListForSelect(): ListForSelect {
  const categoriesRepository = new PrismaCategoriesRepository()

  return new ListForSelect(categoriesRepository)
}
