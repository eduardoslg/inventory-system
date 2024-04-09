import { PrismaUsersRepository } from '../../repositories/implementations/prisma-users-repository'
import { UpdateUser } from '../update-user'

export function makeUpdateUser(): UpdateUser {
  const usersRepository = new PrismaUsersRepository()

  return new UpdateUser(usersRepository)
}
