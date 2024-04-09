import request from 'supertest'
import { describe, expect, it } from 'vitest'

import { CreateUserDTOFactory } from '@/modules/user/use-cases/factories/tests/create-user-dto-factory'
import { app } from '@/server'

import { getToken } from '../../../../vitest.setup'

describe('should create a user', async function () {
  const server = request(app)

  it('create user', async function () {
    const token = await getToken()

    const user = CreateUserDTOFactory.execute()

    const response = await server
      .post(`/user`)
      .set('Authorization', token)
      .send(user)

    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        email: expect.any(String),
        created_at: expect.any(String),
        updated_at: expect.any(String),
      }),
    )
  })
})
