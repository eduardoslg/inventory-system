import { Item } from '@prisma/client'

import {
  CreateItemInput,
  ListItemSchema,
  UpdateItemInput,
} from '../validations/item-validation'

export type ItemDTO = {
  orderId: number
  productId: number
  amount: number
}

export type ListItemDTO = {
  count: number
  data: Item[]
}

export type ListItemForDropdownDTO = {
  value: number
  label: string
  suggestedValue: number
}

export interface ItemRepository {
  findById(id: number): Promise<Item>
  create(input: CreateItemInput): Promise<number>
  update(input: UpdateItemInput): Promise<number>
  list({ page, limit }: ListItemSchema): Promise<ListItemDTO>
  listForDropdown(): Promise<ListItemForDropdownDTO[]>
  delete(id: number): Promise<void>
}
