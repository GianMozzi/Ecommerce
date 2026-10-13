import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { logout } from '../../auth/auth'
import type { NewProduct } from '../../interface'
import { createProduct } from '../../service'
import styles from './Dashboard.module.css'

const FIELDS = [
  { name: 'name', label: 'Name', type: 'text' },
  { name: 'character', label: 'Character', type: 'text' },
  { name: 'amiiboSeries', label: 'Amiibo series', type: 'text' },
  { name: 'gameSeries', label: 'Game series', type: 'text' },
  { name: 'type', label: 'Type', type: 'text' },
  { name: 'head', label: 'Head', type: 'text' },
  { name: 'tail', label: 'Tail', type: 'text' },
  { name: 'image', label: 'Image URL', type: 'url' },
  { name: 'releaseDate', label: 'Release date', type: 'date' },
  { name: 'price', label: 'Price', type: 'number' },
] as const

type FormState = Record<(typeof FIELDS)[number]['name'], string>

const EMPTY_FORM: FormState = {
  name: '',
  character: '',
  amiiboSeries: '',
  gameSeries: '',
  type: '',
  head: '',
  tail: '',
  image: '',
  releaseDate: '',
  price: '',
}

const Dashboard = () => {
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success('Product created')
      setForm(EMPTY_FORM)
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
    onError: (error) => toast.error(error.message),
  })

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { releaseDate, price, ...rest } = form
    const newProduct: NewProduct = {
      ...rest,
      price: Number(price),
      release: { au: null, eu: null, jp: null, na: releaseDate },
    }

    mutation.mutate(newProduct)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Dashboard</h1>
        <div className={styles.actions}>
          <Link to="/" className={styles.link}>
            Back to store
          </Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        {FIELDS.map(({ name, label, type }) => (
          <div className={styles.formControlLogin} key={name}>
            <label htmlFor={name}>{label}</label>
            <input
              type={type}
              id={name}
              name={name}
              value={form[name]}
              onChange={handleChange}
              min={type === 'number' ? 0 : undefined}
              step={type === 'number' ? 'any' : undefined}
              required
            />
          </div>
        ))}
        <div className={styles.formControlLogin}>
          <button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Saving...' : 'Add product'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Dashboard
