import {
  NotFoundError,
  requireAuth,
  validateRequest,
} from '@knticketing/common'
import { param } from 'express-validator'
import express, { Request, Response } from 'express'

import { Ticket } from '../models'

const router = express.Router()

router.get(
  `/:id`,
  requireAuth,
  [param('id').not().isEmpty().withMessage('A ticket ID required')],
  validateRequest,
  async (req: Request, res: Response) => {
    const id = req.params.id

    const ticket = await Ticket.findById(id)

    if (!ticket) {
      throw new NotFoundError()
    }

    res.send(ticket)
  }
)

export { router as findTicketRouter }
