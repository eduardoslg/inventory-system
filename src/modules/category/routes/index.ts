import { Router } from 'express'

import { ensureAuthenticated } from '@/modules/user/middlewares/ensureAuthenticated'

import { CategoryController } from '../controllers/category-controller'

export const categoryRoutes = Router()

categoryRoutes.use(ensureAuthenticated)

categoryRoutes.post('/', CategoryController.create)
categoryRoutes.get('/list', CategoryController.list)
categoryRoutes.put('/:id', CategoryController.update)
categoryRoutes.delete('/:id', CategoryController.delete)
categoryRoutes.get('/list/dropdown', CategoryController.listForSelect)

// productRoutes.get('/:id', UserController.get)
