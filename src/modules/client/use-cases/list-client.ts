import {
  ClientRepository,
  ListClientDTO,
} from '../repositories/client-repository'
import { ListClientSchema } from '../validations/client-validation'

export class ListClient {
  /**
   *
   */
  constructor(private readonly clientRepository: ClientRepository) {}

  public async execute({
    page,
    limit,
  }: ListClientSchema): Promise<ListClientDTO> {
    const output = await this.clientRepository.list({ page, limit })

    return output
  }
}
