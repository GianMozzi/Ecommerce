import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { CardProduct } from '../../components/ui/CardProduct'
import { Hero } from '../../components/ui/Hero'
import { getProducts } from '../../service'
import styles from './Home.module.css'

const Home = () => {
  const [page, setPage] = useState(1)

  const { data, isPending, isError, isPlaceholderData, refetch } = useQuery({
    queryKey: ['products', page],
    queryFn: () => getProducts(page),
    placeholderData: keepPreviousData,
  })

  const products = data?.products ?? []
  const totalPages = data?.totalPages ?? page

  const goToPage = (newPage: number) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Hero />
      {isPending && (
        <p className={styles.statusMessage} role="status">
          Loading...
        </p>
      )}
      {isError && (
        <div className={styles.statusMessage} role="alert">
          <p>Something went wrong while loading the products.</p>
          <button className={styles.paginationButton} onClick={() => refetch()}>
            Try again
          </button>
        </div>
      )}
      <div className={styles.container}>
        {products.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))}
      </div>
      <nav className={styles.paginationContainer} aria-label="Pagination">
        <button
          onClick={() => goToPage(page - 1)}
          className={styles.paginationButton}
          disabled={page === 1}
        >
          Previous page
        </button>
        <div className={styles.paginationActive} aria-current="page">
          <span>{page}</span>
        </div>
        <button
          className={styles.paginationButton}
          onClick={() => goToPage(page + 1)}
          disabled={page >= totalPages || isPlaceholderData}
        >
          Next page
        </button>
      </nav>
    </>
  )
}

export default Home
