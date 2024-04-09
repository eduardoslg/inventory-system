import { Router } from 'express'

import { ensureAuthenticated } from '@/modules/user/middlewares/ensureAuthenticated'

import { ItemController } from '../controllers/item-controller'

export const itemRoutes = Router()

itemRoutes.use(ensureAuthenticated)

itemRoutes.post('/', ItemController.create)
itemRoutes.get('/list/:id', ItemController.list)
itemRoutes.delete('/:id', ItemController.delete)

// productRoutes.get('/:id', UserController.get)
