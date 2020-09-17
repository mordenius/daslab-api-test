import * as request from 'supertest'
import { Express } from 'express-serve-static-core'

import { createdServer } from '../../bootstrap/server'

let server: Express

beforeAll(async () => {
  server = await createdServer()
}, 20000)

// jest.mock('/api/services/user')

describe('auth failure', () => {
  it('should return 500 & valid response if auth rejects with an error', async done => {
    //  (UserService.auth as jest.Mock).mockRejectedValue(new Error())
    request(server)
      .get(`/users`)
      .set('idtoken', 'fakeToken')
      .expect(401)
      .end(function (err, res) {
        if (err) return done(err)
        expect(res.body.message).toMatch('Invalid auth token')
        done()
      })
  })
})
