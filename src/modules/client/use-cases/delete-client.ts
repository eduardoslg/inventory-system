import AppError from '@/errors/AppError'

import { ClientRepository } from '../repositories/client-repository'

export class DeleteClient {
  /**
   *
   */
  constructor(private readonly clientRepository: ClientRepository) {}

  public async execute(id: number): Promise<boolean> {
    const findClient = await this.clientRepository.findById(id)

    if (!findClient) {
      throw new AppError(
        'Nenhum cliente encontrado com o identificador informado.',
      )
    }

    await this.clientRepository.delete(id)

    return true
  }
}
