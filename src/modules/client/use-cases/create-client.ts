import AppError from '@/errors/AppError'
import { removeInvalidSearchCharacters } from '@/utils/remove-invalid-characters'

import { ClientRepository } from '../repositories/client-repository'
import { CreateClientInput } from '../validations/client-validation'

export class CreateClient {
  /**
   *
   */
  constructor(private readonly clientRepository: ClientRepository) {}

  public async execute({ businessName, cnpj }: CreateClientInput) {
    const formattedCnpj = removeInvalidSearchCharacters(cnpj ?? '')

    const clientExists = await this.clientRepository.findByCNPJ(formattedCnpj)

    if (clientExists) {
      throw new AppError(
        `Já existe um cliente cadastrado com este cnpj informado. (${cnpj})`,
      )
    }

    const clientId = await this.clientRepository.create({
      businessName,
      cnpj: formattedCnpj,
    })

    const output = await this.clientRepository.findById(clientId)

    return output
  }
}
