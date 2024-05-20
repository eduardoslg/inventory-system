import { Router } from 'express'

import { ensureAuthenticated } from '@/modules/user/middlewares/ensureAuthenticated'

import { ItemController } from '../controllers/item-controller'

export const itemRoutes = Router()

itemRoutes.use(ensureAuthenticated)

itemRoutes.post('/', ItemController.create)
itemRoutes.get('/list', ItemController.list)
itemRoutes.get('/list/dropdown', ItemController.listForDropdown)
itemRoutes.delete('/:id', ItemController.delete)

// productRoutes.get('/:id', UserController.get)
