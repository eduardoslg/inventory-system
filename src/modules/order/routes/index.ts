import { Router } from 'express'

import { ensureAuthenticated } from '@/modules/user/middlewares/ensureAuthenticated'

import { OrderController } from '../controllers/order-controller'

export const orderRoutes = Router()

orderRoutes.use(ensureAuthenticated)

orderRoutes.post('/', OrderController.create)
orderRoutes.get('/list', OrderController.list)
orderRoutes.put('/:id', OrderController.update)
orderRoutes.put('/finish/:id', OrderController.finish)
orderRoutes.delete('/:id', OrderController.delete)
// orderRoutes.get('/list/dropdown', OrderController.listForSelect)

// productRoutes.get('/:id', UserController.get)
