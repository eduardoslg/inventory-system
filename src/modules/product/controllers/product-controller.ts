import { Request, Response } from 'express'
import { z } from 'zod'

import { getOneRequestSchema } from '@/shared/controllers/get-one-request-schema'

import { makeCreateProduct } from '../use-cases/factories/make-create-product'
import { makeDeleteProduct } from '../use-cases/factories/make-delete-product'
import { makeUpdateProduct } from '../use-cases/factories/make-update-product'

export class ProductController {
  static async create(request: Request, response: Response) {
    const createProductFileSchema = z.object({
      filename: z.string({
        required_error: 'É necessário informar a imagem.',
      }),
    })

    const createProductBodySchema = z.object({
      name: z.string({
        required_error: 'É necessário informar o campo nome.',
      }),
      price: z.string({
        required_error: 'É necessário informar o campo email.',
      }),
      description: z.string({
        required_error: 'É necessário informar o campo senha.',
      }),
      categoryId: z.coerce.number({
        required_error: 'É necessário informar o campo senha.',
      }),
    })

    const { name, price, description, categoryId } =
      createProductBodySchema.parse(request.body)
    const { filename: banner } = createProductFileSchema.parse(request.file)

    const createProduct = makeCreateProduct()

    const output = await createProduct.execute({
      name,
      price,
      description,
      banner,
      categoryId,
    })

    return response.json(output)
  }

  static async update(request: Request, response: Response) {
    const updateProductFileSchema = z.object({
      filename: z.string(),
    })

    const updateProductBodySchema = z.object({
      name: z.string({
        required_error: 'É necessário informar o campo nome.',
      }),
      price: z.string({
        required_error: 'É necessário informar o campo email.',
      }),
      description: z.string({
        required_error: 'É necessário informar o campo senha.',
      }),
    })

    const { id } = getOneRequestSchema.parse(request.params)
    const { name, price, description } = updateProductBodySchema.parse(
      request.body,
    )
    const { filename: banner } = updateProductFileSchema.parse(request.file)

    const updateProduct = makeUpdateProduct()

    const output = await updateProduct.execute({
      id,
      name,
      price,
      description,
      banner,
    })

    return response.json(output)
  }

  static async delete(request: Request, response: Response) {
    const { id } = getOneRequestSchema.parse(request.params)

    const deleteProduct = makeDeleteProduct()

    const output = await deleteProduct.execute(id)

    return response.json(output)
  }
}
