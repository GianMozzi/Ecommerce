import { describe, expect, it } from 'vitest'
import {
  formatCardNumber,
  formatExpiry,
  isValidCardNumber,
  isValidCvc,
  isValidExpiry,
} from './card'

describe('card utils', () => {
  it('formatea número y vencimiento', () => {
    expect(formatCardNumber('4242424242424242')).toBe('4242 4242 4242 4242')
    expect(formatExpiry('1228')).toBe('12/28')
    expect(formatExpiry('1')).toBe('1')
  })

  it('valida número con Luhn', () => {
    expect(isValidCardNumber('4242 4242 4242 4242')).toBe(true)
    expect(isValidCardNumber('4242 4242 4242 4243')).toBe(false)
    expect(isValidCardNumber('1234')).toBe(false)
  })

  it('valida vencimiento', () => {
    const now = new Date(2026, 9, 13)
    expect(isValidExpiry('10/26', now)).toBe(true)
    expect(isValidExpiry('09/26', now)).toBe(false)
    expect(isValidExpiry('13/30', now)).toBe(false)
    expect(isValidExpiry('1/30', now)).toBe(false)
  })

  it('valida cvc', () => {
    expect(isValidCvc('123')).toBe(true)
    expect(isValidCvc('12')).toBe(false)
  })
})
