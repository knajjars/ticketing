import express, { Request, Response, NextFunction } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'

import { User } from '../models'
import { BadRequestError } from '../errors'
import { JWT_KEY } from '../services'
import { validateRequest } from '../middlewares'

const router = express.Router()

router.post(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body
    const existingUser = await User.findOne({ email })

    if (existingUser !== null) {
      throw new BadRequestError('Email in use')
    }

    const user = User.build({ email, password })
    await user.save()

    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      JWT_KEY
    )

    req.session = { jwt: userJwt }

    return res.status(201).send(user)
  }
)

export { router as signupRouter }
