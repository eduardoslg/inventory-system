import { Category } from '@prisma/client'

export type CategoryDTO = {
  name: string
}

export type UpdateCategoryDTO = CategoryDTO & {
  id: number
}

export type ListForSelectDTO = {
  value: number
  label: string
}

export type ListCategoryDTO = {
  page: number
  limit: number
  search?: string
}

export interface CategoriesRepository {
  findById(id: number): Promise<CategoryDTO>
  create(input: CategoryDTO): Promise<number>
  list(input: ListCategoryDTO): Promise<Category[]>
  update(input: UpdateCategoryDTO): Promise<number>
  delete(id: number): Promise<void>
  listForSelect(): Promise<ListForSelectDTO[]>
}
