import express, { Request, Response } from 'express'

import { Ticket } from '../models'

const router = express.Router()

router.get('', async (_req: Request, res: Response) => {
  const ticket = await Ticket.find({})

  res.send(ticket)
})

export { router as searchTicketRouter }
