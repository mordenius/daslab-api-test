import { Express } from 'express-serve-static-core'
import { createdServer } from '../../bootstrap/server'

let server: Express

beforeAll(async () => {
  server = await createdServer()
}, 20000)

import * as userService from '../user'

describe('userService', () => {
  it('getById', async () => {
    const response = await userService.getById(9999)
    expect(response).toEqual(null)
  })

  it('list', async () => {
    const response = await userService.list({})
    expect(typeof response).toEqual('object')
  })
})
