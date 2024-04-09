import AppError from '@/errors/AppError'

import {
  UpdateUserDTO,
  UsersRepository,
} from '../repositories/users-repository'

export class UpdateUser {
  /**
   *
   */
  constructor(private readonly usersRepository: UsersRepository) {}

  public async execute({ id, name }: UpdateUserDTO) {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new AppError('Nenhum usuário encontrado com o id informado.')
    }

    await this.usersRepository.update({
      id,
      name,
    })

    return {
      id,
      name,
    }
  }
}
