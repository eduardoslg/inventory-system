import 'express-async-errors'

import cors from 'cors'
import express from 'express'
import path from 'path'

import { getEnvConfig } from './config/env'
import errorHandler from './middlewares/error-handler'
import { routes } from './routes'

const PORT = getEnvConfig('PORT')

const app = express()

app.use(
  cors({
    exposedHeaders: 'x-suggested-filename',
  }),
)

app.use(express.json())
app.use('/medias', express.static(path.resolve('../inventory-system/dist/tmp')))
app.use(routes)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`)
})

export { app }
