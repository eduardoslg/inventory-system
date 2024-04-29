import { MovementType } from '@prisma/client'

export type MovementTypeDTO = {
  name: string
}

export type MovementTypeWithId = MovementTypeDTO & {
  id: number
}

export interface MovementTypeRepository {
  findById(id: number): Promise<MovementType>
  create({ name }: MovementTypeDTO): Promise<MovementTypeWithId>
  update({ id, name }: MovementTypeWithId): Promise<MovementTypeWithId>
  listForDropdown(): Promise<MovementType[]>
  delete(id: number): Promise<void>
}
