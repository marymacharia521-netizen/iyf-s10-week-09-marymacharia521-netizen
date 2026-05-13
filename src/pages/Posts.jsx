import { useEffect, useState } from 'react'
import PostCard from "../components/PostCard";
import { fetchLocalPosts, fetchPosts } from '../api'

function Posts() {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await fetchPosts()
        const localPosts = fetchLocalPosts()
        setPosts([...localPosts, ...data.slice(0, 12)])
      } catch (err) {
        const localPosts = fetchLocalPosts()
        setPosts(localPosts)
        setError('Failed to load online posts. Showing saved local posts instead.')
      } finally {
        setIsLoading(false)
      }
    }

    loadPosts()
  }, [])

  return (
    <section className="page-card">
      <p className="section-label">Posts</p>
      <h2>Latest Posts</h2>
      <div className="post-list">
        {isLoading && <p>Loading posts...</p>}
        {error && <p>{error}</p>}
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}

export default Posts
