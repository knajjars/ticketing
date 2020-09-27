import { Router } from 'express'

import { createTicketRouter } from './create'

function createRouter(): Router {
  const router = Router()

  router.use(createTicketRouter)

  return router
}

export { createRouter as createTicketsRouter }
