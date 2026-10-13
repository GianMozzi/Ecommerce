import useCartContext from '../../../hooks/useCartContext'
import type { CartProduct } from '../../../interface'
import { formatPrice } from '../../../utils/format'
import styles from './Table.module.css'

export const Table = () => {
  const {
    state: { cartItems },
    dispatch,
    totalPrice,
  } = useCartContext()

  const removeFromCart = (item: CartProduct) =>
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id: item.id } })

  const addToCart = (item: CartProduct) =>
    dispatch({ type: 'ADD_TO_CART', payload: { ...item, quantity: 1 } })

  if (cartItems.length === 0) {
    return <p className={styles.emptyMessage}>Your cart is empty.</p>
  }

  return (
    <>
      <table className={styles.modalTable}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Remove</th>
            <th>Quantity</th>
            <th>Add</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>
                <p>{item.name}</p>
              </td>
              <td>
                <button
                  className={styles.modalButtonRemove}
                  onClick={() => removeFromCart(item)}
                  aria-label={`Remove one ${item.name}`}
                >
                  -1
                </button>
              </td>
              <td>
                <p>{item.quantity}</p>
              </td>
              <td>
                <button
                  className={styles.modalButtonAdd}
                  onClick={() => addToCart(item)}
                  aria-label={`Add one ${item.name}`}
                >
                  +1
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.modalTotalContainer}>
        <h3>Total: {formatPrice(totalPrice)}</h3>
      </div>
    </>
  )
}
