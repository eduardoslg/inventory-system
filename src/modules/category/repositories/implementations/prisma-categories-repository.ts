import { prisma } from '@/prisma'
import { Category } from '@prisma/client'

import {
  CategoriesRepository,
  CategoryDTO,
  ListCategoryDTO,
  ListForSelectDTO,
  UpdateCategoryDTO,
} from '../categories-repository'

export class PrismaCategoriesRepository implements CategoriesRepository {
  async create({ name }: CategoryDTO): Promise<number> {
    const output = await prisma.category.create({
      data: {
        name,
      },
      select: {
        id: true,
      },
    })

    return output.id
  }

  async list({ limit, search, page }: ListCategoryDTO): Promise<Category[]> {
    const offset = (page - 1) * limit

    const output = await prisma.$queryRaw<Category[]>`
      SELECT 
        id,
        name,
        created_at,
        updated_at
      FROM 
        categories
      WHERE deleted_at is null
      AND name like ${search}
      ORDER BY name asc
      LIMIT ${limit}
      offset ${offset};
   `

    return output
  }

  async update({ id, name }: UpdateCategoryDTO): Promise<number> {
    const output = await prisma.category.update({
      where: {
        id,
      },
      data: {
        name,
      },
      select: {
        id: true,
      },
    })

    return output.id
  }

  async delete(id: number): Promise<void> {
    await prisma.category.update({
      where: {
        id,
      },
      data: {
        deleted_at: new Date(),
      },
    })
  }

  async findById(id: number): Promise<CategoryDTO> {
    const output = await prisma.$queryRaw<CategoryDTO[]>`
      SELECT 
        id,
        name,
        created_at,
        updated_at,
        deleted_at
      FROM 
        categories
      WHERE id = ${id};
   `

    return output[0]
  }

  async listForSelect(): Promise<ListForSelectDTO[]> {
    const output = await prisma.$queryRaw<ListForSelectDTO[]>`
      SELECT 
        id as value,
        name as label
      FROM 
        categories
      WHERE deleted_at is null;
   `

    return output
  }
}
