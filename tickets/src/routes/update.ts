import {
  NotFoundError,
  requireAuth,
  validateRequest,
  NotAuthorizedError,
} from '@knticketing/common'
import { body } from 'express-validator'
import express, { Request, Response } from 'express'

import { Ticket } from '../models'

const router = express.Router()

router.put(
  '/:id',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('A title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const id = req.params.id
    const { id: userId } = req.currentUser!

    const ticket = await Ticket.findById(id)

    if (!ticket) {
      throw new NotFoundError()
    }

    if (ticket.userId !== userId) {
      throw new NotAuthorizedError()
    }

    const { title, price } = req.body

    ticket.set({ title, price })
    await ticket.save()

    res.send(ticket)
  }
)

export { router as updateTicketRouter }
