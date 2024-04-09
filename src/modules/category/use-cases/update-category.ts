import AppError from '@/errors/AppError'

import {
  CategoriesRepository,
  UpdateCategoryDTO,
} from '../repositories/categories-repository'

export class UpdateCategory {
  /**
   *
   */
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  public async execute({ id, name }: UpdateCategoryDTO) {
    const findCategory = await this.categoriesRepository.findById(id)

    if (!findCategory) {
      throw new AppError(
        'Nenhuma categoria encontrado com o identificador informado.',
      )
    }

    const categoryId = await this.categoriesRepository.update({
      id,
      name,
    })

    const output = await this.categoriesRepository.findById(categoryId)

    return output
  }
}
