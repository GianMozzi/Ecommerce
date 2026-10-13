import type { NewProduct, Product, ProductsPage } from '../interface'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

export const PAGE_SIZE = 24

export const getProducts = async (page = 1): Promise<ProductsPage> => {
  const response = await fetch(
    `${API_URL}/products?_page=${page}&_limit=${PAGE_SIZE}`,
  )

  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }

  const products: Product[] = await response.json()

  // json-server informa el total de registros en este header.
  const total = Number(response.headers.get('X-Total-Count'))
  const totalPages = total
    ? Math.ceil(total / PAGE_SIZE)
    : products.length === PAGE_SIZE
      ? page + 1
      : page

  return { products, totalPages }
}

export const createProduct = async (product: NewProduct): Promise<Product> => {
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  })

  if (!response.ok) {
    throw new Error('Failed to create product')
  }

  return response.json()
}
