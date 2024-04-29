import AppError from '@/errors/AppError'
import { removeInvalidSearchCharacters } from '@/utils/remove-invalid-characters'

import { ClientDTO, ClientRepository } from '../repositories/client-repository'

export class CreateClient {
  /**
   *
   */
  constructor(private readonly clientRepository: ClientRepository) {}

  public async execute({ businessName, cnpj }: ClientDTO) {
    const formattedCnpj = removeInvalidSearchCharacters(cnpj ?? '')

    const findClient = await this.clientRepository.findByCNPJ(formattedCnpj)

    if (findClient) {
      throw new AppError(
        `Já existe um cliente cadastrado com este cnpj informado. (${cnpj})`,
      )
    }

    const output = await this.clientRepository.create({
      businessName,
      cnpj: formattedCnpj || null,
    })

    return output
  }
}
