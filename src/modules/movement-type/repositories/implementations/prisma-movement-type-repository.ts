import { prisma } from '@/prisma'
import { MovementType } from '@prisma/client'

import {
  MovementTypeDTO,
  MovementTypeRepository,
  MovementTypeWithId,
} from '../movement-type-repository'

export class PrismaMovementTypeRepository implements MovementTypeRepository {
  async create({ name }: MovementTypeDTO): Promise<MovementTypeWithId> {
    const output = await prisma.movementType.create({
      data: {
        name,
      },
      select: {
        id: true,
        name: true,
      },
    })

    return output
  }

  async update({ id, name }: MovementTypeWithId): Promise<MovementTypeWithId> {
    const output = await prisma.movementType.update({
      where: {
        id,
      },
      data: {
        name,
      },
      select: {
        id: true,
        name: true,
      },
    })

    return output
  }

  async delete(id: number): Promise<void> {
    await prisma.movementType.update({
      where: {
        id,
      },
      data: {
        deleted_at: new Date(),
      },
    })
  }

  async findById(id: number): Promise<MovementType> {
    const output = await prisma.$queryRaw<MovementType[]>`
      SELECT id, 
             name
        FROM movement_type MT 
       WHERE MT.id = ${id}`

    return output[0]
  }

  async listForDropdown(): Promise<MovementType[]> {
    const output = await prisma.$queryRaw<MovementType[]>`
      SELECT id as value, 
             name as label
        FROM movement_type MT
       ORDER BY MT."name" DESC
      `

    return output
  }
}
