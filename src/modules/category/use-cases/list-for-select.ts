import {
  CategoriesRepository,
  ListForSelectDTO,
} from '../repositories/categories-repository'

export class ListForSelect {
  /**
   *
   */
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  public async execute(): Promise<ListForSelectDTO[]> {
    const output = await this.categoriesRepository.listForSelect()

    return output
  }
}
