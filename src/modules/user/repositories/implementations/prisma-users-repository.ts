import { prisma } from '@/prisma'

import { CreateUserDTO } from '../../DTOs/create-user-dto'
import { UpdateUserDTO, User, UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async create(input: CreateUserDTO): Promise<number> {
    const output = await prisma.user.create({
      data: input,
      select: {
        id: true,
      },
    })

    return output.id
  }

  async update(input: UpdateUserDTO): Promise<number> {
    const { id, name } = input

    const output = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
      },
    })

    return output.id
  }

  async findById(id: number): Promise<User> {
    const output = await prisma.$queryRaw<User[]>`SELECT 
         id,
         name,
         email,
         created_at,
         updated_at,
         deleted_at
       FROM 
         users
       WHERE 
         (id = ${id} and deleted_at is null)`

    return output[0]
  }

  async findByEmail(email: string): Promise<User> {
    const output = await prisma.$queryRaw<User[]>`SELECT 
         id,
         name,
         email,
         password,
         created_at,
         updated_at,
         deleted_at
       FROM 
         users
       WHERE 
         (email = ${email} and deleted_at is null)`

    return output[0]
  }
}
