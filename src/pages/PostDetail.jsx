import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchPostByIdWithFallback } from '../api'

function PostDetail() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadPost() {
      try {
        const data = await fetchPostByIdWithFallback(id)
        setPost(data)
      } catch (err) {
        setError('Failed to load this post.')
      } finally {
        setIsLoading(false)
      }
    }

    loadPost()
  }, [id])

  return (
    <section className="page-card">
      <p className="section-label">Post Detail</p>
      {isLoading && <p>Loading post...</p>}
      {error && <p>{error}</p>}
      {post && (
        <>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </>
      )}
      <Link className="button-link" to="/posts">
        Back to Posts
      </Link>
    </section>
  )
}

export default PostDetail
