import { Link } from 'react-router-dom'
import styles from './NotFound.module.css'

const NotFound = () => (
  <div className={styles.container}>
    <h1>404</h1>
    <p>This page does not exist.</p>
    <Link to="/" className={styles.link}>
      Back to store
    </Link>
  </div>
)

export default NotFound
