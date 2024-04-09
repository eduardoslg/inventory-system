import { Order } from '@prisma/client'

export type OrderDTO = {
  table: number
  name: string
}

export type UpdateOrderDTO = OrderDTO & {
  id: number
}

export type ListForSelectDTO = {
  value: number
  label: string
}

export type ListOrderDTO = {
  page: number
  limit: number
  search?: string
}

export interface OrdersRepository {
  findById(id: number): Promise<Order>
  create(input: OrderDTO): Promise<number>
  list(input: ListOrderDTO): Promise<Order[]>
  count(search?: string): Promise<number>
  update(input: UpdateOrderDTO): Promise<number>
  finish(id: number): Promise<void>
  delete(id: number): Promise<void>
}
