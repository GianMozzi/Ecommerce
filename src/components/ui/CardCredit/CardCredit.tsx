import { useState, type ChangeEvent, type FocusEvent, type FormEvent } from 'react'
import Cards, { type Focused } from 'react-credit-cards-2'
import 'react-credit-cards-2/dist/es/styles-compiled.css'
import { toast } from 'sonner'
import useCartContext from '../../../hooks/useCartContext'
import {
  formatCardNumber,
  formatCvc,
  formatExpiry,
  isValidCardNumber,
  isValidCvc,
  isValidExpiry,
} from '../../../utils/card'
import styles from './CardCredit.module.css'

interface CardData {
  number: string
  name: string
  expiry: string
  cvc: string
  focus: Focused
}

const emptyCard: CardData = { number: '', name: '', expiry: '', cvc: '', focus: '' }

const formatters: Partial<Record<string, (value: string) => string>> = {
  number: formatCardNumber,
  expiry: formatExpiry,
  cvc: formatCvc,
}

// Simulación: los datos de la tarjeta nunca salen del navegador ni se envían a ningún servidor.
export const CardCredit = () => {
  const [cardData, setCardData] = useState<CardData>(emptyCard)
  const { dispatch, totalItems } = useCartContext()
  const { number, name, expiry, cvc } = cardData

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name: field, value } = e.target
    setCardData((prev) => ({ ...prev, [field]: formatters[field]?.(value) ?? value }))
  }

  const handleInputFocus = (e: FocusEvent<HTMLInputElement>) => {
    setCardData((prev) => ({ ...prev, focus: e.target.name as Focused }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const error =
      totalItems === 0
        ? 'Your cart is empty'
        : !name.trim()
          ? 'Card name is required'
          : !isValidCardNumber(number)
            ? 'Invalid card number'
            : !isValidExpiry(expiry)
              ? 'Invalid or expired date (use MM/YY)'
              : !isValidCvc(cvc)
                ? 'Invalid CVC'
                : null

    if (error) {
      toast.error(error)
      return
    }

    toast.success('Purchase completed. Thank you!')
    setCardData(emptyCard)
    dispatch({ type: 'CLEAR_CART' })
  }

  return (
    <div className={styles.container}>
      <div>
        <Cards number={number} name={name} expiry={expiry} cvc={cvc} focused={cardData.focus} />
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.formControl}>
          <label htmlFor="number">Card Number</label>
          <input
            type="text"
            name="number"
            id="number"
            inputMode="numeric"
            autoComplete="cc-number"
            placeholder="4242 4242 4242 4242"
            value={number}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </div>
        <div className={styles.formControl}>
          <label htmlFor="name">Card Name</label>
          <input
            type="text"
            name="name"
            id="name"
            autoComplete="cc-name"
            value={name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </div>

        <div className={styles.formInputGrup}>
          <div className={styles.formControl}>
            <label htmlFor="expiry">Card Expiry</label>
            <input
              type="text"
              name="expiry"
              id="expiry"
              inputMode="numeric"
              autoComplete="cc-exp"
              placeholder="MM/YY"
              value={expiry}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="cvc">Card CVC</label>
            <input
              type="text"
              name="cvc"
              id="cvc"
              inputMode="numeric"
              autoComplete="cc-csc"
              placeholder="123"
              value={cvc}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
        </div>

        <button type="submit" className={styles.buyButton}>
          Buy Now
        </button>
      </form>
    </div>
  )
}
