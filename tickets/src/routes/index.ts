import { Router } from 'express'

import { createTicketRouter } from './create'
import { findTicketRouter } from './find'
import { searchTicketRouter } from './search'
import { updateTicketRouter } from './update'

function createRouter(): Router {
  const router = Router()

  router.use(searchTicketRouter)
  router.use(findTicketRouter)
  router.use(createTicketRouter)
  router.use(updateTicketRouter)

  return router
}

export { createRouter as createTicketsRouter }
