import {
  CategoriesRepository,
  CategoryDTO,
} from '../repositories/categories-repository'

export class CreateCategory {
  /**
   *
   */
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  public async execute({ name }: CategoryDTO) {
    const id = await this.categoriesRepository.create({
      name,
    })

    const output = await this.categoriesRepository.findById(id)

    return output
  }
}
