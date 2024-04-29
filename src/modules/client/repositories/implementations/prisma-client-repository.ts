import { prisma } from '@/prisma'
import { Client } from '@prisma/client'

import { ClientDTO, ClientRepository, ClientWithId } from '../client-repository'

export class PrismaClientRepository implements ClientRepository {
  async create({ businessName, cnpj }: ClientDTO): Promise<ClientWithId> {
    const output = await prisma.client.create({
      data: {
        businessName,
        cnpj,
      },
      select: {
        id: true,
        businessName: true,
        cnpj: true,
      },
    })

    return {
      id: output.id,
      businessName: output.businessName,
      cnpj: output.cnpj,
    }
  }

  async update({
    id,
    businessName,
    cnpj,
  }: ClientWithId): Promise<ClientWithId> {
    const output = await prisma.client.update({
      where: {
        id,
      },
      data: {
        businessName,
        cnpj,
      },
      select: {
        id: true,
        businessName: true,
        cnpj: true,
      },
    })

    return output
  }

  async delete(id: number): Promise<void> {
    await prisma.client.update({
      where: {
        id,
      },
      data: {
        deleted_at: new Date(),
      },
    })
  }

  async findById(id: number): Promise<Client> {
    const output = await prisma.$queryRaw<Client[]>`
      SELECT id, 
             "businessName",
             cnpj
        FROM client C 
       WHERE C.id = ${id}`

    return output[0]
  }

  async findByCNPJ(cnpj: string): Promise<Client> {
    const output = await prisma.$queryRaw<Client[]>`
      SELECT id, 
             "businessName",
             cnpj
        FROM client C 
       WHERE C.cnpj = ${cnpj}`

    return output[0]
  }

  async listForDropdown(): Promise<Client[]> {
    const output = await prisma.$queryRaw<Client[]>`
      SELECT id as value, 
             "businessName" as label
        FROM client C
       ORDER BY "businessName" DESC
      `

    return output
  }
}
