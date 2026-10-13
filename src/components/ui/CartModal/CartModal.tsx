import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import Close from '../../../assets/close.svg'
import useCartContext from '../../../hooks/useCartContext'
import { Table } from '../Table/Table'
import styles from './CartModal.module.css'

interface Props {
  handleShowCartModal: () => void
}

export const CartModal: FC<Props> = ({ handleShowCartModal }) => {
  const navigate = useNavigate()
  const { totalItems } = useCartContext()

  const handleNavigate = () => {
    navigate('/checkout')
    handleShowCartModal()
  }

  return (
    <div className={styles.modalContainer} role="dialog" aria-label="Shopping cart">
      <button
        className={styles.modalCloseButton}
        onClick={handleShowCartModal}
        aria-label="Close cart"
      >
        <img src={Close} alt="" />
      </button>
      <Table />
      <div className={styles.modalButtonContainer}>
        <button onClick={handleNavigate} disabled={totalItems === 0}>
          Checkout
        </button>
      </div>
    </div>
  )
}
