import request from 'supertest'

import { Ticket } from '../../models'
import { app } from '../../app'

const createTicket = () => {
  return Ticket.build({
    userId: 'ABC123',
    title: 'Test Title',
    price: 5,
  }).save()
}

it('can fetch a list of tickets', async () => {
  await createTicket()
  await createTicket()
  await createTicket()

  const response = await request(app)
    .get(`/api/tickets/`)
    .set('Cookie', global.signin())
    .expect(200)

  expect(response.body.length).toEqual(3)
})
