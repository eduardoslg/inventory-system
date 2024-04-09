export interface ProductDTO {
  name: string
  price: string
  description: string
  banner: string
  categoryId: number
}

export interface UpdateProductDTO {
  id: number
  name: string
  price: string
  description: string
  banner: string
}

export interface ProductsRepository {
  findById(id: number): Promise<ProductDTO>
  create(input: ProductDTO): Promise<number>
  update(input: UpdateProductDTO): Promise<number>
  delete(id: number): Promise<void>
}
