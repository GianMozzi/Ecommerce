import { useContext } from 'react'
import { CartContext } from '../context/CartContext'

const useCartContext = () => {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider')
  }

  const { cartItems } = context.state

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  )

  return { ...context, totalItems, totalPrice }
}

export default useCartContext
