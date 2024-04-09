import { Router } from 'express'

import { SessionController } from '../controllers/session-controller'

export const sessionRoutes = Router()

sessionRoutes.post('/', SessionController.authenticate)
