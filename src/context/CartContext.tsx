import { createContext, type Dispatch } from 'react'
import type { CartAction, CartState } from './cartReducer'

export interface CartContextType {
  state: CartState
  dispatch: Dispatch<CartAction>
}

export const CartContext = createContext<CartContextType | null>(null)
