import request from 'supertest'
import { app } from '../../app'

it('it returns details about current signed in user', async () => {
  const cookie = await global.signin()

  await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send({ email: 'test@test.com', password: 'password' })
    .expect(200)
})

it('it returns no details if not signed in', async () => {
  const res = await request(app)
    .get('/api/users/currentuser')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(200)

  expect(res.body.currentUser).toEqual(null)
})
