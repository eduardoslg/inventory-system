import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '@/config/multer'
import { ensureAuthenticated } from '@/modules/user/middlewares/ensureAuthenticated'

import { ProductController } from '../controllers/product-controller'

export const productRoutes = Router()

productRoutes.use(ensureAuthenticated)
const upload = multer(uploadConfig.upload('tmp'))

productRoutes.post('/', upload.single('file'), ProductController.create)
productRoutes.put('/:id', upload.single('file'), ProductController.update)
productRoutes.delete('/:id', ProductController.delete)

// productRoutes.get('/list', UserController.list)
// productRoutes.get('/:id', UserController.get)
