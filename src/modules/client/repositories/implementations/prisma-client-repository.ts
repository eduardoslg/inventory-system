import { prisma } from '@/prisma'
import { Client } from '@prisma/client'

import {
  CreateClientInput,
  ListClientSchema,
  UpdateClientInput,
} from '../../validations/client-validation'
import { ClientRepository, ListClientDTO } from '../client-repository'

export class PrismaClientRepository implements ClientRepository {
  async create({ businessName, cnpj }: CreateClientInput): Promise<number> {
    const output = await prisma.client.create({
      data: {
        businessName,
        cnpj,
      },
      select: {
        id: true,
      },
    })

    return output.id
  }

  async update({ id, businessName, cnpj }: UpdateClientInput): Promise<number> {
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
      },
    })

    return output.id
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
      select id, 
             "businessName",
             cnpj
        from isys_client C 
       where C.id = ${id}
         and C.deleted_at is null`

    return output[0]
  }

  async findByCNPJ(cnpj: string): Promise<Client> {
    const output = await prisma.$queryRaw<Client[]>`
      select id, 
             "businessName",
             cnpj
        from isys_client C 
       where C.cnpj = ${cnpj}
         and C.deleted_at is null`

    return output[0]
  }

  async list({ page, limit }: ListClientSchema): Promise<ListClientDTO> {
    const offset = (page - 1) * limit

    const count = await prisma.client.count({
      where: {
        deleted_at: null,
      },
    })

    const output = await prisma.$queryRaw<Client[]>`
      select C.id,
             C."businessName" as "businessName",
             C.cnpj as cnpj
        from isys_client C
       where C.deleted_at is null
       limit ${limit}
      offset ${offset}`

    return {
      count,
      data: output,
    }
  }

  async listForDropdown(): Promise<Client[]> {
    const output = await prisma.$queryRaw<Client[]>`
      select id as value, 
             "businessName" as label
        from isys_client C
       where C.deleted_at is null
       order by "businessName" desc
      `

    return output
  }
}
