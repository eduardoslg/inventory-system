import { CreateUserDTO } from '../DTOs/create-user-dto'

export interface User {
  id: number
  name: string
  email: string
  password: string
  created_at: Date | null
  updated_at: Date | null
  deleted_at: Date | null
}

export interface UpdateUserDTO {
  id: number
  name?: string | undefined
  email?: string | undefined
}

export interface UsersRepository {
  findByEmail(email: string): Promise<User>
  findById(id: number): Promise<User>
  create(input: CreateUserDTO): Promise<number>
  update(input: UpdateUserDTO): Promise<number>
}
