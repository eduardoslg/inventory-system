import AppError from '@/errors/AppError'
import { removeInvalidSearchCharacters } from '@/utils/remove-invalid-characters'

import {
  ClientRepository,
  ClientWithId,
} from '../repositories/client-repository'

export class UpdateClient {
  /**
   *
   */
  constructor(private readonly clientRepository: ClientRepository) {}

  public async execute({ id, businessName, cnpj }: ClientWithId) {
    const formattedCnpj = removeInvalidSearchCharacters(cnpj ?? '')

    const clientExists = await this.clientRepository.findById(id)

    if (!clientExists) {
      throw new AppError('Nenhum cliente encontrado com o ID informado.')
    }

    const client = await this.clientRepository.findByCNPJ(formattedCnpj)

    if (client && client.id !== id) {
      throw new AppError(
        `Já existe um cliente cadastrado com este cnpj informado. (${cnpj})`,
      )
    }

    const clientId = await this.clientRepository.update({
      id,
      businessName,
      cnpj: formattedCnpj,
    })

    const output = await this.clientRepository.findById(clientId)

    return output
  }
}
