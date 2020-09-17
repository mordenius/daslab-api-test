import * as request from 'supertest'
import { Express } from 'express-serve-static-core'

import { createdServer } from '../../bootstrap/server'

let server: Express

beforeAll(async () => {
    server = await createdServer()
}, 20000)

it('should return 401 & valid error response if authorization header field is missed', async done => {
    request(server)
        .get(`/users`)
        .set('idtoken', 'fakeToken')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(function (err, res) {
            if (err) return done(err)
            expect(res.body.message).toMatch('Invalid auth token')
            done()
        })
})

it('should return 401 & valid error response if authorization header field is missed', async done => {
    request(server)
        .get(`/users/12`)
        .set('idtoken', 'fakeToken')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(function (err, res) {
            if (err) return done(err)
            expect(res.body.message).toMatch('Invalid auth token')
            done()
        })
})

