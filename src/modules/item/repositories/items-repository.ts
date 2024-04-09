import { Item } from '@prisma/client'

export type ItemDTO = {
  orderId: number
  productId: number
  amount: number
}

export interface ItemsRepository {
  findById(id: number): Promise<Item>
  create(input: ItemDTO): Promise<number>
  list(orderId: number): Promise<Item[]>
  delete(id: number): Promise<void>
}
