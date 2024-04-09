import AppError from '@/errors/AppError'

import { CategoriesRepository } from '../repositories/categories-repository'

export class DeleteCategory {
  /**
   *
   */
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  public async execute(id: number): Promise<boolean> {
    const findCategory = await this.categoriesRepository.findById(id)

    if (!findCategory) {
      throw new AppError(
        'Nenhuma categoria encontrado com o identificador informado.',
      )
    }

    await this.categoriesRepository.delete(id)

    return true
  }
}
