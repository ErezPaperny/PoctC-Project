import express, { Request, Response } from 'express'

const app = express()
const PORT = 5000

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000') // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

app.get('/', (req: Request, res: Response) => {
  setTimeout(() => {
    res.send({ message: 'Hello, world! This is message from server.' })
  }, 1000) 
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
