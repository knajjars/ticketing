import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'

import { createRouter } from './createRouter'
import { NODE_ENV } from './services'

const app = express()
app.set('trust proxy', true)
app.use(json())
app.use(
  cookieSession({
    secure: NODE_ENV !== 'test',
    signed: false
  })
)
app.use(createRouter())

export { app }
