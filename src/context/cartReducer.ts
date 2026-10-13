import type { CartProduct } from '../interface'

export interface CartState {
  cartItems: CartProduct[]
}

export const initialState: CartState = {
  cartItems: [],
}

export type CartAction =
  | { type: 'ADD_TO_CART'; payload: CartProduct }
  | { type: 'REMOVE_FROM_CART'; payload: { id: number } }
  | { type: 'CLEAR_CART' }

export const cartReducer = (
  state: CartState,
  action: CartAction,
): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { id, quantity } = action.payload
      const exists = state.cartItems.some((item) => item.id === id)

      return {
        ...state,
        cartItems: exists
          ? state.cartItems.map((item) =>
              item.id === id
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            )
          : [...state.cartItems, action.payload],
      }
    }

    case 'REMOVE_FROM_CART': {
      const { id } = action.payload

      return {
        ...state,
        cartItems: state.cartItems.flatMap((item) => {
          if (item.id !== id) return [item]
          return item.quantity > 1 ? [{ ...item, quantity: item.quantity - 1 }] : []
        }),
      }
    }

    case 'CLEAR_CART':
      return { ...state, cartItems: [] }

    default:
      return state
  }
}
