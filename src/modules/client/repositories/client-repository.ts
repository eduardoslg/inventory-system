import { Client } from '@prisma/client'

export type ClientDTO = {
  businessName: string
  cnpj?: string | null
}

export type ClientWithId = ClientDTO & {
  id: number
}

export interface ClientRepository {
  findById(id: number): Promise<Client>
  findByCNPJ(cnpj: string): Promise<Client>
  create({ businessName, cnpj }: ClientDTO): Promise<ClientWithId>
  update({ id, businessName }: ClientWithId): Promise<ClientWithId>
  listForDropdown(): Promise<Client[]>
  delete(id: number): Promise<void>
}
