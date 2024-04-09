import { PrismaUsersRepository } from '../../repositories/implementations/prisma-users-repository'
import { CreateUser } from '../create-user'

export function makeCreateUser(): CreateUser {
  const usersRepository = new PrismaUsersRepository()

  return new CreateUser(usersRepository)
}
