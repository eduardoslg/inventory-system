import supertest from 'supertest'

import { app } from '@/server'

export async function getToken(): Promise<string> {
  const server = supertest(app)

  // const createUserDTO: CreateSIAUserRequestData = {
  //   birthday: new Date(),
  //   branch: faker.number.int({ max: 9999 }),
  //   cpf: faker.location.zipCode('###.###.###-##'),
  //   departmentId: 1,
  //   email: faker.internet.email(),
  //   endLunch: 1300,
  //   endWork: 1700,
  //   fullName: faker.name.fullName(),
  //   isATM: 'S',
  //   mobilePhone: faker.phone.number('11#########'),
  //   password: faker.internet.password(),
  //   pis: faker.location.zipCode('###.###.###-##'),
  //   preferences: faker.word.noun(),
  //   registrationNumber: 2,
  //   remark: faker.word.noun(),
  //   signature: faker.word.noun(),
  //   startLunch: 1200,
  //   startWork: 1000,
  //   systemProfileIds: [1],
  //   username: faker.word.noun(),
  // }

  const outputLogin = await server.post('/session').send({
    username: 'eduardo@atmsistema.com.br',
    password: 'duh041097',
  })

  return outputLogin.body
}
