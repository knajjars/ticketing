import { MONGO_URI } from '@knticketing/common'
import mongoose from 'mongoose'

import { app } from './app'

const start = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    console.info('Connected to MongoDB')
  } catch (err) {
    console.error(err)
  }
  app.listen(3000, () => {
    console.log('Server listening on port 3000')
  })
}

start()
