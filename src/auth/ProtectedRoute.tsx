import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { getLoggedUser } from './auth'

export const ProtectedRoute = ({ children }: { children: ReactNode }) =>
  getLoggedUser() ? <>{children}</> : <Navigate to="/login" replace />
