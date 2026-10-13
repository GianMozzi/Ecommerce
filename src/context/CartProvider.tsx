import { useEffect, useReducer, type FC, type ReactNode } from 'react'
import type { CartProduct } from '../interface'
import { cartReducer, initialState, type CartState } from './cartReducer'
import { CartContext } from './CartContext'

const STORAGE_KEY = 'ecommerce:cart'

interface CartProviderProps {
  children: ReactNode
}

const isCartProduct = (value: unknown): value is CartProduct => {
  if (typeof value !== 'object' || value === null) return false
  const item = value as Record<string, unknown>
  return (
    typeof item.id === 'number' &&
    typeof item.name === 'string' &&
    typeof item.image === 'string' &&
    typeof item.price === 'number' &&
    typeof item.quantity === 'number' &&
    item.quantity > 0
  )
}

/** Recupera el carrito guardado, ignorando datos corruptos. */
const loadInitialState = (): CartState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return initialState

    const parsed: unknown = JSON.parse(raw)
    const items = (parsed as { cartItems?: unknown })?.cartItems
    return Array.isArray(items)
      ? { cartItems: items.filter(isCartProduct) }
      : initialState
  } catch {
    return initialState
  }
}

export const CartProvider: FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadInitialState)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // localStorage no disponible (modo privado, cuota llena): el carrito sigue en memoria.
    }
  }, [state])

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}
