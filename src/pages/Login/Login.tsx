import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { getLoggedUser, login } from '../../auth/auth'
import styles from './Login.module.css'

const Login = () => {
  const [userData, setUserData] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  if (getLoggedUser()) {
    return <Navigate to="/dashboard" replace />
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (userData.email.trim() === '' || userData.password === '') return

    login(userData.email.trim())
    navigate('/dashboard')
  }

  return (
    <div className={styles.containerLogin}>
      <h1>Login</h1>
      <p className={styles.hint}>Demo login: any email and password will work.</p>
      <form onSubmit={handleSubmit}>
        <div className={styles.formControlLogin}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formControlLogin}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            value={userData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formControlLogin}>
          <button type="submit">Login</button>
        </div>
      </form>
      <Link to="/" className={styles.link}>
        Back to store
      </Link>
    </div>
  )
}

export default Login
