import express from 'express'

import { currentUser, requireAuth } from '../middlewares'

const router = express.Router()

router.get('/currentuser', currentUser, requireAuth, (req, res) => {
  res.send({ currentUser: req.currentUser || null })
})

export { router as currentUserRouter }
