import { Router } from 'express'

import { UserController } from '../controllers/user-controller'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

export const userRoutes = Router()

// userRoutes.use(ensureAuthorized)

userRoutes.post('/', UserController.create)

userRoutes.use(ensureAuthenticated)

// userRoutes.get('/list', UserController.list)
// userRoutes.get('/:id', UserController.get)
userRoutes.put('/:id', UserController.update)
// userRoutes.delete('/:id', UserController.delete)
