import express, { Request, Response } from 'express'
import { requiredScopes, auth } from 'express-oauth2-jwt-bearer'

const app = express()
const PORT = 5000

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
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
  audience: 'http://localhost:5000',
  issuerBaseURL: `https://dev-twmpec4n6uralfn2.us.auth0.com/`,
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

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
