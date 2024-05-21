import { Client } from '@prisma/client'

import {
  CreateClientInput,
  ListClientSchema,
  UpdateClientInput,
} from '../validations/client-validation'

export type ClientDTO = {
  businessName: string
  cnpj: string
}

export type ClientWithId = ClientDTO & {
  id: number
}

export type ListClientDTO = {
  count: number
  data: Client[]
}

export interface ClientRepository {
  findById(id: number): Promise<Client>
  findByCNPJ(cnpj: string): Promise<Client>
  create({ businessName, cnpj }: CreateClientInput): Promise<number>
  update({ id, businessName }: UpdateClientInput): Promise<number>
  list({ page, limit }: ListClientSchema): Promise<ListClientDTO>
  listForDropdown(): Promise<Client[]>
  delete(id: number): Promise<void>
}
