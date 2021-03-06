import { requireAuth, validateRequest } from '@knticketing/common'
import { body } from 'express-validator'
import express, { Request, Response } from 'express'

import { Ticket } from '../models'

const router = express.Router()

router.post(
  '/',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('A title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body

    const { id: userId } = req.currentUser!

    const ticket = Ticket.build({ title, price, userId })

    await ticket.save()

    res.status(201).send(ticket)
  }
)

export { router as createTicketRouter }
