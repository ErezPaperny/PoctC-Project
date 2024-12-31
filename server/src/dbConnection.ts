import mongoose from 'mongoose'
export const Categories = require('./models/Categories')
export const Users = require('./models/Users')
require('dotenv').config()

const MONGO_URI = `mongodb://${process.env.MONGO_SERVER}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err: any) => console.error('MongoDB connection error BLA BLA:', err))
