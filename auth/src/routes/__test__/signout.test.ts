import request from 'supertest'
import { app } from '../../app'

it('clears cookie when signing out', async () => {
  const cookie = await global.signin()

  const res = await request(app)
    .post('/api/users/signout')
    .set('Cookie', cookie)
    .send()
    .expect(200)

  expect(res.get('Set-Cookie')[0]).toEqual(
    'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
  )
})
