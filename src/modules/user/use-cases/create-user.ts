import { hash } from 'bcryptjs'

import AppError from '@/errors/AppError'

import { CreateUserDTO } from '../DTOs/create-user-dto'
import { UsersRepository } from '../repositories/users-repository'

export class CreateUser {
  /**
   *
   */
  constructor(private readonly usersRepository: UsersRepository) {}

  public async execute({ email, name, password }: CreateUserDTO) {
    const emailExists = await this.usersRepository.findByEmail(email)

    if (emailExists) {
      throw new AppError('Já existe um usuário cadastrado com este email.')
    }

    const passwordHash = await hash(password, 8)

    const id = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    })

    const user = await this.usersRepository.findById(id)

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      created_at: user.created_at,
    }
  }
}
