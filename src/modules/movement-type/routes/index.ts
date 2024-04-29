import { Router } from 'express'

import { ensureAuthenticated } from '@/modules/user/middlewares/ensureAuthenticated'

import { MovementTypeController } from '../controllers/movement-type-controller'

export const movementTypeRoutes = Router()

movementTypeRoutes.use(ensureAuthenticated)

movementTypeRoutes.post('/', MovementTypeController.create)
movementTypeRoutes.put('/:id', MovementTypeController.update)
movementTypeRoutes.get('/list/dropdown', MovementTypeController.listForDropdown)
movementTypeRoutes.delete('/:id', MovementTypeController.delete)

// productRoutes.get('/:id', UserController.get)
