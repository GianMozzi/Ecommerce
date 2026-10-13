const onlyDigits = (value: string) => value.replace(/\D/g, '')

export const formatCardNumber = (value: string) =>
  onlyDigits(value)
    .slice(0, 19)
    .replace(/(.{4})/g, '$1 ')
    .trim()

export const formatExpiry = (value: string) => {
  const digits = onlyDigits(value).slice(0, 4)
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits
}

export const formatCvc = (value: string) => onlyDigits(value).slice(0, 4)

/** Validación con el algoritmo de Luhn. */
export const isValidCardNumber = (value: string) => {
  const digits = onlyDigits(value)
  if (digits.length < 13 || digits.length > 19) return false

  let sum = 0
  let double = false
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = Number(digits[i])
    if (double) {
      digit *= 2
      if (digit > 9) digit -= 9
    }
    sum += digit
    double = !double
  }
  return sum % 10 === 0
}

/** Formato MM/YY y que la tarjeta no esté vencida (vale hasta fin de mes). */
export const isValidExpiry = (value: string, now = new Date()) => {
  const match = /^(\d{2})\/(\d{2})$/.exec(value)
  if (!match) return false

  const month = Number(match[1])
  const year = 2000 + Number(match[2])
  if (month < 1 || month > 12) return false

  return new Date(year, month, 1) > now
}

export const isValidCvc = (value: string) => /^\d{3,4}$/.test(value)
