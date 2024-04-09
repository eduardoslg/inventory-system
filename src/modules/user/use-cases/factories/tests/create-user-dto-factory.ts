import { CreateUserDTO } from '@/modules/user/DTOs/create-user-dto'
import { faker } from '@faker-js/faker'

export class CreateUserDTOFactory {
  static execute(): CreateUserDTO {
    const createUserDTO = new CreateUserDTO()

    createUserDTO.name = faker.person.firstName()
    createUserDTO.email = faker.internet.email()
    createUserDTO.password = faker.internet.password()

    return createUserDTO
  }
}
