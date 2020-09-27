import request from 'supertest'

import { Ticket } from '../../models'
import { app } from '../../app'

it('has a route handler listening on /api/tickets for POST requests', async () => {
  const response = await request(app).post('/api/tickets').send({})

  expect(response.status).not.toEqual(404)
})
it('can only be accessed if the user is signed in', async () => {
  const response = await request(app).post('/api/tickets').send({})

  expect(response.status).toEqual(401)
})
it('returns a status different from 401 if user is signed in', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({})

  expect(response.status).not.toEqual(401)
})
it('returns an error if invalid title is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: '',
      price: 10,
    })
    .expect(400)

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      price: 10,
    })
    .expect(400)
})
it('returns an error if invalid price is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'Test Title',
      price: -10,
    })
    .expect(400)

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'Test Title',
    })
    .expect(400)
})
it('creates a ticket with valid payload', async () => {
  let tickets = await Ticket.find({})
  expect(tickets.length).toEqual(0)

  const title = 'Test Title'
  const price = 20

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title,
      price,
    })
    .expect(201)

  tickets = await Ticket.find({})

  expect(tickets.length).toEqual(1)
  expect(tickets[0].title).toEqual(title)
  expect(tickets[0].price).toEqual(price)
})
