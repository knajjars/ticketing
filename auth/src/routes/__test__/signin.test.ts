import request from 'supertest'
import { app } from '../../app'

it('fails when an email that does not exist is supplied', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(400)
})

it('returns 200 for signing in an existing user', async () => {
  const email: string = 'test@test.com'
  const password: string = 'password'

  await request(app)
    .post('/api/users/signup')
    .send({ email, password })
    .expect(201)

  const res = await request(app)
    .post('/api/users/signin')
    .send({ email, password })
    .expect(200)

  expect(res.get('Set-Cookie')).toBeDefined()
})

it('returns 400 for signing in an existing user with wrong password', async () => {
  const email: string = 'test@test.com'
  const password: string = 'password'

  await request(app)
    .post('/api/users/signup')
    .send({ email, password })
    .expect(201)

  await request(app)
    .post('/api/users/signin')
    .send({ email, password: 'some other password' })
    .expect(400)
})
