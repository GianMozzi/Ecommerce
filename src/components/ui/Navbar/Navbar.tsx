import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Cart from '../../../assets/cart.svg'
import Logo from '../../../assets/logo.svg'
import useCartContext from '../../../hooks/useCartContext'
import { CartModal } from '../CartModal'
import styles from './Navbar.module.css'

export const Navbar = () => {
  const [showCartModal, setShowCartModal] = useState(false)
  const { totalItems } = useCartContext()
  const location = useLocation()

  const handleShowCartModal = () => setShowCartModal((show) => !show)

  return (
    <div className={styles.navbarContainer}>
      <Link to="/" className={styles.navbarDetail}>
        <img src={Logo} alt="" width={50} height={50} />
        <span>Amiibo Store</span>
      </Link>
      {location.pathname !== '/checkout' && (
        <>
          <div className={styles.navbarCartContainer}>
            <p className={styles.navbarTextAmount} aria-live="polite">
              {totalItems}
            </p>
            <button
              type="button"
              className={styles.navbarCartButton}
              onClick={handleShowCartModal}
              aria-label={`Open cart (${totalItems} items)`}
            >
              <img src={Cart} alt="" />
            </button>
          </div>
          {showCartModal && <CartModal handleShowCartModal={handleShowCartModal} />}
        </>
      )}
    </div>
  )
}
