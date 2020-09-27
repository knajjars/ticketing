import { requireAuth, validateRequest } from '@knticketing/common'
import { body } from 'express-validator'
import express, { Request, Response } from 'express'

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
  (req: Request, res: Response) => {
    res.send({})
  }
)

export { router as createTicketRouter }
