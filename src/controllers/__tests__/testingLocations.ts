import * as request from 'supertest'
import { Express } from 'express-serve-static-core'

import { createdServer } from '../../bootstrap/server'

let server: Express

beforeAll(async () => {
  server = await createdServer()
}, 20000)

// jest.mock('/api/services/user')

describe('regular user', () => {
  it('get self list of testing location', async done => {
    request(server)
      .get(`/users/me/testingLocations`)
      .set('idtoken', 'testuser')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err)
        expect(Array.isArray(res.body)).toBeTruthy();
        done()
      })
  })

  it('same as me but use id fo admin user', async done => {
    request(server)
      .get(`/users/1/testingLocations`)
      .set('idtoken', 'testuser')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err)
        expect(Array.isArray(res.body)).toBeTruthy();
        done()
      })
  })

  it('should return 401 if trying get list of not your of testing locations', async done => {
    request(server)
      .get(`/users/2/testingLocations`)
      .set('idtoken', 'testuser')
      .expect(401)
      .end(function (err, res) {
        if (err) return done(err)
        expect(res.body.message).toMatch("Invalid permission");
        done()
      })
  })

  it('should return 200 when user create own testing location with', async done => {
    request(server)
      .post(`/users/me/testingLocations`)
      .set('idtoken', 'testuser')
      .set('body', '{"latitude": 20, "longitude": 49}')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err)
        expect(res.body).toBeTruthy();
        expect(res.body.userId).toBe(1);
        done()
      })
  })

  it('should return 200 when user update own testing location or 403 if location not found with sended id', async done => {
    request(server)
      .put(`/users/me/testingLocations/9999`)
      .set('idtoken', 'testuser')
      .set('body', '{"latitude": 20, "longitude": 49}')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err)
        expect(res.body).toBeTruthy();
        done()
      })
  })

  it('should return 401 while testuser (id 1) trying update testing location another user (id 2)', async done => {
    request(server)
      .put(`/users/2/testingLocations/9999`)
      .set('idtoken', 'testuser')
      .set('body', '{"latitude": 20, "longitude": 49}')
      .expect(401)
      .end(function (err, res) {
        if (err) return done(err)
        expect(res.body).toBeTruthy();
        done()
      })
  })

  it('should return 200 when user delete own testing location or 403 if location not found with sended id', async done => {
    request(server)
      .delete(`/users/me/testingLocations/9999`)
      .set('idtoken', 'testuser')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err)
        expect(res.body).toBeTruthy();
        done()
      })
  })

  it('should return 401 while testuser (id 1) trying delete testing location another user (id 2)', async done => {
    request(server)
      .delete(`/users/2/testingLocations/9999`)
      .set('idtoken', 'testuser')
      .expect(401)
      .end(function (err, res) {
        if (err) return done(err)
        expect(res.body).toBeTruthy();
        done()
      })
  })
})


describe('admin', () => {
  it('by admin rights get list of testing location for regular user', async done => {
    request(server)
      .get(`/users/1/testingLocations`)
      .set('idtoken', 'testadmin')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err)
        expect(Array.isArray(res.body)).toBeTruthy();
        done()
      })
  })

  it('get self list of testing locations', async done => {
    request(server)
      .get(`/users/me/testingLocations`)
      .set('idtoken', 'testadmin')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err)
        expect(Array.isArray(res.body)).toBeTruthy();
        done()
      })
  })

  it('same as me but use id fo admin user', async done => {
    request(server)
      .get(`/users/2/testingLocations`)
      .set('idtoken', 'testadmin')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err)
        expect(Array.isArray(res.body)).toBeTruthy();
        done()
      })
  })

  it('by admin rights get list of all testing locations', async done => {
    request(server)
      .get(`/testingLocations`)
      .set('idtoken', 'testadmin')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err)
        expect(Array.isArray(res.body)).toBeTruthy();
        done()
      })
  })

  it('by admin rights get specified testing location of any user', async done => {
    request(server)
      .get(`/testingLocations/9999`)
      .set('idtoken', 'testadmin')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err)
        expect(Array.isArray(res.body)).toBeTruthy();
        done()
      })
  })
})
