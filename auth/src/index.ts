import mongoose from 'mongoose'

import { app } from './app'

const start = async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
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
