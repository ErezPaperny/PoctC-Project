import mongoose from 'mongoose'
require('dotenv').config()

const MONGO_URI = `mongodb://${process.env.MONGO_SERVER}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`

if (mongoose.connection.readyState === 0) {
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err: any) => console.error('MongoDB connection error:', err))
}

import { Categories } from './models/Categories'
import { Users } from './models/Users'

export { Categories, Users }
