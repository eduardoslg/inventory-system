import { PrismaUsersRepository } from '../../repositories/implementations/prisma-users-repository'
import { AuthUser } from '../auth-user'

export function makeAuthUser(): AuthUser {
  const usersRepository = new PrismaUsersRepository()

  return new AuthUser(usersRepository)
}
