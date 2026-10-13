import type { FC } from 'react'
import { toast } from 'sonner'
import useCartContext from '../../../hooks/useCartContext'
import type { Product } from '../../../interface'
import { formatPrice } from '../../../utils/format'
import styles from './CardProduct.module.css'

interface Props {
  product: Product
}

export const CardProduct: FC<Props> = ({ product }) => {
  const { dispatch } = useCartContext()

  const addToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: 1,
      },
    })
    toast.success(`${product.name} added to cart`)
  }

  return (
    <div className={styles.cardContainer}>
      <img
        className={styles.cardImage}
        src={product.image}
        alt={product.name}
        loading="lazy"
      />
      <div className={styles.cardDetail}>
        <h3 className={styles.cardTitle}>{product.name}</h3>
        <div className={styles.cardBody}>
          <p className={styles.cardType}>{product.type}</p>
          <p className={styles.cardPrice}>{formatPrice(product.price)}</p>
        </div>
        <button className={styles.cardButton} onClick={addToCart}>
          Add to cart
        </button>
      </div>
    </div>
  )
}
