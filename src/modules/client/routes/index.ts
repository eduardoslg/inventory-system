import { Router } from 'express'

import { ensureAuthenticated } from '@/modules/user/middlewares/ensureAuthenticated'

import { ClientController } from '../controllers/client-controller'

export const clientRoutes = Router()

clientRoutes.use(ensureAuthenticated)

clientRoutes.post('/', ClientController.create)
clientRoutes.put('/:id', ClientController.update)
clientRoutes.get('/list', ClientController.list)
clientRoutes.get('/list/dropdown', ClientController.listForDropdown)
clientRoutes.delete('/:id', ClientController.delete)

// productRoutes.get('/:id', UserController.get)
