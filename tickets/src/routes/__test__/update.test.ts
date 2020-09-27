import request from 'supertest'
import mongoose from 'mongoose'

import { app } from '../../app'

it('returns 401 if user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString()

  await request(app).put(`/api/tickets/${id}`).expect(401)
})

it('returns 404 if ticket ID does not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString()

  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'New Title',
      price: 5,
    })
    .expect(404)
})

it('returns 401 if user does not own the ticket', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'Test title',
      price: 5,
    })
    .expect(201)

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'Test title',
      price: 5,
    })
    .expect(401)
})

it('returns 400 if user provided invalid title or price', async () => {
  const cookie = global.signin()

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'Test title',
      price: 5,
    })
    .expect(201)

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'Test title',
      price: -5,
    })
    .expect(400)

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: '',
      price: 5,
    })
    .expect(400)
})

it('updates the ticket if payload is valid', async () => {
  const cookie = global.signin()

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'Test title',
      price: 5,
    })
    .expect(201)

  const updatedTitle = 'New Title'
  const updatedPrice = 100

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: updatedTitle,
      price: updatedPrice,
    })
    .expect(200)

  const responseTicket = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .expect(200)

  expect(responseTicket.body.title).toBe(updatedTitle)
  expect(responseTicket.body.price).toBe(updatedPrice)
})
