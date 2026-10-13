// Autenticación de demostración: no hay backend, solo se guarda el email en localStorage.
const STORAGE_KEY = 'userLogin'

export const getLoggedUser = (): string | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const value: unknown = raw ? JSON.parse(raw) : null
    return typeof value === 'string' ? value : null
  } catch {
    return null
  }
}

export const login = (email: string) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(email))

export const logout = () => localStorage.removeItem(STORAGE_KEY)
