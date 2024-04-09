import { UserDTO } from '@/modules/user/DTOs/user-dto'

declare global {
  export namespace Express {
    export interface Request {
      user: UserDTO
    }
  }
}
