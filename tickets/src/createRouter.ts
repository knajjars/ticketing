import { currentUser, errorHandler, NotFoundError } from '@knticketing/common'
import { Router } from 'express'

import { createTicketsRouter } from './routes'

export function createRouter(): Router {
  const router = Router()

  router.use(currentUser)
  router.use('/api/tickets', createTicketsRouter())
  router.all('*', async () => {
    throw new NotFoundError()
  })

  router.use(errorHandler)

  return router
}
