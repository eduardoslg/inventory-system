import { Router } from 'express'

import { categoryRoutes } from '@/modules/category/routes'
import { dataProcessingRoutes } from '@/modules/dataProcessing/routes'
import { itemRoutes } from '@/modules/item/routes'
import { orderRoutes } from '@/modules/order/routes'
import { productRoutes } from '@/modules/product/routes'
import { userRoutes } from '@/modules/user/routes'
import { sessionRoutes } from '@/modules/user/routes/session'

export const routes = Router()

routes.use('/user', userRoutes)
routes.use('/product', productRoutes)
routes.use('/category', categoryRoutes)
routes.use('/order', orderRoutes)
routes.use('/item', itemRoutes)
routes.use('/session', sessionRoutes)
routes.use('/dataProcessing', dataProcessingRoutes)
