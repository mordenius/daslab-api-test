import { Express } from 'express-serve-static-core'
import { createdServer } from '../../bootstrap/server'

let server: Express

beforeAll(async () => {
  server = await createdServer()
}, 20000)

import * as authService from '../auth'

describe('authService', () => {
  it('adminOrMe: me', async () => {
    await expect(authService.adminOrMe(99, {
      id: 99
    })).resolves.toEqual(undefined)
  })

  it('adminOrMe: not me fail', async () => {
    await expect(authService.adminOrMe(NaN, {
      id: 99
    })).rejects.toEqual('Invalid user id')
  })

  it('adminOrMe: not me fail', async () => {
    await expect(authService.adminOrMe(98, {
      id: 99
    })).rejects.toEqual('No roles')
  })

  it('adminOrMe: roles admin', async () => {
    await expect(authService.adminOrMe(98, {
      id: 99,
      roles: [{
        type: 'admin'
      }]
    })).resolves.toEqual(undefined)
  })

  it('adminOrMe: no roles', async () => {
    await expect(authService.adminOrMe(98, {
      id: 99,
      roles: []
    })).rejects.toEqual('No roles')
  })

  it('adminOrMe: roles not admin', async () => {
    await expect(authService.adminOrMe(98, {
      id: 99,
      roles: [{
        type: 'other'
      }]
    })).rejects.toEqual('No admin roles')
  })

})
