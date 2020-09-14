import request from 'supertest'
import { app } from '../../app'

it('returns 201 for signing up a user', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201)
})

it('returns 400 for signing up a user with wrong email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'testtest', password: 'password' })
    .expect(400)
})

it('returns 400 for signing up a user with invalid password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'p' })
    .expect(400)
})

it('returns 400 for signing up a user with missing email and password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com' })
    .expect(400)

  await request(app)
    .post('/api/users/signup')
    .send({ password: 'password' })
    .expect(400)

  await request(app).post('/api/users/signup').send({}).expect(400)
})

it('disallows duplicate emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201)

  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(400)
})

it('sets cookie with session for signup', async () => {
  const res = await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201)

  expect(res.get('Set-Cookie')).toBeDefined()
})
