import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import { getEnvConfig } from '@/config/env'
import AppError from '@/errors/AppError'

import { UsersRepository } from '../repositories/users-repository'

export class AuthUser {
  /**
   *
   */
  constructor(private readonly usersRepository: UsersRepository) {}

  public async execute(email: string, password: string): Promise<any> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user.id) {
      throw new AppError('Usuário ou senha inválidos.')
    }

    // preciso verificar se a senha que ele mandou está correta.
    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError('Usuário ou senha inválidos.')
    }

    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      getEnvConfig('JWT_SECRET'),
      {
        subject: String(user.id),
        expiresIn: '30d',
      },
    )

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    }
  }
}
