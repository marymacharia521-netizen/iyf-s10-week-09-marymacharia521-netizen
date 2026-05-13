import { Link } from 'react-router-dom'

function Home() {
  return (
    <section className="page-card">
      <p className="section-label">Home</p>
      <h2>Welcome to Netizen</h2>
      <p>
        This homepage is now connected to your router. You can move between
        pages using the navigation above.
      </p>
      <p>
        Start by browsing community posts or create one to see how multiple
        pages fit together in a React app.
      </p>
      <div className="actions">
        <Link className="button-link" to="/posts">
          View Posts
        </Link>
        <Link className="button-link button-link-secondary" to="/create-post">
          Create a Post
        </Link>
      </div>
    </section>
  )
}

export default Home
