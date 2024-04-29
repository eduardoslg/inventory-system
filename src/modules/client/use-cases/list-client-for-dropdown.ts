import { Client } from '@prisma/client'

import { ClientRepository } from '../repositories/client-repository'

export class ListClientForDropdown {
  /**
   *
   */
  constructor(private readonly clientRepository: ClientRepository) {}

  public async execute(): Promise<Client[]> {
    const output = await this.clientRepository.listForDropdown()

    return output
  }
}
