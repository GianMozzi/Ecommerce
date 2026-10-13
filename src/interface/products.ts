export interface Release {
  au?: string | null
  eu?: string | null
  jp?: string | null
  na?: string | null
}

export interface Product {
  id: number
  amiiboSeries: string
  character: string
  gameSeries: string
  head: string
  image: string
  name: string
  release?: Release
  tail: string
  type: string
  price: number
}

/** Producto sin `id`: lo asigna json-server al crearlo. */
export type NewProduct = Omit<Product, 'id'>

export interface ProductsPage {
  products: Product[]
  totalPages: number
}

export interface CartProduct {
  id: number
  name: string
  image: string
  quantity: number
  price: number
}
