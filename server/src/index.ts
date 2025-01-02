import express, { Request, Response } from 'express'
import { requiredScopes, auth } from 'express-oauth2-jwt-bearer'
require('dotenv').config()
import { Categories, Users } from './dbConnection'

const app = express()
const PORT = process.env.PORT

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', process.env.CROSS_ORIGIN)
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Scope'
  )

  next()
})

app.get('/', (req: Request, res: Response) => {
  setTimeout(() => {
    res.send({ message: 'Hello, world! This is global message from server.' })
  }, 1000)
})

const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
})

app.get('/private', checkJwt, (req: Request, res: Response) => {
  res.send({ message: 'Hello, world! This is private message from server.' })
})

const checkScopes = requiredScopes('read:messages')

app.get(
  '/private-scope',
  checkJwt,
  checkScopes,
  (req: Request, res: Response) => {
    const scope = req.headers.scope || 'no scope'
    if (scope === 'read:messages') {
      res.send({
        message:
          'Hello, world! This is private with scope of read message from server.',
      })
    } else {
      res.send({
        message: 'Missing read:messages scope',
      })
    }
  }
)

app.get('/categories', async (req, res) => {
  try {
    const { filter = '', page = '1', limit = '10' } = req.query

    const pageNumber = parseInt(`${page}`, 10)
    const limitNumber = parseInt(`${limit}`, 10)

    const query = { name: { $regex: filter, $options: 'i' } }
    const categories = await Categories.find(query)
      .sort({ name: 1 })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
    const total = await Categories.countDocuments({})

    res.json({
      total,
      page: pageNumber,
      limit: limitNumber,
      data: categories,
    })
  } catch (err) {
    console.error('Error fetching categories:', err)
    res.status(500).json({ error: (err as any).message })
  }
})

app.get('/users', async (req, res) => {
  try {
    const {
      name = '',
      type = '',
      active = false,
      page = '1',
      limit = '10',
    } = req.query

    const pageNumber = parseInt(`${page}`, 10)
    const limitNumber = parseInt(`${limit}`, 10)

    const query = {
      name: { $regex: name, $options: 'i' },
      type: { $regex: type, $options: 'i' },
    } as any

    if (active === 'true') {
      query.active = true
    }

    const users = await Users.find(query)
      .sort({ name: 1 })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
    const total = await Users.countDocuments({})

    res.json({
      total,
      page: pageNumber,
      limit: limitNumber,
      data: users,
    })
  } catch (err) {
    console.error('Error fetching users:', err)
    res.status(500).json({ error: (err as any).message })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
