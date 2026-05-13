import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="page-card">
      <p className="section-label">404</p>
      <h2>Page not found</h2>
      <p>The page you are looking for does not exist or the link is broken.</p>
      <Link className="button-link" to="/">
        Back Home
      </Link>
    </section>
  )
}

export default NotFound
