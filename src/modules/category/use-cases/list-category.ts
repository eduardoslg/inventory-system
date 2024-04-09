import { Category } from '@prisma/client'

import {
  CategoriesRepository,
  ListCategoryDTO,
} from '../repositories/categories-repository'

export class ListCategory {
  /**
   *
   */
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  public async execute({
    page,
    limit,
    search,
  }: ListCategoryDTO): Promise<Category[]> {
    const output = await this.categoriesRepository.list({ page, limit, search })

    return output
  }
}
