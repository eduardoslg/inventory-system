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

    const findClient = await this.clientRepository.findById(id)

    if (!findClient) {
      throw new AppError('Nenhum cliente encontrado com o ID informado.')
    }

    const findClientCNPJ = await this.clientRepository.findByCNPJ(formattedCnpj)

    if (findClientCNPJ && findClientCNPJ.id !== id) {
      throw new AppError(
        `Já existe um cliente cadastrado com este cnpj informado. (${cnpj})`,
      )
    }

    const output = await this.clientRepository.update({
      id,
      businessName,
      cnpj: formattedCnpj || null,
    })

    return output
  }
}
