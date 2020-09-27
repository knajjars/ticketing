import request from 'supertest'
import jwt from 'jsonwebtoken'

import { app } from '../app'

declare global {
  namespace NodeJS {
    interface Global {
      signin(): string[]
    }
  }
}

global.signin = () => {
  // Build JWT payload (id, email)
  const payload = {
    id: 'ABC123',
    email: 'test@test.com',
  }

  // CREATE token
  const token = jwt.sign(payload, process.env.JWT_KEY!)

  // Build session object { jwt: payload }
  const session = { jwt: token }

  // Parse to JSON
  const sessionJSON = JSON.stringify(session)

  // Encode base64
  const base64 = Buffer.from(sessionJSON).toString('base64')

  // Return
  return [`express:sess=${base64}`]
}
