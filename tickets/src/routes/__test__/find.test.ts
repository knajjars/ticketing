import request from 'supertest'
import mongoose from 'mongoose'

import { Ticket } from '../../models'
import { app } from '../../app'

it('returns 404 if a ticket is not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString()

  await request(app)
    .get(`/api/tickets/${id}`)
    .set('Cookie', global.signin())
    .expect(404)
})

it('returns the ticket if found', async () => {
  const userId = 'ABC123'
  const title = 'Test Title'
  const price = 10

  const ticket = Ticket.build({ title, price, userId })
  await ticket.save()

  const response = await request(app)
    .get(`/api/tickets/${ticket.id}`)
    .set('Cookie', global.signin())
    .expect(200)

  expect(response.body.title).toEqual(title)
  expect(response.body.price).toEqual(price)
  expect(response.body.userId).toEqual(userId)
})
