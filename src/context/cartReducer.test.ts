import { describe, expect, it } from 'vitest'
import { cartReducer, initialState } from './cartReducer'

const item = { id: 1, name: 'Mario', image: 'x.png', price: 10, quantity: 1 }

describe('cartReducer', () => {
  it('agrega y acumula cantidad', () => {
    const s1 = cartReducer(initialState, { type: 'ADD_TO_CART', payload: item })
    const s2 = cartReducer(s1, { type: 'ADD_TO_CART', payload: item })
    expect(s2.cartItems).toHaveLength(1)
    expect(s2.cartItems[0].quantity).toBe(2)
  })

  it('resta cantidad y elimina al llegar a 0', () => {
    const s1 = cartReducer(initialState, { type: 'ADD_TO_CART', payload: { ...item, quantity: 2 } })
    const s2 = cartReducer(s1, { type: 'REMOVE_FROM_CART', payload: { id: 1 } })
    expect(s2.cartItems[0].quantity).toBe(1)
    const s3 = cartReducer(s2, { type: 'REMOVE_FROM_CART', payload: { id: 1 } })
    expect(s3.cartItems).toHaveLength(0)
  })

  it('vacía el carrito', () => {
    const s1 = cartReducer(initialState, { type: 'ADD_TO_CART', payload: item })
    expect(cartReducer(s1, { type: 'CLEAR_CART' }).cartItems).toEqual([])
  })
})
